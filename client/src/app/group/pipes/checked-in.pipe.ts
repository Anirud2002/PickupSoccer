import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/group.moda';

@Pipe({
  name: 'checkedIn'
})
export class CheckedInPipe implements PipeTransform {

  transform(players: Player[], checkedIn: boolean): Player[] {
    let retVal: Player[] = [];
    players.forEach(player => {
      if(player.checkedIn === checkedIn) {
        retVal.push(player);
      }
    })
    return retVal;
  }

}
