import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  

}

$("#my_form").submit(function(event){
  event.preventDefault(); //prevent default action 
  var post_url = $(this).attr("action"); //get form action url
  var request_method = $(this).attr("method"); //get form GET/POST method
  var form_data = $(this).serialize(); //Encode form elements for submission
  
  $.ajax({
    url : post_url,
    type: request_method,
    data : form_data
  }).done(function(response){ //
    $("#server-results").html("Spot listed!");
    document.location.href = '/postlist';
  }).fail(function(response){
    alert(response);
});
});
