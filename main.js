'use strict';

$(document).ready(init);

function init() {
  $('#go').click(goClicked);
  $('body').on("keypress", inputEnter);
}

function inputEnter(e) {
  if(e.which === 13) {
    goClicked(e);
  }
}

function goClicked(e) {
  var $inputCS = $('#inputCS').val().split(", ");
  $.get("http://api.wunderground.com/api/daf9b48cc5c4fd1b/conditions/q/" + $inputCS[1] + "/" + $inputCS[0] + ".json", {
    dataType: 'jsonp',
    method: 'GET'
  })

    .success(function(data){
    var dateNow = new Date();
    var hourNow = dateNow.getHours();
    var percHour = (hourNow / 24) * 100;
    var temp = data.current_observation.temp_f
    var weatherIcon = data.current_observation.icon_url
    var full = data.current_observation.display_location.full
    var zip = data.current_observation.display_location.zip
    var time = data.current_observation.local_time_rfc822
    $('.progress.progress-striped.active').attr("id", "showBar");
    $('.progress-bar').attr("style", "width: " + percHour + "%");
    $('#query').text(full + " " + zip + ", " + time);
    $('table').attr('class', "show");
    $('#one').text("Currently:");
    $('#outputTemp').text(temp + "°F");
    $('#two').text("Conditions:");
    $('#icon').attr("src", weatherIcon);
  })
  .fail(function(error) {
    console.log('error:', error);
  });
}
