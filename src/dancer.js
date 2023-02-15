var Dancer = function (top, left, timeBetweenSteps) {
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.step();
  this.setPosition(top, left);
};

Dancer.prototype.step = function () {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  setTimeout( this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function (top, left) {
  this.top = top <= (50) ? (top + (50 - top)) : top; // Restrict Y pos to be under topBar (plus some more for the head)
  this.left = left;
  var styleSettings = {
    top: this.top,
    left: left
  };
  this.$node.css(styleSettings);
};

// Method to handle lineUp feature
Dancer.prototype.lineUp = function (sameY) {
  this.setPosition(sameY, this.left);
};
