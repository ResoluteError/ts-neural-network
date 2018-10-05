export class Sigmoid {

  static counter : number = 0;

  static calc( input : number) : number {
    this.counter++;
    var output = ( 1 / ( 1 + Math.pow( Math.E, (-1)*input)));
    return output;
  }

}