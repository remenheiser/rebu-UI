/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { ChosenSpotService } from './chosen-spot.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'

@Component({
  selector: 'app-chosen-spot',
  templateUrl: './chosen-spot.component.html',
  styleUrls: ['./chosen-spot.component.css']
})



export class ChosenSpotComponent implements OnInit {

  public spotsData: any = []

  constructor(private _chosenSpotService: ChosenSpotService, private route: ActivatedRoute, private router: Router) { }

  selectId: number;

  

  ngOnInit() {

 
    let id = this.route.snapshot.params["id"];
    this.selectId = id;
    console.log("ID is: " + this.selectId);


    this.spotsData = [];
    
  

    this._chosenSpotService.getSpots(this.selectId)
        .subscribe((data: any) => {
          console.log(this.spotsData);
          this.spotsData = data;
        });

    
  }

}

