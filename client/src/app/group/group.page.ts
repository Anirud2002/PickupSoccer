import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { PlayerStatusComponent } from './components/player-status/player-status.component';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { Group, Player, PlayerStatus } from './interfaces/group.modal';
import { GroupService } from './services/group.service';
import { User } from '../auth/auth.modal';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  requestCompleted: boolean = false;
  groupId: string;
  group: Group = {} as Group;
  checkedIn: boolean;
  user: User;
  constructor(
    private actionController: ActionSheetController,
    private modalController: ModalController,
    private outlet: IonRouterOutlet,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.getGroupIdFromRouteParam();
    await this.getUser();
    await this.getGroupDetails();
    await this.getCheckInStatus();
  }

  async getUser() {
    this.user = await this.authService.getUser();
  }

  getGroupIdFromRouteParam() {
    this.groupId = this.activatedRoute.snapshot.params["groupId"];
  }

  async getCheckInStatus() {
    this.checkedIn = await this.groupService.getCheckInStatus(this.groupId);
  }

  async getGroupDetails() {
    this.requestCompleted = false;
    this.group = await this.groupService.getGroupDetail(this.groupId).finally(() => this.requestCompleted = true);
  }

  async handleCheckIn() {
    this.checkedIn = !this.checkedIn;
    await this.groupService.checkIn(this.groupId).then(res => {
      if(res) {
        this.getGroupDetails();
        this.presentStatusComponent();
      }
    })
  }

  async handleCheckOut() {
    this.checkedIn = !this.checkedIn;
    await this.groupService.checkOut(this.groupId).then(res => {
      if(res) {
        this.getGroupDetails();
      }
    })
  }

  async presentActionSheet(player: Player) {
    const actionSheet = await this.actionController.create({
      buttons: [
        {
          text: player.contactNumber ?? player.email,
          handler: () => {
            console.log("Calling my friend!");
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async presentStatusComponent(status: PlayerStatus = null) {
    const modal = await this.modalController.create({
      component: PlayerStatusComponent,
      componentProps: {
        status,
        groupId: this.groupId
      },
      presentingElement: this.outlet.nativeEl
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();

    if(data) {
      this.group.players = data;
    }
  }

  async handlePlayerClick(player: Player) {
    const isUser = player.userName === this.user.userName;
    if(isUser && player.checkedIn) {
      await this.presentStatusComponent(player.status);
      return;
    }

    // if someone else
    await this.presentActionSheet(player);
  }

}
