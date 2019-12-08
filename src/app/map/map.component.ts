import { Component, OnInit } from '@angular/core';
import { MenuService } from './map.service'
import { url } from 'inspector';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  public spotsData: any[];

  constructor(private _menuService: MenuService) { }

  ngOnInit() {

    this._menuService.getSpots()
      .subscribe((data: any) => {
        this.spotsData = data;






        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: new google.maps.LatLng(39.6837, -75.7497),
          mapTypeId: google.maps.MapTypeId.ROADMAP,

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

          //   [
          //     {
          //         "stylers": [
          //             {
          //                 "hue": "#ff1a00"
          //             },
          //             {
          //                 "invert_lightness": true
          //             },
          //             {
          //                 "saturation": -100
          //             },
          //             {
          //                 "lightness": 33
          //             },
          //             {
          //                 "gamma": 0.5
          //             }
          //         ]
          //     },
          //     {
          //         "featureType": "water",
          //         "elementType": "geometry",
          //         "stylers": [
          //             {
          //                 "color": "#2D333C"
          //             }
          //         ]
          //     }
          // ]
        });


        var infowindow = new google.maps.InfoWindow();

        var marker, i;
        var markers = [];

        for (i = 0; i < this.spotsData.length; i++) {

          var geocoder = new google.maps.Geocoder();
          let address = this.spotsData[i];

          geocoder.geocode({ 'address': address.title }, (results, status) => {

            if (status == google.maps.GeocoderStatus.OK) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();

              let t = address.img;

              marker = new google.maps.Marker({
                icon: '../../assets/mapicon.png',
                position: new google.maps.LatLng(latitude, longitude),
                map: map
              });

              markers.push(marker);

              console.log(markers);

              google.maps.event.addListener(marker, 'click', ((marker, i, ) => {
                return () => {
                  infowindow.setContent(address.title + " " + address.price);
                  infowindow.open(map, marker);
                  var content = '<div routerLink=/chosen-spot/"' + address.id + '" style="max-width: 200px;" id="content">' + '<a  class="mapinfo">' + '<img style="max-width:100px" src="' + address.img + '" alt="' + address.title + '">' + '<div class="content-box">' + address.title + "\n"+address.price+ '</div>' + '</a>';
                  infowindow.setContent(content);

                }
              })(marker, i));
            }

            console.log(markers[0]);




          });




        }
      });

  }
}
