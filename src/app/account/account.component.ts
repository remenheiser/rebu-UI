import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SpotsService } from './account.component.service';
declare let $: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


  public userListings: any = []
  public userEmail: string;
  public username: string;
  public profilePic: string;

  

  constructor(private _spotService: SpotsService) { }

//   settingsModal() {
//    $("#modal").toggleClass('show');
//   }

 

  toggleClassProfile(){
   $('#page-content-wrapper').toggleClass("hide");
   $('#settings-wrapper').toggleClass("hide");
  }

  toggleSettingsScreen(){
   $('#page-content-wrapper').toggleClass("hide");
   $('#settings-wrapper').toggleClass("hide");
   
  }



  ngOnInit() {
   $('#settings-wrapper').toggleClass("hide");
   $('.screen').toggleClass("hide");

   $('#settingsIcon').click(function(){
      $('.screen').toggleClass("hide");
   });


    var token = localStorage.getItem('token');
    this.profilePic = localStorage.getItem('profilePic');

    
    let jwtData = token.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    console.log(decodedJwtData);
    this.userEmail = decodedJwtData.email;
    this.username = localStorage.getItem("username");




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

      
      $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
     });
     $("#menu-toggle-2").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled-2");
        $('#menu ul').hide();
     });
     
     function initMenu() {
        $('#menu ul').hide();
        $('#menu ul').children('.current').parent().show();
        //$('#menu ul:first').show();
        $('#menu li a').click(
           function() {
              var checkElement = $(this).next();
              if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                 return false;
              }
              if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                 $('#menu ul:visible').slideUp('normal');
                 checkElement.slideDown('normal');
                 return false;
              }
           }
        );
     }
     $(document).ready(function() {
        initMenu();
     });

    // $.ajax({
    //   type: 'GET',
    //   context : this,
    //   url: "/api/location/spots",
    //   headers: {
    //     'content-type': 'application/json',
    //     authorization: `Bearer ${localStorage.getItem('token')}`
    //   },
    //   success: function (response) {
    //     for (var spot in response) {
    //       console.log("Key:" + JSON.stringify(spot));
    //       console.log("Value:" + response[spot]);
    //       if (response[spot].userid == "korey@gmail.com") {
    //         // $('#temp').append('<a style="text-decoration: none;" routerLink="/chosen-spot/' + response[spot]._id + '><div class="card"><img class="card-img-top" src=' + response[spot].img + ' alt="Card image cap"><div class="card-body"><h5 style="text-decoration: none;" class="card-title">' + response[spot].title + '</h5><p class="card-text">' + response[spot].price + '</p><p class="card-text"><small class="text-muted"> Listed: ' + response[spot].date + '</small></p><p style="text-align: center; position: absolute; bottom: -5px;"><small class="text-muted"> Click for more information </small></p></div></div></a>'); 
    //         this.userListings.push(JSON.stringify(response[spot]));
    //       }
    //     }
    //     console.log("Spots: " + this.userListings);

    //   },
    //   error: function (xhr) {
    //     //Do Something to handle error
    //     alert(xhr.statusText);
    //   }
    // });



  }

  



}

