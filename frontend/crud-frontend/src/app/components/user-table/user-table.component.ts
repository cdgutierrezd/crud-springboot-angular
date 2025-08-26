import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserResponse } from '../../models/user-response.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  imports: [FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {

  @Input() users:UserResponse[] = [];

  @Output() userDeleted = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<UserResponse>();

  searchTerm: string = "";

  onDeleteUser(id:number){
    this.userDeleted.emit(id);
  }

  onEdit(user:UserResponse){
    this.editUser.emit(user);
  }

  filteredUsers(){
    if(!this.searchTerm){
      return this.users;
    }

    const term = this.searchTerm.toLowerCase();

    return this.users.filter(user =>
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.phoneNumber.toString().includes(term)
  );
  }
}
