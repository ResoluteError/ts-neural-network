"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Network_1 = require("./structures/Network");
const Backprop_1 = require("./math/Backprop");
const Manipulation_1 = require("./structures/Manipulation");
const Mnist_1 = require("./importers/Mnist");
const fs = __importStar(require("fs"));
numberRecognition(true, false);
function numberRecognition(writeNetwork, returnNetwork) {
    var network = new Network_1.NNNetwork();
    network.init(28 * 28, [16, 16, 10], [2, 2, 2], [3, 3, 3]);
    var mnist = new Mnist_1.Mnist();
    mnist.init();
    var trainingHits = 0;
    var trainingMisses = 0;
    for (var trainings = 0; trainings < 50000; trainings++) {
        var manipulation = new Manipulation_1.ManipulationMatrix(network.export());
        var setCost = 0;
        var setHits = 0;
        var setMisses = 0;
        for (var testSet = 0; testSet < 10; testSet++) {
            var randomIndex = Math.floor(mnist.structuredData[testSet % 10].length * Math.random());
            var input = mnist.structuredData[testSet % 10][randomIndex].input;
            var expectedOutput = mnist.structuredData[testSet % 10][randomIndex].expectedOutput;
            var output = network.calculate(input);
            var networkData = network.export();
            var backprop = new Backprop_1.Backprop(networkData, expectedOutput);
            setCost += backprop.totalCost;
            if (getMaxIndex(output) === (testSet % 10)) {
                setHits++;
                trainingHits++;
            }
            else {
                setMisses++;
                trainingMisses++;
            }
            backprop.execute(manipulation);
        }
        if (trainings === 49000) {
            trainingHits = 0;
            trainingMisses = 0;
        }
        manipulation.apply(network, .2, .2);
        if ((trainings + 1) % 1000 === 0 || trainings === 0) {
            console.log('------- Training Iteration #' + (trainings + 1) + ' -------');
            console.log("Set Cost: " + (setCost / 10));
            console.log("Hits vs Misses: " + setHits + " / " + setMisses);
        }
    }
    console.log("On last Trainings: Hits vs Misses - " + trainingHits + " / " + trainingMisses);
    if (writeNetwork) {
        fs.writeFile(__dirname + '/../networks/number-recognition-' + Date.now() + ".json", JSON.stringify(network.export()), (err) => {
            if (err)
                throw err;
            console.log("Wrote network to file!");
        });
    }
    if (returnNetwork) {
        return network;
    }
}
function getMaxIndex(array) {
    var maxValue = 0;
    var maxIndex = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] > maxValue) {
            maxValue = array[i];
            maxIndex = i;
        }
    }
    return maxIndex;
}
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
