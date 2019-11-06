import { Component, OnInit } from '@angular/core';
import { link } from 'fs';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})



export class ListComponent implements OnInit {

  constructor() { }

  submit(){
    event.preventDefault(); //prevent default action     
    var form_data = $('#my_form').serialize(); //Encode form elements for submission
    alert(form_data);
    $.ajax({
      type: 'PUT',
      url : '/api/location/spot',
      data : form_data,
    }).done(function(response){ 
      $("#server-results").html("Spot listed!");
    }).fail(function(response){
      console.log(response.responseText);
      
  });
}


  ngOnInit() {

    $(".container")
    .animate({ top: 0 })
    .delay(500)

  }

}


