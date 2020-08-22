import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxNotificationService } from 'ngx-notification';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngxNotificationService: NgxNotificationService
  ) { }

  userForm: FormGroup;
  userMainArray = [];
  userId: any;
  submitted: boolean = false;
  invalidUser: boolean = false;

  ngOnInit() {

    this.createForm();
    this.getById();
  }

  // User Updating Method

  onSubmit(userForm) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let val = userForm.value
    val.userName = val.firstName + ' ' + val.lastName;
    let userMainArray = this.userMainArray;
    userMainArray.forEach(element => {
      if (element.id == val.id) {
        element.userName = val.userName;
        element.email = val.email;
        element.firstName = val.firstName;
        element.lastName = val.lastName;
        element.phone = val.phone;
      }
    });
    let json = userMainArray
    localStorage.setItem('userArray', JSON.stringify(json));
    this.ngxNotificationService.sendMessage('User updated successfully.', 'dark', 'top-right');
    this.router.navigate(['list-user']);

  }

  // User Update Cancel Method
  cancel() {
    this.router.navigate(['list-user']);
  }

  // User Form Initializing Method
  createForm() {
    this.userForm = this.fb.group({
      id: [],
      userName: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],

    });
  }

  // User Record Getting Method
  getById() {
    this.userId = localStorage.getItem("editUserId");
    let mainUserJson = localStorage.getItem('userArray');
    if (mainUserJson) {
      let mainUserArray = JSON.parse(mainUserJson);
      this.userMainArray = mainUserArray;
      let user = this.userMainArray.find(x => x.id == this.userId);
      this.userForm.patchValue(user);
    }
  }

}
