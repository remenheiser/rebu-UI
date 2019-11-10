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

    const data = {
      title: title,
      price: price,
      img: img
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
    .then(function() {
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


