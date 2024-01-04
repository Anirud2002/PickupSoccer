import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.scss'],
})
export class PlayerStatusComponent  implements OnInit {
  statusFormGroup: FormGroup;
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.statusFormGroup = this.fb.group({
      isTraining: [false],
      isAvailable: [false],
      leavingAt: [""]
    })
  }

  async hideModal() {
    await this.modalController.dismiss();
  }

  async updateStatus() {
    console.log(this.statusFormGroup.value);
  }

}
