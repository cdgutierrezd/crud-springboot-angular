import { Component, inject } from '@angular/core';
import { RegisterComponent } from '../../components/register/register.component';
import { UserTableComponent } from '../../components/user-table/user-table.component';

import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user-response.model';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [RegisterComponent, UserTableComponent,AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private userService = inject(UserService);

  users$:Observable<UserResponse[]> = this.userService.findAll();
  userToEdit?:UserResponse;

  loadUsers(){
    this.users$ = this.userService.findAll();
  }

  onUserRegistered(newUser:UserResponse){
    this.loadUsers();
  }

  onUserDeleted(id:number){
    this.userService.delete(id).pipe(
      switchMap(() => this.userService.findAll())
    ).subscribe((users) => this.users$ = new Observable(oberver => oberver.next(users))); 
  }

  onUserEdited(user:UserResponse){
    this.userToEdit = user;
  }

  onUserUpdate(){
    this.loadUsers();
    this.userToEdit = undefined;
  }

  onCancel(){
    this.userToEdit = undefined;
  }
}
