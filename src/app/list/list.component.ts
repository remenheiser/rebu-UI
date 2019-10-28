import { Component, OnInit } from '@angular/core';
import { link } from 'fs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {

  constructor(private http: HttpClient) { }



  ngOnInit() {

    // $('#upload').on('click', function () {
    //   console.log("psuh");

    //   var arr = { title: '2', price: '25', img: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/06/06/12/meme.gif', date: '4' };
    //   $.ajax({
      
    //     url: '/api/spot',
    //     type: 'PUT',
    //     data: JSON.stringify(arr),
    //     contentType: 'application/json; charset=utf-8',
    //     dataType: 'json',
    //     async: true,
    //     success: function (msg) {
    //       alert(msg);
    //     }
    //   });



    // });


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
      });
    });

    $(".container")
    .animate({ top: 0 })
    .delay(500)


    $('#geo').on('click', function() {
      var geocoder = new google.maps.Geocoder();
      var address = document.getElementById('address').innerHTML;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results[0].geometry.location.lat())
          console.log(results[0].geometry.location.lng())
        } else {
        alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    })

  }

}


