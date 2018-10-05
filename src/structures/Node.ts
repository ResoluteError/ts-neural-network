export interface NNNodeObj {

  // All weights between nodes from the previews layer leading up to this node 
  weights: number[];

  // The bias of this node
  bias: number;

}

export class NNNode implements NNNodeObj{


  weights: number[];
  bias: number;

  // Activation Value
  value: number;

  /**
   * Creates an instance of Node.
   * 
   * @memberof Node
   */
  constructor(){
    this.weights = [];
    this.bias = 0;
    this.value = 0;
  }

  /**
   * Initialize the node with random data
   *
   * @param {number} numberOfWeights - equal to number of nodes in previous layer
   * @param {number} weightsRange - range between lowest and highest weight
   * @param {number} biasRange - range between lowest and highest bias
   * @memberof Node
   */
  init(numberOfWeights : number, weightsRange: number, biasRange: number): void{

    for( var i = 0; i < numberOfWeights; i++){
      this.weights.push((Math.random()-0.5) * weightsRange);
    }

    this.bias = (Math.random()-0.5) * weightsRange;

  }

  /**
   * Load NN data from a previous run into this NN
   *
   * @param {NodeObj} data
   * @memberof Node
   */
  load(data : NNNodeObj): void{
    this.weights = data.weights;
    this.bias = data.bias;
  }

  /**
   * Export Node Data to later rebuild the exact same NN
   *
   * @returns {NodeObj}
   * @memberof Node
   */
  export() : NNNodeObj{
    return {
      weights : this.weights,
      bias: this.bias
    }
  }

  /**
   * Calculates the node value based on the input and returns the activation value
   *
   * @param {number[]} inputActivations - array of input values from previious nodes
   * @returns {number} - activation value of this node
   * @memberof Node
   */
  calculateValue( inputActivations : number[]): number{

    if(inputActivations.length !== this.weights.length){
      throw new Error(`Length of inputs (${inputActivations.length}) does not match length of weights (${this.weights.length})`);
    }

    var sum = 0;
    for( var i = 0; i < inputActivations.length; i++){
      sum += inputActivations[i] * this.weights[i];
    }
    sum += this.bias;
    this.value = sum;
    return sum;
  }

}