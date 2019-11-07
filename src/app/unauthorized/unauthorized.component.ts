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
    centerCloud();
  }

  singIn() {
  


    //Get
    var email = $('#email').val();
    var password = $('#password').val();

    $.ajax({
      type: 'POST',
      url: "/api/user/login",
      data: { "email": email, "name": "test", "password": password},
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

  switchScreens() {

    $('.cont').each(function () {
      $(this).toggleClass('s--signup');
    });

  }

}

$(window).on('resize', function () {
  centerCloud();
});

function centerCloud() {
  var cloudCenter = $('svg').outerWidth() / 2 - 350;
  $('path').css('transform', 'translate(' + cloudCenter + 'px, 0px) scale(0.5)');

}

