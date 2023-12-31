import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, of } from 'rxjs';
import { Group } from '../group/interfaces/group.moda';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseApiUrl: string = "http://localhost:3000";
  constructor(
    private http: HttpClient,
  ) { }

  async getUserGroups() {
    const apiCall = this.http.get<Group[]>(`${this.baseApiUrl}/group/get-user-groups`).pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );

    const response = await lastValueFrom(apiCall);

    if(!response) {
      // TODO: Handle the error
      return null;
    }

    return response;
  }
}
