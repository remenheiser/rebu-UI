import { Component, OnInit } from '@angular/core';
import { SpotsService } from './spots.service';
import { $ } from 'protractor';

declare var jQuery: any;

@Component({
  selector: 'app-spots',
  templateUrl: './spots.component.html',
  styleUrls: ['./spots.component.css']
})
export class SpotsComponent implements OnInit {

  public spotsData: any = []

  constructor(private _spotService: SpotsService) {}

  ngOnInit(){
    this.spotsData = [];
    this._spotService.getSpots()
        .subscribe((data: any) => {
          console.log(this.spotsData);
          this.spotsData = data;
        });
  }

  goToSpot(){
    
  }

}
