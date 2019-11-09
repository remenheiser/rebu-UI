import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
