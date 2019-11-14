import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})

export class UnauthorizedComponent implements OnInit {
  constructor(private _router: Router, private element: ElementRef) { }
  response = 10;

  getResponse() {
    return this.response;
  }

  ngOnInit() {}

  

  signIn() {
    var email = $('#email').val();
    var password = $('#password').val();

    $.ajax({
      type: 'POST',
      context : this,
      url: "/api/user/login",
      data: { "email": email, "password": password },
      success: function (response) {
        alert("Signed In!");
        console.log(response);

        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.username);
        localStorage.setItem("email", response.email);

        console.log(`Local Storage Username: ${localStorage.getItem("username")}`);
        console.log(`Local Storage Email: ${localStorage.getItem("email")}`);

        this._router.navigate(['/account']);
      },
      error: function (xhr) {
        alert(xhr.responseText);
        //Do Something to handle error
        console.log("email: " + email + ", password: " + password);
      }
    });

  }

  register() {

    //Get
    var name = $('#nameSignUp').val();
    var email = $('#emailSignUp').val();
    var password = $('#passwordSignUp').val();

    $.ajax({
      type: 'POST',
      context : this,
      url: "/api/user/register",
      data: { "email": email, "name": name, "password": password },
      success: function (response) {
        alert("Registered!");
        this.router.navigate(['/account']);
      },
      error: function (xhr) {
        //Do Something to handle error
        console.log(xhr.responseText);
      }
    });

  }

  switchScreens() {

    $('.cont').each(function () {
      $(this).toggleClass('s--signup');
    });

  }

}



