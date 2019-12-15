import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SpotsService } from './account.component.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
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

  

  constructor(public matDialog: MatDialog, private _router: Router, private _spotService: SpotsService) { }

//   settingsModal() {
//    $("#modal").toggleClass('show');
//   }

openModal() {
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "100%";
  dialogConfig.width = "600px";
  // https://material.angular.io/components/dialog/overview
  const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
}

  toggleClassProfile(){
   $('#page-content-wrapper').toggleClass("hide");
   $('#settings-wrapper').toggleClass("hide");
  }

  toggleSettingsScreen(){
   $('#page-content-wrapper').toggleClass("hide");
   $('#settings-wrapper').toggleClass("hide");
   
  }

  submit() {
   const url = '/api/user/register';
   const profimg = $('#profpic').val(); //title
   const email = $('#userem').val(); //price


   var userName = localStorage.getItem('username');
   var userID = localStorage.getItem('email');

   var decodedJwtData;
   if (localStorage.getItem('token') != null){
   var token = localStorage.getItem('token');
   let jwtData = token.split('.')[1]
   let decodedJwtJsonData = window.atob(jwtData)
   decodedJwtData = JSON.parse(decodedJwtJsonData)
   } else{
     this._router.navigate(['/unauthorized']);
   }




   const data = {
     profilePic: profimg,
     email: email
   };

//  alert(JSON.stringify(data))
   

   const req = {
     method: 'put',
     headers: {
       'content-type': 'application/json',
       authorization: `Bearer ${token}`
     },
     body: JSON.stringify(data)
   };



   let that = this;

   fetch(url, req)
     .then(() => {
       that._router.navigate(['/postlist']);
     })
     .catch(() => {
       that._router.navigate(['/unauthorized']);
     });
 }



  ngOnInit() {

   
   $('#settings-wrapper').toggleClass("hide");
   $('.screen').toggleClass("hide");

   $('#settingsIcon').click(function(){
      $('.screen').toggleClass("hide");
   });


    var token = localStorage.getItem('token');
    var pic =localStorage.getItem('profilePic').toString();
  
    if(!(pic === 'undefined')){
      this.profilePic = pic;
   
    }else{
       this.profilePic = 'https://i-love-png.com/images/profile-icon_11542.png';
       localStorage.setItem("profilePic", "https://i-love-png.com/images/profile-icon_11542.png")
 
    }

    
    let jwtData = token.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    console.log(decodedJwtData);
    this.userEmail = decodedJwtData.email;
    this.username = localStorage.getItem("username");




    this.userListings = [];
    this._spotService.getSpots()
      .subscribe((data: any) => {
        $('#listedSpots').text(data.length);
        console.log(data);
        for (var spot in data) {
                if (data[spot].userid == this.userEmail) {
                    this.userListings.push(data[spot]);
                }
              }
              if(this.userListings.length < 1){
                var obj = JSON.parse('{ "_id":"5de9a56909ae1e1b342fd537","title":"List your first spot","price":"For Free","img":"https://cdn.shopify.com/s/files/1/0061/4780/1157/files/StartToday_Logo.png?10734","user":"Korey","userid":"korey@gmail.com","userrating":5,"electric":false,"covered":false,"__v":0,"distance":"1"}'); 
                this.userListings.push(obj);
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

