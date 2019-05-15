const stampit = require('stampit');

//  Define Chacter
const character = stampit().
  props({
      name: 'anonymous',
      lifePoints: 100,
      x: 0,
      y: 0,
  });

const c = character();
c.name = 'John';
c.lifePoints = 10;
console.log(c);


// Define Mover 
const mover = stampit(). 
   methods({
       move(xIncr, yIncr) {
           this.x += xIncr;
           this.y += yIncr;
           console.log(`${this.name} moved to [${this.x}, ${this.y}]`);
       }
   }) 
  