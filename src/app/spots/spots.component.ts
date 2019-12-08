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

  public electricSpot: boolean = false;
  public coveredSpot: boolean = false;

  constructor(private _spotService: SpotsService) { }

  ngOnInit() {
    this.spotsData = [];
    this._spotService.getSpots()
      .subscribe((data: any) => {
        this.spotsData = data;
        this.spotsOrgList = data;
      });



    // Filter
    $("button[cs-filter]").click(function () {
      var t = $(this).attr('cs-filter');
      $("button[cs-filter]").removeClass('btn-active');
      $(this).addClass('btn-active');
      if (t == "*") {
        $("li.items[cs-category]").show("fast");
      } else {
        $.each($("li.items[cs-category]"), function (index, value) {
          if (!$(this).attr('cs-category').match(new RegExp(t))) {
            $(this).hide("fast");
          } else {
            $(this).show("fast");
          }
        });
      }
    });

    // Sort Button
    $("button[cs-sort]").click(() => {
      var t = $(this).attr('cs-sort');
      $("button[cs-sort]").removeClass('btn-active');
      $(this).addClass('btn-active');
      switch (t) {
        case 'Price':
          this.sort('price');
          // $("ul li.items").sort(function(a, b) {
          //   var f = parseInt($(b).find('span.product-price').text().replace(',', ''));
          //   var s = parseInt($(a).find('span.product-price').text().replace(',', ''));
          //   return (f < s) ? 1 : -1;
          // }).each(function() {
          //   var elem = $(this);
          //   elem.remove();
          //   $(elem).appendTo("ul");
          // });
          break;

        case 'Name':
          this.sort('title')
          // $("ul li.items").sort(function(a, b) {
          //   return (($(b).find('span.product-name').text()) < ($(a).find('span.product-name').text())) ? 1 : -1;
          // }).appendTo('ul');
          break;
      }
    });



    $('.dropdown-el').click((e) => {
      e.preventDefault();
      e.stopPropagation();
      $('.dropdown-el').toggleClass('expanded');
      // alert($(e.target).attr('for'));
      $('#' + $(e.target).attr('for')).prop('checked', true);
      this.sort($(e.target).attr('for'));
    });
    $(document).click(function () {
      $('.dropdown-el').removeClass('expanded');
    });



  }

  filterElectric() {
    if (this.electricSpot) {
      this.electricSpot = false;
      this.spotsData = this.spotsOrgList;
    }
    else {
      this.electricSpot = true;
      this.spotsData = $.grep(this.spotsData, function (h) {
        return h.electric;
      });
    }
  }

  filterCovered() {
    if (this.coveredSpot) {
      this.coveredSpot = false;
      this.spotsData = this.spotsOrgList;
    }
    else {
      this.coveredSpot = true;

      this.spotsData = $.grep(this.spotsData, function (h) {
        return h.covered;
      });
    }
  }

  sort(by) {
    if (by == "Relevance") {
      this.spotsData.sort(function (a, b) {
        var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      });
    }
    if (by == "Price") {
      this.spotsData.sort(function (a, b) {
        var priceA = parseInt(a.price.toLowerCase().replace(/[^0-9.]/g, "")), priceB = parseInt(b.price.toLowerCase().replace(/[^0-9.]/g, ""));
        if (priceA < priceB) //sort string ascending
          return -1;
        if (priceA > priceB)
          return 1;
        return 0; //default return value (no sorting)
      });
    }
    if (by == "Date") {
      this.spotsData.sort(function (a, b) {
        var c = new Date(a.date);



        var d = new Date(b.date);
    


    

          if (c < d) { //sort string ascending

            return -1;
           
          }
          if (c > d) {
        
            return 1;
          
          }
          else {
        
            return 0; //default return value (no sorting)
        
          }
        
      });
    }
  }





  onKeyup() {
    this.spotsData = filterCards(this.spotsOrgList);

  }

}
