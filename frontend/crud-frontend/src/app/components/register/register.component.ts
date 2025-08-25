import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserRequest } from '../../models/user-request.model';
import { UserResponse } from '../../models/user-response.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() userRegistered = new EventEmitter<UserResponse>();
  @Output() userEdited = new EventEmitter<UserResponse>();
  @Output() cancelEdit = new EventEmitter<null>();
  private formBuild = inject(FormBuilder);
  private userService = inject(UserService);

  @Input() userToEdit?: UserResponse;

  formRegister!: FormGroup;


  ngOnInit(): void {
    this.formRegister = this.formBuild.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['']
    });
  }

  save() {
    const request: UserRequest = this.loadRequest();
    this.userService.save(request).subscribe((userCreate) => {
      this.userRegistered.emit(userCreate);
      alert(`User Create ${userCreate.name} - ${userCreate.email}`);
      this.formRegister.reset();
    });
  }

  update(user:UserResponse) {
    if (this.userToEdit) {
      const request: UserRequest = this.loadRequest();
      this.userService.update(user.id, request).subscribe((userUpdate) => {
        this.userEdited.emit();
        alert(`User Update ${userUpdate.name} - ${userUpdate.email}`);
      });
    }
  }

  loadRequest(): UserRequest {
    const data = this.formRegister.value;
    const request: UserRequest = {
      name: data.name ?? '',
      email: data.email ?? '',
      phoneNumber: data.phoneNumber ?? ''
    }
    return request;
  }

  ngOnChanges() {
    if(!this.formRegister){
      return;
    }
    if (this.userToEdit) {
      this.formRegister.patchValue(this.userToEdit);
    }else{
      this.formRegister.reset();
    }
  }

  cancel(){
    this.cancelEdit.emit();
  }
}
