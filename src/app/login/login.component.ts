import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxNotificationService } from 'ngx-notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxNotificationService: NgxNotificationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Login submit Method
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.controls.email.value == 'Admin@gmail.com' && this.loginForm.controls.password.value == 'Admin@123') {
      this.router.navigate(['list-user']);
      this.fakeDataInject();
      this.ngxNotificationService.sendMessage('Login successfully.', 'dark', 'top-right');
    } else {
      this.invalidLogin = true;
    }
  }

  // Injecting Sample Data Method
  fakeDataInject() {
    var fakeData = [
      {
        "id": 1544202916175,
        "userName": "Sivabalan Sivakumar",
        "email": "sivabalan@yopmail.com",
        "firstName": "Sivabalan",
        "lastName": "Sivakumar",
        "phone": "8807839266"
      },
      {
        "id": 1544202938501,
        "userName": "Veera Pratap",
        "email": "pratap@yopmail.com",
        "firstName": "Veera",
        "lastName": "Pratap",
        "phone": "987541366"
      },
      {
        "id": 1544203433446,
        "userName": "Guru Moorthy",
        "email": "guru@gmail.com",
        "firstName": "Guru",
        "lastName": "Moorthy",
        "phone": "987452136"
      },
      {
        "id": 1544203433447,
        "userName": "Shane Watson",
        "email": "watson@gmail.com",
        "firstName": "Shane",
        "lastName": "Watson",
        "phone": "987452256"
      },
      {
        "id": 1544203433448,
        "userName": "David Warner",
        "email": "warner@gmail.com",
        "firstName": "David",
        "lastName": "Warner",
        "phone": "987458556"
      },

    ];
    localStorage.setItem('userArray', JSON.stringify(fakeData));
  }

}
