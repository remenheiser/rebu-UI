import { Component, OnInit } from '@angular/core';
import { link } from 'fs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  constructor() { }
  submit() {
    const url = '/api/location/spot';
    const title = $('#Email').val(); //title
    const price = $('#Password').val(); //price
    const img = $('#img').val(); //img


    var token = localStorage.getItem('token');
    let jwtData = token.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let date= mm + '/' + dd + '/' + yyyy;


    const data = {
      title: title,
      price: price,
      img: img,
      date: date,
      userid: decodedJwtData.email
    };


    const req = {
      method: 'put',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    };

    fetch(url, req)
      .then(function () {
        alert("ok");
      })
      .catch(err => console.log(err));

    // $.ajax({
    //   type: 'PUT',
    //   url: '/api/location/spot',
    //   data: JSON.stringify({ title: title, price: price, img: img }),
    //   success(response) {
    //     alert('spot posted');
    //   },
    //   error(xhr) {
    //     // Do Something to handle error
    //     console.log(xhr.responseText);
    //     alert('spot failed');
    //   }
    // });
  }

  ngOnInit() {
    $('.container')
      .animate({ top: 0 })
      .delay(500);
  }
}


