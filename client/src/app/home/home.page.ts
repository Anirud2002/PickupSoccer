import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ModalController } from '@ionic/angular';
import { CreateGroupComponent } from '../shared/components/create-group/create-group.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private homeService: HomeService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.getUserGroups();
  }

  async getUserGroups() {
    const groups = await this.homeService.getUserGroups();

    console.log(groups);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateGroupComponent
    });

    await modal.present();
  }
}
