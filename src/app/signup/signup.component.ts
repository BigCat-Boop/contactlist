import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  signupForm = {
    email: '',
    password: ''
  }
  email_err_msg = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signup() {
    const formData = this.signupForm;
    this.http.post('http://localhost:3000/users', formData)
    .toPromise()
    .then((data: any) => {
      this.email_err_msg = '';
      this.router.navigate(['/'])
    }).catch(err => {
      if (err.status === 409) {
        this.email_err_msg = '您输入的邮箱已经被占用';
      }
    })
  }

}
