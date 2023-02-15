$(document).ready(function () {

  // Store dancers
  window.dancers = [];

  $('.addDancerButton').on('click', function (event) {

    // New HTML elements
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');
    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var winLim = Math.floor(($('.bg').width()) * 0.03); // Limit dancers based on background size
    //alert(winLim);
    if (window.dancers.length < winLim) {

      if (Math.floor(Math.random() * 10) % 2 === 0) {
        character = 'kite';
      } else {
        character = 'pitou';
      }

      // Dancer max and min Y position
      var Ymin = 50;
      var Ymax = window.dancers.length === 0 ? ($('.bg').height() - ($('.bg').height() / 10)) : ($('.bg').height() - ($('.dancer').height() / 1.5));
      //    is this the first dancer (no .dancer to grab height)? set to 10% background    else max Y is background height - % of dancer height

      // Function to generate random number inclusivly
      var randomNumber = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      // create new dancer
      var dancer = dancerMakerFunction(
        character,
        randomNumber(Ymin, Ymax), // top
        100, // left
        Math.random() * 1000 // timeBetweenSteps
      );
      window.dancers.push(dancer);

      // Space dancers out as they are added
      numDancers = window.dancers.length;
      var left = $('body').width() / (2 * numDancers) - ($('.dancer').width() / 2);
      var leftSpacing = $('body').width() / window.dancers.length;

      for (let dancer in window.dancers) {

        window.dancers[dancer].setPosition.call(window.dancers[dancer], window.dancers[dancer].top, left);
        left += leftSpacing;
      }

      $('body').append(dancer.$node);
    }
  });

  $('.lineUpDancerButton').on('click', function (event) {

    // Keep all dancers at their X pos but change their Y based on background size
    for (let dancer in window.dancers) {
      window.dancers[dancer].lineUp.call(window.dancers[dancer], ($('.bg').height() - ($('.bg').height() / 6)));
    }
  });

  // Handle mouseover and mouseleave for .head
  $(document).on({
    mouseenter: function () {
      console.log('before');
      var styleSettings = {
        height: '75%'
      };
      $(this).css(styleSettings);
    },
    mouseleave: function () {
      console.log('after');
      var styleSettings = {
        height: '50%'
      };
      $(this).css(styleSettings);
    }
  }, '.head');
  // This works but the animation is sent to the queue which is littered with step functions
  // Cousing 'lag' and defeating the purpose of mouseover events
  // $(document).on({
  //   mouseenter: function () {
  //     console.log('before');
  //     $(this).animate( {
  //       height: '75%'
  //     }, '1ms', 'swing');
  //   },
  //   mouseleave: function () {
  //     console.log('after');
  //     $(this).animate( {
  //       height: '50%'
  //     }, '1ms', 'swing');
  //   }
  // }, '.head');
});
