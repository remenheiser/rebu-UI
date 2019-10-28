import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-near-by',
  templateUrl: './near-by.component.html',
  styleUrls: ['./near-by.component.scss']
})
export class NearByComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $("#search").focusin(function(){
      $("#Modal").show();
    });
    
    $("#close").click(function() {
       $('#Modal').hide();
    });

    $.getJSON('localhost:3000/spots', function(data) {
      $.each(data, function(i, field){
        console.log(field);
      
  });
    }

    )}}
