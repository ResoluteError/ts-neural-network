"use strict";
// Test #1 
/*
import { NNNetwork } from "./structures/Network";
var network = new NNNetwork();
network.init(2,[2,2,2],[1,1,1],[3,3,3]);
var inputs = [[1,0],[0,0]]
var expectedOutputs = [[0,1],[1,1]]
for( var iteration = 0; iteration < inputs.length; iteration++){
  var output = network.calculate(inputs[iteration]);
  console.log("======= Iteration #"+iteration+" =======");
  console.log("Inputs: " + inputs[iteration]);
  console.log("Got Outputs: " + output);
  console.log("Expected Outputs: " + expectedOutputs[iteration]);
}*/
Object.defineProperty(exports, "__esModule", { value: true });
const Network_1 = require("./structures/Network");
const Backprop_1 = require("./math/Backprop");
const Manipulation_1 = require("./structures/Manipulation");
var network = new Network_1.NNNetwork();
network.init(2, [2, 2, 2], [1, 1, 1], [3, 3, 3]);
var inputs = [], expectedOutputs = [];
for (var i = 0; i < 1000; i++) {
    var first = Math.round(Math.random() * 100) / 100;
    var second = Math.round(Math.random() * 100) / 100;
    inputs.push([first, second]);
    expectedOutputs.push([Math.abs(1 - first), Math.abs(1 - second)]);
}
for (var epoch = 0; epoch < 100; epoch++) {
    console.log("======== Starting Epoch #" + (epoch + 1) + " ============");
    var epochCost = 0;
    for (var batch = 0; batch < 100; batch++) {
        var manipulation = new Manipulation_1.ManipulationMatrix(network.export());
        for (var item = 0; item < 10; item++) {
            var ouput = network.calculate(inputs[batch * 10 + item]);
            var backprop = new Backprop_1.Backprop(network.export(), expectedOutputs[batch * 10 + item]);
            backprop.execute(manipulation);
            epochCost += backprop.totalCost;
        }
        manipulation.apply(network, .5, .5);
    }
    console.log(`Total cost of epoch: ${epochCost}`);
    console.log("Completed Epoch #" + (epoch + 1));
}
var testInput = [1, 0];
var testExpectedOuput = [0, 1];
var ouput = network.calculate(testInput);
console.log("==== Test ===");
console.log("Output: " + ouput);
console.log("Expected Output: " + testExpectedOuput);
console.log("=============");
var testInput = [0, 1];
var testExpectedOuput = [1, 0];
var ouput = network.calculate(testInput);
console.log("==== Test ===");
console.log("Output: " + ouput);
console.log("Expected Output: " + testExpectedOuput);
console.log("=============");
var testInput = [.5, .75];
var testExpectedOuput = [.5, .25];
var ouput = network.calculate(testInput);
console.log("==== Test ===");
console.log("Output: " + ouput);
console.log("Expected Output: " + testExpectedOuput);
console.log("=============");
/*

import { Backprop } from "./math/Backprop";
import { ManipulationMatrix } from "./structures/Manipulation";
import { Mnist } from "./importers/Mnist";
import * as fs from 'fs';

numberRecognition(true, false);

function numberRecognition(writeNetwork : boolean, returnNetwork : boolean){
  
  var network = new NNNetwork();
  network.init(28*28,[16,16,10],[2,2,2],[3,3,3]);

  var mnist = new Mnist();
  mnist.init();

  var trainingHits = 0;
  var trainingMisses = 0;

  for( var trainings = 0; trainings < 50000; trainings++){
    var manipulation = new ManipulationMatrix(network.export());
    var setCost = 0;
    var setHits = 0;
    var setMisses = 0;
    for(var testSet = 0; testSet < 10; testSet++){
      var randomIndex = Math.floor(mnist.structuredData[testSet%10].length * Math.random())
      var input = mnist.structuredData[testSet%10][randomIndex].input;
      var expectedOutput = mnist.structuredData[testSet%10][randomIndex].expectedOutput;
      var output = network.calculate(input);
      var networkData = network.export();
      var backprop = new Backprop(networkData, expectedOutput);
      setCost += backprop.totalCost;
      if(getMaxIndex(output) === (testSet%10)){
        setHits++;
        trainingHits++;
      } else {
        setMisses++;
        trainingMisses++;
      }
      backprop.execute(manipulation);
    }
    if(trainings === 49000){
      trainingHits= 0;
      trainingMisses = 0;
    }
    manipulation.apply(network,.2,.2);
    if((trainings + 1) % 1000 === 0 || trainings === 0){
      console.log('------- Training Iteration #'+(trainings+1)+' -------');
      console.log("Set Cost: " + (setCost / 10));
      console.log("Hits vs Misses: " + setHits + " / " + setMisses);
    }
  }

  console.log("On last Trainings: Hits vs Misses - " + trainingHits + " / " + trainingMisses);

  if(writeNetwork){
    fs.writeFile(__dirname + '/../networks/number-recognition-'+Date.now()+".json",JSON.stringify(network.export()), (err) => {
      if(err) throw err;
      console.log("Wrote network to file!");
    });
  }

  if(returnNetwork){
    return network;
  }

}

function getMaxIndex(array : number[]): number{
  var maxValue = 0;
  var maxIndex = 0;
  for( var i = 0; i < array.length; i++){
    if(array[i] > maxValue){
      maxValue = array[i];
      maxIndex = i;
    }
  }
  return maxIndex;
}
*/
/*
function oneToOneMappingExample(){

  var network = new NNNetwork();
  network.init(2,[16,16,2],[4,4,4],[5,5,5]);
  
  var inputs = [[1,0],[0,1],[1,1],[0,0]];
  var expectedOutputs = inputs;

  for(var trainings = 0; trainings < 2000; trainings++){
    if((trainings + 1) % 1000 === 0 || trainings === 0){
      console.log('------- Training Iteration #'+(trainings+1)+' -------');
    }
    var manipulation = new ManipulationMatrix(network.export());
    for(var testSet = 0; testSet < inputs.length; testSet++){
      var output = network.calculate(inputs[testSet])
      if((trainings +1) % 1000 === 0 || trainings === 0){
        console.log('' + inputs[testSet] + ' => ' + output + '');
      }
      var networkData = network.export();
      var backprop = new Backprop(networkData, expectedOutputs[testSet]);
      backprop.execute(manipulation);
    }
    manipulation.apply(network,1,1);
  }
}*/ 
