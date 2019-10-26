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
  

  title = 'My first AGM project';
  lat = 39.681660;
  lng = -75.753609;

  

  ngOnInit() {
    

 
    let id = this.route.snapshot.params["id"];
    this.selectId = id;
    console.log("ID is: " + this.selectId);


    this.spotsData = [];

    // var geocoder = new google.maps.Geocoder();
    // var address = document.getElementById("mainTitle").innerHTML;
    // geocoder.geocode( { 'address': address}, function(results, status) {
    //   if (status == google.maps.GeocoderStatus.OK)
    //   {
    //       // do something with the geocoded result
    //       //
    //       // results[0].geometry.location.latitude
    //       // results[0].geometry.location.longitude
    //   }
    // });
    
  

    this._chosenSpotService.getSpots(this.selectId)
        .subscribe((data: any) => {
          console.log(this.spotsData);
          this.spotsData = data;
        });

    
  }

  

}

