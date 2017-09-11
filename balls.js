// balls.js
// Animate some number of balls on a javascript canvas.
// Illustrates
    // Constructor for creating objects
    // Prototype for shared methods
    // Template Notation for strings
    // Creating the balls completely within the bounds of the canvas
    // The canvas property of the context
    // forEach() loop notation
    // document.getElementsByTagName()

var balls = [];     // global balls array

// The Ball class constructor
function Ball(ctx) {
    // use some random numbers for radius and color
    var radius = (Math.random() * 20) + 5;    // radius between 5 and 25
    var red = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);

    this.ctx = ctx;    // save the context for drawing
    this.r = radius; // the random radius
    // random x and y location
    // Make sure that the ball is initially completely within the canvas
    // because otherwise it might get stuck
    this.x =  (Math.random() * (ctx.canvas.width - (2*radius))) + radius;
    this.y = (Math.random() * (ctx.canvas.height - (2*radius))) + radius;
    this.dx = (Math.random() * 3) + 2;
    this.dy = (Math.random() * 3) + 2;
    // use the template string notation to create the color
    this.color =  `rgb(${red},${green},${blue})`;
}

// An instance method for a ball to draw itself
Ball.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y,this.r,0,Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
}

// An instance method for a ball to update its position
Ball.prototype.update = function() {
    var cnv = this.ctx.canvas;  // use the canvas property of the context to get the bounds
    this.x += this.dx;
    if(this.x + this.r >= cnv.width ||
        this.x - this.r <= 0)
        this.dx = -this.dx;
    this.y += this.dy;
    if(this.y + this.r >= cnv.height ||
        this.y - this.r <= 0)
        this.dy = -this.dy;
}

// window.onload() --
// When the page has fully loaded, handle the load event
// to create all the balls and start the animation.
window.onload = function() {
    // getElementsByTagName() returns an array-like object of all the
    // elements with the given tag name
    // The canvas and its context are local variables in this function scope
    var cnv = document.getElementsByTagName("canvas")[0];
    var ctx = cnv.getContext("2d"); // cnv and ctx are local variables to this function scope
    cnv.width = 900;    // give the canvas an appropriate width and height
    cnv.height = 600;

    // create 20 balls using the Ball() constructor
    for(let i = 0; i < 20; i++) {
        balls.push(new Ball(ctx));   // add a new ball to the array
       }
    requestAnimationFrame(animate); // kick off the animation
    }

// animate() -- each animation frame
function animate() {
    if(balls.length) {
        var ctx = balls[0].ctx;     // because it's not global
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        // use the Array forEach() loop notation to draw and update all the balls
        balls.forEach(function(ball) { ball.draw(); ball.update(); })
        }
    requestAnimationFrame(animate);
    }
