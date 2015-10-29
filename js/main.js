(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#submitButton');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $show_second = $('input[name=show-second]');
  var $show_weather = $('input[name=show-weather]');
  var $show_location = $('input[name=show-location]');
  var $default_location = $('input[name=default-location]');

  if (localStorage.getItem("show_weather")) {
    $show_second[0].checked = localStorage.show_second === 'true';
    $show_weather[0].checked = localStorage.show_weather === 'true';
    $show_location[0].checked = localStorage.show_location === 'true';
    $default_location.val(localStorage.default_location);
    var $location_opt = $('select[name=location-opt]');
    
    var location_opt_val = localStorage.location_opt;
    $location_opt.children().each(function() {
      var $opt = $(this);
      if ($opt.val() === location_opt_val) {
        $opt.prop('selected', true);
      }
    });
  }
  
  // process colors
  $('input.item-color').each(function() {
    var name = $(this).attr('name');
    var key = name.replace(/\-/g, '_');
    if (localStorage.getItem("key"))
      $(this).val(localStorage[key]);
  });
}

function getAndStoreConfigData() {
  var $show_second = $('input[name=show-second]');
  var $show_weather = $('input[name=show-weather]');
  var $show_location = $('input[name=show-location]');
  var $default_location = $('input[name=default-location]');
  var $location_opt = $('select[name=location-opt]');

  var options = {
    show_second: $show_second[0].checked,
    show_weather: $show_weather[0].checked,
    show_location: $show_location[0].checked,
    default_location: $default_location.val(),
    location_opt: $location_opt.val(),
  };

  localStorage.show_second = options.show_second;
  localStorage.show_weather = options.show_weather;
  localStorage.show_location = options.show_location;
  localStorage.default_location = options.default_location;
  localStorage.location_opt = options.location_opt;
  
  // process colors
  var color_scheme = "";
  $('input.item-color').each(function() {
    var name = $(this).attr('name');
    var val = $(this).val();
    var key = name.replace(/\-/g, '_');
    color_scheme += key + "," + val + ",";
    localStorage[key] = val;
  });
  options.color_scheme = (color_scheme);

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}