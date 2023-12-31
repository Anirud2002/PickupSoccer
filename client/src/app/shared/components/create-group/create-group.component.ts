import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroupService } from '../../../group/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private groupService: GroupService
  ) { }

  ngOnInit() {}

  async handleCreate () {
    
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

}
