import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  constructor() {}


  
  ngOnInit() {

    
    }

    




  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  validate() {
    var $result = $("#email");
    var email = $("#email").val();
    $result.text("");
  
    if (this.validateEmail(email)) {
      $('#results').text("     \u20D7 " + email + " is valid :)");
      $result.css("color", "#009600");
    } else {
      $result.text(email + " is not valid :(");
      $result.css("color", "#ff0000");
    }
    return false;
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
  


//------------this is the JS associated w the signup

