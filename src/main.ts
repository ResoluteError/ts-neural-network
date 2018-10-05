import { NNNetwork } from "./structures/Network";
import { Backprop } from "./math/Backprop";

var network = new NNNetwork();

/*
var testArray = [];

for( var i = 0; i < 784; i++){
  testArray.push(Math.round(Math.random()*10)/10);
}

network.init(784, [16, 16, 10], [.2, 2, 2], [.2, 2, 1]);

var expected= [0,1,0,0,0,0,0,0,0,0];
*/

network.init(1,[1,1,1],[1,1,1],[1,1,1]);
var input = [1];
var expected = [1];

var output = network.calculate(input);
var backprop = new Backprop(network.export(), expected);
console.log("Output: " + output);
console.log("cost: " + backprop.costArray);