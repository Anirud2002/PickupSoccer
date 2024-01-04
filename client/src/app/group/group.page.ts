import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { PlayerStatusComponent } from './components/player-status/player-status.component';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { Group } from './interfaces/group.modal';
import { GroupService } from './services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  requestCompleted: boolean = false;
  groupId: string;
  group: Group = {} as Group;
  constructor(
    private actionController: ActionSheetController,
    private modalController: ModalController,
    private outlet: IonRouterOutlet,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.getGroupIdFromRouteParam();
    this.getGroupDetails();
  }

  getGroupIdFromRouteParam() {
    this.groupId = this.activatedRoute.snapshot.params["groupId"];
  }

  async getGroupDetails() {
    this.requestCompleted = false;
    this.group = await this.groupService.getGroupDetail(this.groupId).finally(() => this.requestCompleted = true);
  }

  async handleCheckIn() {
    await this.groupService.checkIn(this.groupId).then(res => {
      if(res) {
        this.getGroupDetails();
        this.presentStatusComponent();
      }
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionController.create({
      buttons: [
        {
          text: 'Call +1 9868953234',
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

  async presentStatusComponent() {
    const modal = await this.modalController.create({
      component: PlayerStatusComponent,
      presentingElement: this.outlet.nativeEl
    });

    await modal.present();
  }

}
