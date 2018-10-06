import { NNNetwork } from "./structures/Network";
import { Backprop } from "./math/Backprop";
import { ManipulationMatrix } from "./structures/Manipulation";

var network = new NNNetwork();

network.init(2,[2,2,2],[1,1,1],[1,1,1]);


var inputs = [[1,0],[0,1],[1,1],[0,0]];
var expectedOutputs = inputs;

for(var trainings = 1; trainings < 5001; trainings++){
  if(trainings % 1000 === 0 || trainings === 1){
    console.log('------- Training Iteration #'+(trainings)+' -------');
  }
  var manipulation = new ManipulationMatrix(network.export());
  for(var testSet = 0; testSet < inputs.length; testSet++){
    var output = network.calculate(inputs[testSet])
    if(trainings % 1000 === 0 || trainings === 1){
      console.log('' + inputs[testSet] + ' => ' + output + '');
    }
    var networkData = network.export();
    var backprop = new Backprop(networkData, expectedOutputs[testSet]);
    backprop.execute(manipulation);
  }
  manipulation.apply(network,5,5);
}