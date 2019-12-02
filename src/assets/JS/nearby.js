function filterCardsNearBy(value, origList){
    // alert(origList)
    var filtered = [];
    $.each(origList, function (i, item) {
    
  
      var distanceService = new google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix({
        origins: ["Newark, DE"],
        destinations: [item.title],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false
      },
        callback);
  
  
       function callback(response, status) {
          if (status!==google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
          } else {
            console.log(response.rows[0].elements[0].distance.text.replace(/\D/g,''));
            if (response.rows[0].elements[0].distance.text.replace(/\D/g,'') < value){
              filtered.push(item);
            //   alert(item);
            }
          }
        }
    });
  
    return filtered;
  }