import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {


  constructor() { }

  ngOnInit() {

  
      setTimeout(function() {
        $('.container').addClass('fadeIn');
      }, 300);
    
    
    //  $.backstretch("https://i.imgur.com/gh2udno.jpg");


  }

}
