import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})


export class UnauthorizedComponent implements OnInit {

  constructor() { }

  

  ngOnInit() {
    centerCloud();
  }

  

}

$(window).on('resize', function(){
  centerCloud();
});

function centerCloud() {
  var cloudCenter = $('svg').outerWidth()/2 -350;
  $('path').css('transform', 'translate(' + cloudCenter + 'px, 0px) scale(0.5)');
 
}

