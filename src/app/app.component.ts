import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Power0, Power1, Power2, Power3, Power4, TimelineMax, TweenLite} from "gsap";
// declare var TimelineMax: any;
// declare var TweenMax: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent {
  title = 'rebu';

  constructor(public router: Router) { }

  public tlOpen: any;
  public tlClose: any;

  ngOnInit() {
    //OPEN TRIGGER
    var openTrigger = $('.menu-trigger');
    var openTriggerTop = openTrigger.find('.menu-trigger-bar.top');
    var openTriggerMiddle = openTrigger.find('.menu-trigger-bar.middle');
    var openTriggerBottom = openTrigger.find('.menu-trigger-bar.bottom');

    //CLOSE TRIGGER
    var closeTrigger = $('.close-trigger');
    var closeTrigger1 = $('.close-trigger1');
    var closeTriggerLeft = closeTrigger.find('.close-trigger-bar.left');
    var closeTriggerRight = closeTrigger.find('.close-trigger-bar.right');

    //LOGO
    var logo = $('.logo');

    //MENU
    var menuContainer = $('.menu-container');
    var menu = $('.menu');
    var menuTop = $('.menu-bg.top');
    var menuMiddle = $('.menu-bg.middle');
    var menuBottom = $('.menu-bg.bottom');

    //TL
    var tlOpen = new TimelineMax({ paused: true });
    var tlClose = new TimelineMax({ paused: true });
    this.tlOpen = tlOpen;
    this.tlClose = tlClose;

    function preventBehavior(e) {
    e.preventDefault(); 
    };

    function preventBehavior1(e) {
     
      };
    //OPEN TIMELINE
    tlOpen.add("preOpen")
      .to(logo, 0.4, {
        scale: 0.8,
        opacity: 0,
        ease: Power2.easeOut
      }, "preOpen")
      .to(openTriggerTop, 0.4, {
        x: "+80px", y: "-80px", delay: 0.1, ease: Power4.easeIn, onComplete: function () {
          // closeTrigger.css('z-index', '25');
        }
      }, "preOpen")
      .to(openTriggerMiddle, 0.4, {
        x: "+=80px", y: "-=80px", ease: Power4.easeIn,
        onComplete: function () {
          openTrigger.css('visibility', 'hidden');
        }
      }, "preOpen")
      .to(openTriggerBottom, 0.4, {
        x: "+=80px", y: "-=80px", delay: 0.2, ease: Power4.easeIn
      }, "preOpen")
      .add("open", "-=0.4")
      .to(menuTop, 0.8, {
        
        y: "13%",
        ease: Power4.easeInOut
      }, "open")
      .to(menuMiddle, 0.8, {
        
        scaleY: 1,
        ease: Power4.easeInOut
      }, "open")
      .to(menuBottom, 0.8, {
        
        y: "-114%",
        ease: Power4.easeInOut
      }, "open")
      .fromTo(menu, 0.6, {
        y: 30, opacity: 0, visibility: 'hidden'
      }, {
        y: 0, opacity: 1, visibility: 'visible', ease: Power4.easeOut
      }, "-=0.2")
      .add("preClose", "-=0.8")
      .to(closeTriggerLeft, 0.8, {
        x: "-=100px", y: "+=100px", ease: Power4.easeOut
      }, "preClose")
      .to(closeTriggerRight, 0.8, {
        x: "+=100px", y: "+=100px", delay: 0.2, ease: Power4.easeOut
      }, "preClose");

    //CLOSE TIMELINE
    tlClose.add("close")
      .to(menuTop, 0.2, {
        backgroundColor: "rgb(225,92,50)", ease: Power4.easeInOut, onComplete: function () {
          logo.css('z-index', '26');
          closeTrigger.css('z-index', '5');
          openTrigger.css('visibility', 'visible');
        }
      }, "close")
      .to(menuMiddle, 0.2, {
        zIndex: 1,
        backgroundColor: "rgb(225,92,50)", ease: Power4.easeInOut
      }, "close")
      .to(menuBottom, 0.2, {
        zIndex: 1,
        backgroundColor: "rgb(225,92,50)", ease: Power4.easeInOut
      }, "close")
      .to(menu, 0.6, {
        zIndex: 1,
        y: 20, opacity: 0, ease: Power4.easeOut, onComplete: function () {
          menu.css('visibility', 'hidden');
        }
      }, "close")
      .to(logo, 0.8, {
        scale: 1, opacity: 1, ease: Power4.easeInOut
      }, "close")
      .to(menuTop, 0.8, {
        y: "-113%",
        ease: Power4.easeInOut
      }, "close")
      .to(menuMiddle, 0.8, {
        scaleY: 0,
        ease: Power4.easeInOut
      }, "close")
      .to(menuBottom, 0.8, {
        y: "23%",
        ease: Power4.easeInOut,
        onComplete: function () {
          menuTop.css('background-color', '#ffffff');
          menuMiddle.css('background-color', '#ffffff');
          menuBottom.css('background-color', '#ffffff');
        }
      }, "close")
      .to(closeTriggerLeft, 0.2, {
        x: "+=100px", y: "-=100px", ease: Power4.easeIn
      }, "close")
      .to(closeTriggerRight, 0.2, {
        x: "-=100px", y: "-=100px", delay: 0.1, ease: Power4.easeIn
      }, "close")
      .to(openTriggerTop, 1, {
        x: "-=80px", y: "+=80px", delay: 0.2, ease: Power4.easeOut
      }, "close")
      .to(openTriggerMiddle, 1, {
        x: "-=80px", y: "+=80px", ease: Power4.easeOut
      }, "close")
      .to(openTriggerBottom, 1, {
        x: "-=80px", y: "+=80px", delay: 0.1, ease: Power4.easeOut
      }, "close");

    //EVENTS
    openTrigger.on('click', function () {
      if (tlOpen.progress() < 1) {
        $('.btn').hide;
        // document.addEventListener("touchmove", preventBehavior, {passive: false});
        tlOpen.play();
        
        // preventBehavior
      } else {
        // document.addEventListener("touchmove", preventBehavior, {passive: false});
        tlOpen.restart();
      }
    });

    closeTrigger.on('click', function () {
      if (tlClose.progress() < 1) {
        // document.removeEventListener("touchmove", preventBehavior1)
        tlClose.play();
      } else {
        // document.removeEventListener("touchmove", preventBehavior1)
        tlClose.restart();
      }
    });
    closeTrigger1.on('click', function () {
      if (tlClose.progress() < 1) {
        // document.removeEventListener("touchmove", preventBehavior1)
        tlClose.play();
      } else { 
        // document.removeEventListener("touchmove", preventBehavior1)
        tlClose.restart();
      }
    });

    

    

  }




  myAccount() {
    if (localStorage.hasOwnProperty('token')) {
      this.router.navigate(['account']);
    }
  }

  loginLogout() {

    // To invalidate a basic auth login:
    // 
    // 	1. Call this logout function.
    //	2. It makes a GET request to an URL with false Basic Auth credentials
    //	3. The URL returns a 401 Unauthorized
    // 	4. Forward to some "you-are-logged-out"-page
    // 	5. Done, the Basic Auth header is invalid now
    if (localStorage.hasOwnProperty('profilePic')) {
      localStorage.removeItem('profilePic');
    }

    if (localStorage.hasOwnProperty('token')) {
      // jQuery.ajax({
      //           type: "GET",
      //           url: "/api/user/login",
      //           async: false,
      //           username: "logmeout",
      //           password: "123456",
      //           headers: { "Authorization": "Basic xxx" }
      // })
      // .done(function(){
      // If we don't get an error, we actually got an error as we expect an 401!
      // })
      // .fail(function(){
      // We expect to get an 401 Unauthorized error! In this case we are successfully 
      // logged out and we redirect the user.
      localStorage.removeItem('token');
      this.router.navigate(['home']);
      // });

      // return false;
    }
  }

}


var tid = setInterval(mycode, 2000);
function mycode() {
  if (localStorage.hasOwnProperty('token')) {
    document.getElementById('logoutButton').innerHTML = 'Sign Out'; // Signed in
  } else {
    document.getElementById('logoutButton').innerHTML = 'Sign In'; // Signed out
  }
}

