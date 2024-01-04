import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/group.modal';

@Pipe({
  name: 'checkedIn'
})
export class CheckedInPipe implements PipeTransform {

  transform(players: Player[], checkedIn: boolean): Player[] {
    return players.filter(player => player.checkedIn === checkedIn);
  }

}
