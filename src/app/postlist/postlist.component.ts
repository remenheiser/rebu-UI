import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {

  constructor() { }

  

  ngOnInit() {
    $(window).on("load",function(){
      centerCloud();
      setTimeout(function(){$('.done').addClass("drawn");},500)
      
    });
  }

}
$(window).on('resize', function(){
  centerCloud();
});

function centerCloud() {
  var cloudCenter = $('svg').outerWidth()/2 -175;
  $('path').css('transform', 'translate(' + cloudCenter + 'px, 30px) scale(0.5)');
 
}



$(document).ready(function(){
  setTimeout(function(){
  $('.circle-loader').toggleClass('load-complete');
  $('.checkmark').toggle();
  $('#status').text("Spot Listed");
  $('svg').fadeOut(1000);
  $('path').css('stroke-dasharray', 'none');
  $('path').css('animation', 'none');
  $('svg').fadeIn(1000);
  setTimeout(function () {
    $('#status').css("color", "rgb(255, 255, 255)");
}, 1000);
  }
  ,5000)
});


