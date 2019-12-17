import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  private electric = false;
  private covered = false;
  public nearByData: any = [];
  public reader;
  constructor(private ListCompRouter: Router) { }

  submit() {
    const url = '/api/location/spot';
    const title = $('#Title').val(); // title
    const address = $('#Address').val(); // address
    const price = $('#Price').val(); // price
    const img = (document.getElementById('imageUpload') as HTMLInputElement).files[0]; // spot image

    let formData = new FormData();

    const userName = localStorage.getItem('username');
    const userID = localStorage.getItem('email');
    let token: string;
    let decodedJwtData;

    if (localStorage.getItem('token') != null) {
      token = localStorage.getItem('token');
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      decodedJwtData = JSON.parse(decodedJwtJsonData);
    } else {
      this.ListCompRouter.navigate(['/unauthorized']);
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    const date = mm + '/' + dd + '/' + yyyy;
    // let blobFile = $('#imgID')[0].files[0];
    // alert(JSON.stringify($('#imgID')[0].files[0]))
    // let reader = new FileReader();

    formData.append('address', address);
    formData.append('price', price);
    formData.append('title', title);
    formData.append('spotImage', img);

    alert(this.reader);
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
      method: 'post',
      headers: {
        authorization: `Bearer ${token}`
      },
      body: formData
    };

    const that = this;

    fetch(url, req)
      .then(() => {
        that.ListCompRouter.navigate(['/postlist']);
      })
      .catch(() => {
        that.ListCompRouter.navigate(['/unauthorized']);
      });
  }

  readURL(input) {
    alert(input);
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
        $('#imagePreview').hide();
        $('#imagePreview').fadeIn(650);
      };
      reader.readAsDataURL(input.files[0]);
      this.reader = reader;
      alert(reader);
    }
  }

  ngOnInit() {
    $('.container')
      .animate({ top: 0 })
      .delay(500);

    $('#checkboxOne').click(() => {
      if (!this.electric) {
        // alert("electric");
        this.electric = true;
      } else {
        this.electric = false;
      }
    });

    $('#checkboxTwo').click(() => {
      if (!this.covered) {
        // alert("covered");
        this.covered = true;
      } else {
        this.covered = false;
      }
    });


    $('#imageUpload').change(() => {
      this.readURL($('#imageUpload')[0]);
      alert('changed');
    });

  }
}




