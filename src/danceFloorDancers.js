const pitouHead = '<img class="head" src="lib/Neferpitou_Head_Chibi.png"></img>';
const pitouBody = '<img class="body" src="lib/Neferpitou.png"></img>';
const kiteHead = '<img class="head" src="lib/Kite_Chibi_head.png"></img>';
const kiteBody = '<img class="body" src="lib/Kite_body.png"></img>';
// html strings to be converted to JQuerry obj

var AnimeDancer = function (character, top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$head;
  this.$body;
  this.character = character;
  this.tiltDirection = true;
  this.setCharacter();
};

AnimeDancer.prototype = Object.create(Dancer.prototype);
AnimeDancer.prototype.constructor = AnimeDancer;

AnimeDancer.prototype.setCharacter = function () {
  // Set images based on character
  if (this.character === 'kite') {
    this.$head = $(kiteHead);
    this.$body = $(kiteBody);
  } else {
    this.$head = $(pitouHead);
    this.$body = $(pitouBody);
  }
  let charImg = $(`<div id="${this.character}"></div>`).append(this.$head).append(this.$body);
  this.$node.append(charImg);
};

AnimeDancer.prototype.step = function () {
  // Run after setCharacter has run
  if (this.$node.children() !== undefined) {
    // Animate
    Dancer.prototype.step.call(this);

    // Set custom rotation specs based on character
    var rotH, rotB, rotS;
    if (this.character === 'kite') {
      rotH = this.tiltDirection ? 45 : -5;
      rotB = 5 * this.tiltDirection;
      rotS = 1000;
    } else {
      rotH = this.tiltDirection ? 27 : -27;
      rotB = 5 * this.tiltDirection;
      rotS = 1700;
    }

    //Head tilt
    $($(this.$node.children()[0]).children()[0]).animate(
      { deg: rotH },
      {
        duration: rotS,
        step: function (now) {
          $(this).css({ transform: 'rotate(' + now + 'deg)' });
        }
      }
    );
    //Body tilt
    $($(this.$node.children()[0]).children()[1]).animate(
      { deg: rotB },
      {
        duration: 1200,
        step: function (now) {
          $(this).css({ transform: 'rotate(' + now + 'deg)' });
        }
      }
    );
    // Invert tilt direction every pass
    this.tiltDirection = !(this.tiltDirection);
  }
};

// Anime Dancer Generator Function
var makeAnimeDancer = function (character, top, left, timeBetweenSteps) {
  return new AnimeDancer(character, top, left, timeBetweenSteps);
};