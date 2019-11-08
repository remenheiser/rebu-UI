import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})


export class UnauthorizedComponent implements OnInit {

  constructor(private element: ElementRef) { }



  ngOnInit() {
  }

  singIn() {
  
    var email = $('#email').val();
    var password = $('#password').val();

    $.ajax({
      type: 'POST',
      url: "/api/user/login",
      data: { "email": email, "password": password},
      success: function (response) {
        alert("signed in");
        localStorage.setItem("token", response.token);
      },
      error: function (xhr) {
        //Do Something to handle error
        console.log( "email: " + email +", password: " + password);
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
       url: "/api/user/register",
       data: { "email": email, "name": name, "password": password},
       success: function (response) {
         alert("signed in");
       },
       error: function (xhr) {
         //Do Something to handle error
         console.log( xhr.responseText);
       }
     });

  }

  switchScreens() {

    $('.cont').each(function () {
      $(this).toggleClass('s--signup');
    });

  }

}



