 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group, Player, PlayerStatus } from '../interfaces/group.modal';
import { catchError, lastValueFrom, of } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseApiUrl: string = "http://localhost:3000";
  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  async createGroup(groupName: string): Promise<Group> {
    const apiCall = this.http.post<Group>(`${this.baseApiUrl}/group/create`, {groupName})
    .pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );

    const response = await lastValueFrom(apiCall);

    if(!response) {
      // TODO: Handle the error
      return {} as Group;
    }

    const toast = await this.toastController.create({
      duration: 2000,
      color: "success",
      message: "Group Created!"
    });
    await toast.present();

    return response;
  }

  async deleteGroup(groupId: string): Promise<Group> {
    const apiCall = this.http.delete<Group>(`${this.baseApiUrl}/group/delete/${groupId}`)
    .pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );

    const response = await lastValueFrom(apiCall);

    if(!response) {
      // TODO: Handle the error
      return {} as Group;
    }

    const toast = await this.toastController.create({
      duration: 2000,
      color: "success",
      message: "Group Deleted!"
    });
    await toast.present();

    return response;
  }

  async addUserToGroup(groupId: string): Promise<Group> {
    const apiCall = this.http.post<Group>(`${this.baseApiUrl}/group/add-user`, {groupId})
    .pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );

    const response = await lastValueFrom(apiCall);

    if(!response) {
      // TODO: Handle the error
      return {} as Group;
    }

    const toast = await this.toastController.create({
      duration: 2000,
      color: "success",
      message: "You are added to the group!"
    });
    await toast.present();

    return response;
  }

  async removeUserFromGroup(groupId: string): Promise<Group> {
    const apiCall = this.http.post<Group>(`${this.baseApiUrl}/group/remove-user`, {groupId})
    .pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );

    const response = await lastValueFrom(apiCall);

    if(!response) {
      // TODO: Handle the error
      return {} as Group;
    }

    const toast = await this.toastController.create({
      duration: 2000,
      color: "success",
      message: "You have left the group!"
    });
    await toast.present();

    return response;
  }

  async getGroupDetail(groupId: string) : Promise<Group> {
    const apiCall = this.http.get<Group>(`${this.baseApiUrl}/group/${groupId}`)
    .pipe(
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

  async checkIn(groupId: string) : Promise<any> {
    const apiCall = this.http.post(`${this.baseApiUrl}/group/${groupId}/check-in`, {})
    .pipe(
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

    const toast = await this.toastController.create({
      duration: 2000,
      color: "success",
      message: "You are checked in!"
    });
    await toast.present();
    return response;
  }

  async checkOut(groupId: string) : Promise<any> {
    const apiCall = this.http.post(`${this.baseApiUrl}/group/${groupId}/check-out`, {})
    .pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );

    const response = await lastValueFrom(apiCall);

    if(!response) {
      // TODO: Handle the error
      return;
    }

    const toast = await this.toastController.create({
      duration: 2000,
      color: "success",
      message: "You are checked out!"
    });
    await toast.present();
    return response;
  }

  async getCheckInStatus(groupId: string) : Promise<boolean> {
    const apiCall = this.http.get<boolean>(`${this.baseApiUrl}/group/${groupId}/check-in-status`)
    .pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );

    const response = await lastValueFrom(apiCall);

    if(!response) {
      // TODO: Handle the error
      return false;
    }
    return response;
  }

  async updatePlayerStatus(groupId: string, status: PlayerStatus) : Promise<Player[]> {
    const apiCall = this.http.post<Player[]>(`${this.baseApiUrl}/group/${groupId}/update-status`, status)
    .pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );

    const response = await lastValueFrom(apiCall);

    if(!response) {
      // TODO: Handle the error
      return [];
    }

    const toast = await this.toastController.create({
      duration: 2000,
      color: "success",
      message: "Status updated!"
    });
    await toast.present();

    return response;
  }
}
