import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';

import { GroupPage } from './group.page';
import { PlayerStatusComponent } from './components/player-status/player-status.component';
import { CheckedInPipe } from './pipes/checked-in.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule,
  ],
  declarations: [GroupPage, PlayerStatusComponent, CheckedInPipe]
})
export class GroupPageModule {}
