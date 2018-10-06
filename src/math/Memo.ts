export class Memo {

  activationOnCost : number[][];

  constructor(){
    this.activationOnCost = [];
  }

  /**
   * Resets and initializes the activationOnCost array
   *
   * @param {number} layerCount
   * @memberof Memo
   */
  init(layerCount : number){
    this.activationOnCost = [];
    for( var i = 0; i < layerCount; i++){
      this.activationOnCost.push([]);
    }
  }

  add( value: number, layerIndex: number, nodeIndex : number){
    //console.log(`Adding ${value} to memo for activityOnCost[${layerIndex}][${nodeIndex}]`);
    if(!this.has(layerIndex, nodeIndex)){
      this.activationOnCost[layerIndex][nodeIndex] = value;
    } else {
      this.activationOnCost[layerIndex][nodeIndex] += value; 
    }
  }

  has( layerIndex : number, nodeIndex :number){
    return this.activationOnCost[layerIndex][nodeIndex] != null;
  }

  get(layerIndex: number, nodeIndex : number ): number{
    if( !this.has(layerIndex, nodeIndex)){
      throw new Error(`No memo for activityOnCost[${layerIndex}][${nodeIndex}]`);
    }
    return this.activationOnCost[layerIndex][nodeIndex];
  }

}