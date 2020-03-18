export const animation = () => {
  var canvas1 = document.getElementById('canvas-1');
  var canvas2 = document.getElementById('canvas-2');
  var context1 = canvas1.getContext('2d');
  var context2 = canvas2.getContext('2d');

  var width = canvas1.width = canvas2.width = 500;
  var height = canvas1.height = canvas2.height = 400;

  var squares = [];

  var side = 0;

  function Square(position, velocity, size, color, vRotation) {
    this.position = position;
    this.velocity = velocity;
    this.size = size;
    this.hue = color;
    this.rotation = 0;
    this.vRotation = vRotation;
    this.alpha = 1;
    this.launched = false;
  }

  Square.prototype.update = function() {
    // update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // update size
    this.size -= 0.05;
    // update rotation
    this.rotation += this.vRotation;
    this.alpha -= 0.002;
    if (this.alpha <= 0) this.launched = false;
  };

  Square.prototype.draw = function() {
    var context = this.side === 0 ? context1 : context2;
    // save canvas coordinate system
    context.save();
    // translate to center of square
    context.translate(this.position.x + this.size * 0.5, this.position.y + this.size * 0.5);
    // rotate the canvas
    context.rotate(this.rotation * Math.PI / 180);
    // translate back
    context.translate(-(this.position.x + this.size * 0.5), -(this.position.y + this.size * 0.5));

    context.globalAlpha = this.alpha;
    // draw the square
    context.beginPath();
    context.rect(this.position.x, this.position.y, this.size, this.size);
    var color = 'hsla(' + this.hue + ', 50%, 100%, ' + this.alpha + ')';
    context.strokeStyle = color;
    context.stroke();
    context.closePath();

    // restore the coordinate system
    context.restore();
  };

  // create the squares
  for (var i = 0; i < 500; i++) {
    var hue = Math.round(360 / 30 * i);
    var xSpread = Math.random() * 10 < 5;
    var square = new Square({
      x: xSpread ? -50 + Math.random() * 100 : -100,
      y: xSpread ? -100 : -50 + Math.random() * 100
    }, {
      x: 0,
      y: 0
    }, 30, hue, Math.random());
    squares.push(square);
  }

  setInterval(launchSquare, 100);

  function launchSquare() {
    if (side === 0) side = 1;
    else side = 0;
    for (var i = 0; i < squares.length; i++) {
      if (!squares[i].launched) {
        startSquare(squares[i], side);
        return;
      }
    }
  }

  function startSquare(square, side) {
    square.size = 30;
    square.alpha = 1;
    square.side = side;
    var xSpread = Math.random() * 10 < 5;
    var x = square.side === 0 ? (xSpread ? -50 + Math.random() * 100 : -100) : (xSpread ? 500 - Math.random() * 100 : 500);
    square.position.x = x;
    square.position.y = xSpread ? -100 : -50 + Math.random() * 100;
    square.velocity.x = square.side === 0 ? 0.5 + Math.random() * 1 : -0.5 + Math.random() * -1;
    square.velocity.y = 0.6 + Math.random() * 1;
    square.launched = true;
  }

  function loop() {
    context1.clearRect(0, 0, width, height);
    context2.clearRect(0, 0, width, height);
    for (var i = 0, l = squares.length; i < l; i++) {
      if (squares[i].launched) {
        squares[i].update();
        squares[i].draw();
      }
    }
    requestAnimationFrame(loop);
  }

  loop();
};
