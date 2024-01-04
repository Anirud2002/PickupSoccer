import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ModalController } from '@ionic/angular';
import { CreateGroupComponent } from '../shared/components/create-group/create-group.component';
import { Group } from '../group/interfaces/group.modal';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  groups: Group[] = [];
  constructor(
    private homeService: HomeService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.getUserGroups();
  }

  async getUserGroups() {
    this.groups = await this.homeService.getUserGroups();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateGroupComponent
    });

    await modal.present();

    const {data:group} = await modal.onDidDismiss();

    this.groups.push(group);
  }
}
