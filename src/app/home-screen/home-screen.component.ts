import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  constructor() { }
  

  ngOnInit() {
    centerCloud();
    // centerText();
  }

}


$(window).on('resize', function(){
  centerCloud();
  // centerText();
});

function centerCloud() {
  var cloudCenter = $('svg').outerWidth()/2 -320;
  $('path').css('transform', 'translate(' + cloudCenter + 'px, 0px)');
}

function centerText() {
  var textCenter = $('svg').outerWidth()/2 -350;
  $('#spotTest').css('transform', 'translate(' + textCenter + 'px, 0px)');
}


$(window).scroll(function () {

  /* Check the location of each desired element */


      var bottom_of_object = $("#spotTest").position().top + $("#spotTest").outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {

          $("#spotTest").delay(1000).animate({
              'opacity': '1'
          }, 5000);

      }



});