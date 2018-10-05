export class Sigmoid {

  static calc( input : number) : number {
    var output = ( 1 / ( 1 + Math.pow( Math.E, (-1)*input)));
    return output;
  }

}