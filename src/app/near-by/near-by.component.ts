import { Component, OnInit } from '@angular/core';
import { NearByService } from './near-by.service';
declare var jQuery: any;
@Component({
  selector: 'app-near-by',
  templateUrl: './near-by.component.html',
  styleUrls: ['./near-by.component.scss']
})
export class NearByComponent implements OnInit {

  public nearByData: any = []

  constructor(private _nearbyService: NearByService) { }


  set nearBy(nearByData: any) {
    this.nearByData += nearByData;
 }


  ngOnInit() {
    this._nearbyService.getSpots()
      .subscribe((data: any) => {
        $.each(data, function (i, item) {
          

          var distanceService = new google.maps.DistanceMatrixService();
          distanceService.getDistanceMatrix({
            origins: ["Newark, DE"],
            destinations: [item.title],
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            durationInTraffic: true,
            avoidHighways: false,
            avoidTolls: false
          },
            function (response, status) {
             
              if (status !== google.maps.DistanceMatrixStatus.OK) {
                console.log('Error:', status);
              } else {
                if (response.rows[0].elements[0].distance.text.length > 0) {
                  console.log(response.rows[0].elements[0].distance.text.length);
                  var dist = response.rows[0].elements[0].distance.text;
                  dist = dist.replace(/[^0-9.,]+/, " ");
                  var distInt = parseInt(dist);
                  if (distInt < 10000) {
                   
                    console.log("This -- " + item.title);
                    $('.card-deck').append('<div class="container" style="max-width: 300px;"><a id="cards" style="text-decoration: none;" routerLink="/chosen-spot/' + item._id + '><div class="elevate card"><img class="card-img-top" src=' + item.img +  ' alt="Card image cap"><div class="card-body"><h5 style="text-decoration: none;" class="card-title">' + item.title + '</h5><p class="card-text">' + item.price + '</p> <!-- <a href="http://localhost:4200/chosen-spot/' + item._id + 'class="btn">Reserve Spot</a> --><p class="card-text"><small class="text-muted"> Listed:' + data.date + '</small></p><p style="text-align: center; position: absolute; bottom: -5px;"><small class="text-muted"> Click for more information </small></p></div></div></a></div>');  
    
                  }
                }
                

                // alert(response.rows[0].elements[0].duration.text);
              }
              
             
            });
          


        });
        

      });




    $("#search").focusin(function () {
      $("#Modal").show();
    });

    $("#close").click(function () {
      $('#Modal').hide();
    });

    $.getJSON('localhost:3000/spots', function (data) {
      $.each(data, function (i, field) {
        console.log(field);

      });
    }

    )
  }
}

