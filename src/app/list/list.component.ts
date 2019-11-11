import { Component, OnInit } from '@angular/core';
import { link } from 'fs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  constructor(private _router: Router) { }
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


    var that = this;

    fetch(url, req)
      .then(function () {
        that._router.navigate(['/postlist']);
      })
      .catch(err => console.log(err));
  }

  ngOnInit() {
    $('.container')
      .animate({ top: 0 })
      .delay(500);
  }
}


