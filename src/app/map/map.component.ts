import { Component, OnInit } from '@angular/core';
import { MenuService } from './map.service'
import { url } from 'inspector';
import { Router } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  public spotsData: any[];

  constructor(private _menuService: MenuService, private router: Router,) { }

  selectedSpot() {
    alert("yes")
  }

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
                animation: google.maps.Animation.DROP,
                title: address._id,
                map: map
              });

              markers.push(marker);

              console.log(markers);



              google.maps.event.addListener(marker, 'click', ((marker, i, ) => {
                return () => {
                  // alert(marker.title)
              

                  var first = marker.title.toString();
                  this.spotsData.sort(function (x, y) { return x._id === first ? -1 : y._id === first ? 1 : 0; });

                  // alert(data);

                  // infowindow.setContent(address.title + " " + address.price);
                  infowindow.open(map, marker);
                  var content = '<div routerLink=/chosen-spot/"' + address.id + '" style="max-width: 400px;" id="content">' + '<a  class="mapinfo">' + '<img style="max-width:200px" src="' + address.img + '" alt="' + address.title + '">' + '<div class="content-box">' + address.title + "\n" + address.price + '</div>' + '</a>';
                  // infowindow.setContent(content);
                  var routeLink = "/chosen-spot/" + address._id;
                  infowindow.setContent(
                    "<a style='font-family: fancy' id='infobutton'>" +
                    "<div class='info-card'>" +
                    "<div class='info-card-top'>" +
                    "<img  style='max-width:200px' src='" +
                    address.img +
                    "' class='info-card-image'>" +
                    "<div class='info-card-meta'>" +
                    "<div style='font-size: 20px' class='info-card-heading'>" +
                    address.title +
                    "</div>" +
                    "<div style='font-size: 12px' class='info-card-subheading'>" +
                    address.price +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div style='font-size: 12px' class='info-card-bottom'>" +
                    "<p>" + address.date + "</p>" +
                    "</div>" +
                    "</div>" +
                    "<a style='display: flex; justify-content: center;'> Tap for more info</a>"+
                    "</a>"
                  );

                  google.maps.event.addListenerOnce(infowindow, 'domready', () => {
                    document.getElementById('infobutton').addEventListener('click', () => {
                 
                     this.router.navigate([`/chosen-spot/${marker.title}`]);
                    });
                  });

                }
                
              })(marker, i));

              
              
         
              
            }

            console.log(markers[0]);




          });




        }
      });

  }


}
