import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserResponse } from '../../models/user-response.model';

@Component({
  selector: 'app-user-table',
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {

  @Input() users:UserResponse[] = [];

  @Output() userDeleted = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<UserResponse>();

  onDeleteUser(id:number){
    this.userDeleted.emit(id);
  }

  onEdit(user:UserResponse){
    this.editUser.emit(user);
  }
}
