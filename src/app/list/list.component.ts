import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  private electric: boolean = false;
  private covered: boolean = false;
  public nearByData: any = []
  public reader;
  constructor(private _router: Router) { }








  submit() {
    alert("T")
    const url = '/api/location/spot';
    const title = $('#Email').val(); //title
    const price = $('#Password').val(); //price
    const img = $('#img').val(); //img

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

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let date= mm + '/' + dd + '/' + yyyy;
    // var blobFile = $('#imgID')[0].files[0];
    // alert(JSON.stringify($('#imgID')[0].files[0]))
    // var reader = new FileReader();
    // formData.append("fileToUpload", blobFile);
 

alert(this.reader)
    const data = {
      title: title,
      price: price,
      address: title,
      imgID: this.reader,
      // user: userName,
      // userid: userID,
      // userrating: 5,
      // electric: this.electric,
      // covered: this.covered
    };
    
   

//  alert(JSON.stringify(data))
    

    const req = {
      method: 'put',
      headers: {
        'content-type': 'application/x-www-form-urlencode',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };

  
    var that = this;

    

    fetch(url, req)
      .then(function () {
        that._router.navigate(['/postlist']);
      })
      .catch(function(){
        that._router.navigate(['/unauthorized']);
      });
    
  }

   readURL(input) {
     alert(input)
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
        this.reader = reader;
        alert(reader)
    }
}

  

  ngOnInit() {
    $('.container')
      .animate({ top: 0 })
      .delay(500);

      $('#checkboxOne').click(()=> {
        if(!this.electric){
          // alert("electric");
          this.electric = true;
        } else {
          this.electric = false;
        }
    });

    $('#checkboxTwo').click(()=> {
      if(!this.covered){
        // alert("covered");
        this.covered = true;
      } else {
        this.covered = false;
      }
  });

  
$("#imageUpload").change(()=> {
    this.readURL($("#imageUpload")[0]);
    alert("changed")
});

 


}


  
}




