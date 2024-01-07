import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GroupService } from '../../services/group.service';
import { PlayerStatus } from '../../interfaces/group.modal';

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.scss'],
})
export class PlayerStatusComponent  implements OnInit {
  @Input() groupId: string;
  @Input() status: PlayerStatus;
  statusFormGroup: FormGroup;
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.statusFormGroup = this.fb.group({
      isTraining: [true],
      isAvailable: [true],
      leavingAt: [""]
    });

    if(this.status) {
      this.statusFormGroup.patchValue({
        isTraining: this.status.isTraining,
        isAvailable: this.status.isAvailable,
        leavingAt: this.status.leavingAt,
      });
    }
  }

  async updateStatus() {
    let response = await this.groupService.updatePlayerStatus(this.groupId, this.statusFormGroup.value);

    await this.modalController.dismiss(response);
  }

}
