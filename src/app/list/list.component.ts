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
    var title = $('#titles').val();
    var price = $('#price').val();
    var img = $('#img').val();

    $.ajax({
      type: 'PUT',
      url: "/api/location/spot",
      data: { "title": title, "price": price, "img": img},
      success: function (response) {
        alert("signed in");
      },
      error: function (xhr) {
        //Do Something to handle error
        console.log(xhr.responseText)
        alert("fail");
      }
    });
}


  ngOnInit() {

    $(".container")
    .animate({ top: 0 })
    .delay(500)

  }

}


