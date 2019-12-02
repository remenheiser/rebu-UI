import { Component, OnInit } from '@angular/core';
import { NearByService } from './near-by.service';
declare let $: any;
// declare function filterCardsNearBy(value, data): any;

@Component({
  selector: 'app-near-by',
  templateUrl: './near-by.component.html',
  styleUrls: ['./near-by.component.scss']
})
export class NearByComponent implements OnInit {

  public nearByData: any = []
  public rangeval: any;
  public spotsData: any = []
  public spotsOrgList: any = []

  constructor(private _nearbyService: NearByService) { }

  changeZoom() {

    var storedSpots = JSON.parse(localStorage.getItem("spots") || "[]");
    $.each(storedSpots, function (i, item) {
    console.log("THIS - " + item.title + " " + item.distance )
    });

    this.spotsData = [];
    this.filterCardsNearBy();
    let g = [];
    
   
    setTimeout(function () {
     
      var storedSpots = JSON.parse(localStorage.getItem("spots") || "[]");
      // alert("this" + storedSpots);
      $.each(storedSpots, function (i, item) {
        console.log("item - " + item)
        var rangeSlider = document.getElementById("rs-range-line") as HTMLTextAreaElement;
        var r = parseInt(rangeSlider.value)
        console.log(r)
        if (item.distance < r){
          g.push(item);
          console.log("Selected - "+ g)
        }else {
          console.log("nada - " + item.title + " " + item.distance )
        }
      });
    }, 700);
    this.spotsData = g;

  }

  setInterval() {
    // setInterval(function () {
    //   var modalValue = JSON.parse(localStorage.getItem('spots'));

    //   if (modalValue) {
    //     // use the value
    //     // remove the value when you are done so that this code doesn't run every time
    //     this.spotsData = JSON.parse(modalValue);
    //     console.log(JSON.parse(modalValue))
    //   }
    // }, 5000);
  }

  // setDistances() {

  //   // alert(value);
  //   this.spotsData = this.filterCardsNearBy();
  // }

  filterCardsNearBy() {
    localStorage.removeItem("spots");
    // var distance = google.maps.geometry.spherical.computeDistanceBetween("Milford,DE","Newark,DE"); 


    $.each(this.spotsOrgList, function (i, item) {

      // let gd = this.spotsData;

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
        callback);


      function callback(response, status) {

        if (status !== google.maps.DistanceMatrixStatus.OK) {
          console.log('Error:', status);
        } else {
          console.log(response.rows[0].elements[0].distance.text.replace(/[^0-9\.]+/g,""));
          if (response.rows[0].elements[0].distance.text.replace(/[^0-9\.]+/g,"")){
            item.distance = response.rows[0].elements[0].distance.text.replace(/[^0-9\.]+/g,"");
            // alert(item.distance)
            var storedSpots = JSON.parse(localStorage.getItem("spots") || "[]");
            storedSpots.push(item);

            localStorage.setItem("spots", JSON.stringify(storedSpots));


          }
        }


      }


    });

   
  }
  // readLocalStorageValue(key) {
  //   console.log("this " + localStorage.getItem(key.title));
  //   let value = localStorage.getItem(key.title);
  //   if (value == undefined) {
  //     value == '';
  //   }
  //   return parseInt(value);
  // }



  ngOnInit() {

    // With JQuery
    this.setInterval();
    var rangeSlider = document.getElementById("rs-range-line") as HTMLTextAreaElement;
    var rangeBullet = document.getElementById("rs-bullet") as HTMLTextAreaElement;


    rangeSlider.addEventListener("input", showSliderValue, false);

    function showSliderValue() {
      rangeBullet.innerHTML = rangeSlider.value;
      var bulletPosition = (parseInt(rangeSlider.value) / 30);
      rangeBullet.style.left = (bulletPosition * 280) + "px";
      this.rangeval = parseInt(rangeSlider.value)
      localStorage.setItem("range", rangeSlider.value);

    }



    this._nearbyService.getSpots()
      .subscribe((data: any) => {
        $.each(data, function (i, item) {
          item.distance = 0;
        })
        this.spotsData = data;
        this.spotsOrgList = data;
        console.log("data " + data);
        // this.setDistances();

        // this.spotsData = data;

      });



  }



}





