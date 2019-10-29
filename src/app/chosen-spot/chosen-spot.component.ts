/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { ChosenSpotService } from './chosen-spot.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chosen-spot',
  templateUrl: './chosen-spot.component.html',
  styleUrls: ['./chosen-spot.component.css']
})





export class ChosenSpotComponent implements OnInit {

  public spotsData: any = []


  constructor(private _chosenSpotService: ChosenSpotService, private route: ActivatedRoute, private router: Router) { }

  selectId: number;


  public lat = 0;
  public lng = 0;


  public origin: any;
  public destination: any;



  ngOnInit() {

    function startMap() {


      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();


      function initMap() {

        var chicago = new google.maps.LatLng(41.850033, -87.6500523);
        var mapOptions = {
          zoom: 7,
          center: chicago
        }
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsRenderer.setMap(map);
      }

      function calcRoute() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            var start = new google.maps.LatLng(pos.lat, pos.lng)
            var end = $('#mainTitle').text();


            $("#phoneButton").click(function(){ 
              window.location.href = "https://www.google.com/maps/dir/"+ pos.lat + ","+ pos.lng +"/" + end;
            });

            var request = {
              origin: start,
              destination: end,
              travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function (result, status) {
              if (status == 'OK') {
                console.log("OK!");
                directionsRenderer.setDirections(result);
              } else {
                console.log("Status: " + status)
              }
            });
          })
  
}
      }
        initMap();
        calcRoute();
      }


      setTimeout(startMap, 2000);






      // var map = new google.maps.Map(document.getElementById('map'), {
      //       zoom: 7,
      //       center: {lat: 41.85, lng: -87.65}
      //     });
      // var infoWindow;
      // this.origin = { lat: 39.6837, lng: -75.7497 };
      // this.destination = { lat: 39.7447, lng: -75.5484 };



      //   function getLatLng() {
      //   var user1Location = $("#mainTitle").text();
      //   var geocoder = new google.maps.Geocoder();
      //   //convert location into longitude and latitude
      //   geocoder.geocode({
      //       address: user1Location
      //   }, function(locResult) {
      //       console.log(locResult);
      //       var lat1 = locResult[0].geometry.location.lat();
      //       var lng1 = locResult[0].geometry.location.lng();
      //       $("#testDiv").html("latitude:" + lat1 + "<p>longitude:" + lng1 + "</p>");
      //       var pos = {
      //                   lat: lat1,
      //                   lng: lng1
      //                 };
      //                map.setCenter(new google.maps.LatLng( 39.6837, -75.7497 ) );
      //                map.destination = new google.maps.LatLng( 39.6837, -75.7497 )
      //   });
      // }

      // setTimeout(getLatLng, 2000);

      // initMap(); 
      // function initMap() {
      //   var directionsService = new google.maps.DirectionsService;
      //   var directionsDisplay = new google.maps.DirectionsRenderer;
      //   var map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 7,
      //     center: {lat: 41.85, lng: -87.65}
      //   });

      //   infoWindow = new google.maps.InfoWindow;

      //     // Try HTML5 geolocation.
      //     if (navigator.geolocation) {
      //       navigator.geolocation.getCurrentPosition(function(position) {
      //         var pos = {
      //           lat: position.coords.latitude,
      //           lng: position.coords.longitude
      //         };

      //         infoWindow.setPosition(pos);
      //         infoWindow.setContent('Location found.');
      //         infoWindow.open(map);
      //         map.setCenter(pos);
      //       })
      //     }
      //   }


      let id = this.route.snapshot.params["id"];
      this.selectId = id;


      this.spotsData = [];



      this._chosenSpotService.getSpots(this.selectId)
        .subscribe((data: any) => {
          console.log(this.spotsData);
          this.spotsData = data;
        });



    }
  }

