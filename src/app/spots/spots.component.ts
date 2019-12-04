import { Component, OnInit } from '@angular/core';
import { SpotsService } from './spots.service';
declare let $: any;

declare var jQuery: any;
declare function test(): any;
declare function filterCards(data): any;

@Component({
  selector: 'app-spots',
  templateUrl: './spots.component.html',
  styleUrls: ['./spots.component.scss']
})
export class SpotsComponent implements OnInit {

  public spotsData: any = []

  public spotsOrgList: any = []

  constructor(private _spotService: SpotsService) { }

  ngOnInit() {
    this.spotsData = [];
    this._spotService.getSpots()
      .subscribe((data: any) => {
        this.spotsData = data;
        this.spotsOrgList = data;
      });


      $('.dropdown-el').click((e) => {
        e.preventDefault();
        e.stopPropagation();
        $('.dropdown-el').toggleClass('expanded');
        // alert($(e.target).attr('for'));
        $('#'+$(e.target).attr('for')).prop('checked',true);
        this.sort($(e.target).attr('for'));
        
      });
      $(document).click(function() {
        $('.dropdown-el').removeClass('expanded');
      });

  }

  sort(by){
    if(by == "Relevance"){
      this.spotsData.sort(function(a, b){
        var nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase();
        if (nameA < nameB) //sort string ascending
         return -1;
        if (nameA > nameB)
         return 1;
        return 0; //default return value (no sorting)
       });
  }
  if(by == "Price"){
    this.spotsData.sort(function(a, b){
      var priceA=parseInt(a.price.toLowerCase().replace(/[^0-9.]/g, "")), priceB= parseInt(b.price.toLowerCase().replace(/[^0-9.]/g, ""));
      if (priceA < priceB) //sort string ascending
       return -1;
      if (priceA > priceB)
       return 1;
      return 0; //default return value (no sorting)
     });
}
// if(by == "Date"){
//   this.spotsData.sort(function(a, b){
//     if(a.date && b.date){
//     var dateA=a.date.toLowerCase(), dateB=b.date.toLowerCase();
//     if (dateA < dateB) //sort string ascending
//      return -1;
//     if (dateA > dateB)
//      return 1;
//     return 0; //default return value (no sorting)
//     }
//    });
// }
  }

  



  onKeyup() {
    this.spotsData = filterCards(this.spotsOrgList);

  }

}
