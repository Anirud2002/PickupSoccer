import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { PlayerStatusComponent } from './components/player-status/player-status.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  constructor(
    private actionController: ActionSheetController,
    private modalController: ModalController,
    private outlet: IonRouterOutlet
  ) { }

  ngOnInit() {
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
