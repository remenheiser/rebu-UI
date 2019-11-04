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

  login(){
    event.preventDefault(); //prevent default action 
    var form_data = $('#login-form').serialize(); //Encode form elements for submission
    console.log(form_data);
    $.ajax({
      type: 'POST',
      url : 'http://localhost:3000/api/user/login',
      data : form_data
    }).done(function(response){ //
      console.log("Logged in son");
      localStorage.setItem('token', response.token);
      document.location.href = '/spots';
    }).fail(function(response){
  });

 
  };



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
  
  

  toggleSignup() {
    document.getElementById("login-toggle").style.backgroundColor = "#fff";
    document.getElementById("login-toggle").style.color = "#222";
    document.getElementById("signup-toggle").style.backgroundColor = "#e64a19";
    document.getElementById("signup-toggle").style.color = "#fff";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
  }

  toggleLogin() {
    document.getElementById("login-toggle").style.backgroundColor = "#e64a19";
    document.getElementById("login-toggle").style.color = "#fff";
    document.getElementById("signup-toggle").style.backgroundColor = "#fff";
    document.getElementById("signup-toggle").style.color = "#222";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  }
}
//------------this is the JS associated w the signup

