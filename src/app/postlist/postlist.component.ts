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
	
      setTimeout(function(){$('.done').addClass("drawn");},500)
      
    });
  }

}
