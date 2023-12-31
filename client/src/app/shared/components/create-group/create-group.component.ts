import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroupService } from '../../../group/services/group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent  implements OnInit {
  groupFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.groupFormGroup = this.fb.group({
      groupName: ["", Validators.required]
    });
  }

  async handleCreate () {
    if(this.groupFormGroup.invalid) {
      console.log("Fill out the form");
      return;
    }

    const newGroup = await this.groupService.createGroup(this.groupFormGroup.get("groupName").value);
    await this.modalController.dismiss(newGroup);
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

}
