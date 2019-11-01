function test() {
  console.log("test");
}

function filterCards(data) {
  var filtered = [];
 
    var filter = $("#myInput").val().toLowerCase(); // get the value of the input, which we filter on
    console.log(filter);
    for (var i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().includes(filter)) {
        filtered.push(data[i]);
      }
    }

  return filtered;
}
