/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { ChosenSpotService } from './chosen-spot.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-chosen-spot',
  templateUrl: './chosen-spot.component.html',
  styleUrls: ['./chosen-spot.component.scss']
})
export class ChosenSpotComponent implements OnInit {
  public spotsData: any = [];


  constructor(
    private _chosenSpotService: ChosenSpotService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  selectId: number;

  public lat = 0;
  public lng = 0;

  public origin: any;
  public destination: any;

  public payPalConfig?: IPayPalConfig;


  reshowDates() {
    $('#datebutton').hide()
    $('#daterange').show()
  }

  updateValue(){
    let chosenDate = $('#daterange').val().toString()
    $('#datestatus').text(chosenDate);
    $('#datestatus').append('<img style="margin-left: 5px; margin-top: -5px; position: relative; max-height: 15px;" src="../../assets/greenCheck.png">')
    
    $('#datebutton').show()
    $('#daterange').hide()

    
  }

  ngOnInit() {
   
    $('#datebutton').hide()

    $('.add-to-cart').click(function() {
      this.classList.toggle('added');
    })
    
  
  


    this.initConfig();
    setTimeout(this.startMap, 2000);

    let id = this.route.snapshot.params['id'];
    this.selectId = id;

    this.spotsData = [];

    this._chosenSpotService.getSpots(this.selectId).subscribe((data: any) => {
      console.log(this.spotsData);
      this.spotsData = data;
    });
  }


  //
  initConfig() {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: data =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: '9.99',
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: '9.99'
                  }
                }
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: '9.99'
                  }
                }
              ]
            }
          ]
        },
      advanced: {
        commit: 'true'
      },
      style: {
        size: 'small',
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then(details => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: data => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        //this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  //
  startMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    function initMap() {
      var chicago = new google.maps.LatLng(41.850033, -87.6500523);
      var mapOptions = {
        zoom: 7,
        center: chicago,
        
        
        
      };
      var chicago = new google.maps.LatLng(41.850033, -87.6500523);
      var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 7,
        center: chicago,
        styles:
            [{
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e9e9e9"
                },
                {
                  "lightness": 17
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                },
                {
                  "lightness": 20
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "lightness": 17
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "lightness": 29
                },
                {
                  "weight": 0.2
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "lightness": 18
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "lightness": 16
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                },
                {
                  "lightness": 21
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dedede"
                },
                {
                  "lightness": 21
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "visibility": "on"
                },
                {
                  "color": "#ffffff"
                },
                {
                  "lightness": 16
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "saturation": 36
                },
                {
                  "color": "#333333"
                },
                {
                  "lightness": 40
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f2f2f2"
                },
                {
                  "lightness": 19
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#fefefe"
                },
                {
                  "lightness": 20
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#fefefe"
                },
                {
                  "lightness": 17
                },
                {
                  "weight": 1.2
                }
              ]
            }
            ]
      });
      directionsRenderer.setMap(map);
      
      
    }

    function calcRoute() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          var start = new google.maps.LatLng(pos.lat, pos.lng);
          var end = $('#mainTitle').text();

          $('#phoneButton').click(function () {
            window.window.open(
              'https://www.google.com/maps/dir/' +
              pos.lat +
              ',' +
              pos.lng +
              '/' +
              end,
              '_blank'
            );
          });

          var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
          };
          directionsService.route(request, function (result, status) {
            if (status == 'OK') {
              console.log('OK!');
              directionsRenderer.setDirections(result);
            } else {
              console.log('Status: ' + status);
            }
          });
        });
      }
    }
    initMap();
    calcRoute();
  }
}
