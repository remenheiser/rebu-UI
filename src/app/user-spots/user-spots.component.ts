import { Component, OnInit } from '@angular/core';
import { SpotsService } from './user-spots.component.service';

@Component({
  selector: 'app-user-spots',
  templateUrl: './user-spots.component.html',
  styleUrls: ['./user-spots.component.css']
})
export class UserSpotsComponent implements OnInit {

  constructor(private _spotService: SpotsService) { }

  public userListings: any = []
  public userEmail: any

  ngOnInit() {

    var token = localStorage.getItem('token');
    
    let jwtData = token.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    console.log(decodedJwtData);
    this.userEmail = decodedJwtData.email;

    this.userListings = [];
    this._spotService.getSpots()
      .subscribe((data: any) => {
        console.log(data);
        for (var spot in data) {
                if (data[spot].userid == this.userEmail) {
                    this.userListings.push(data[spot]);
                }
              }
              console.log(this.userListings);
      });

  }

}
