import * as json0 from '../data/digits/0.json';
import * as json1 from '../data/digits/1.json';
import * as json2 from '../data/digits/2.json';
import * as json3 from '../data/digits/3.json';
import * as json4 from '../data/digits/4.json';
import * as json5 from '../data/digits/5.json';
import * as json6 from '../data/digits/6.json';
import * as json7 from '../data/digits/7.json';
import * as json8 from '../data/digits/8.json';
import * as json9 from '../data/digits/9.json';

export interface StructuredData {

  input : number[];
  expectedOutput : number[];

}

export class Mnist{

  private rawData : number[][];

  // First index = actual number (0-9); second Index = training item number
  structuredData : StructuredData[][];

  constructor(){
    this.rawData = [];
    this.structuredData = [];
  }

  init(){

    this.rawData.push((<any>json0).data);
    this.rawData.push((<any>json1).data);
    this.rawData.push((<any>json2).data);
    this.rawData.push((<any>json3).data);
    this.rawData.push((<any>json4).data);
    this.rawData.push((<any>json5).data);
    this.rawData.push((<any>json6).data);
    this.rawData.push((<any>json7).data);
    this.rawData.push((<any>json8).data);
    this.rawData.push((<any>json9).data);

    this.structuredData = this.structureData(this.rawData);

  }

  private structureData(rawData : number[][]) : StructuredData[][]{
    var result = [];
    for( var i = 0; i < 10; i++){
      result[i] = this.convertRawData(rawData[i],i);
    }
    return result;
  }

  arraysEqual(a: number[], b: number[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  
  private convertRawData( data : number[], num : number): StructuredData[]{
    var result = [];
    var pixels : number = 28*28;
    var totalNumber = data.length / pixels;
    for( let i = 0; i < totalNumber; i++){
      var nextInput = data.slice(i*pixels,i*pixels+pixels);
      var nextOutput= [0,0,0,0,0,0,0,0,0,0];
      nextOutput[num] = 1;
      result.push( {input: nextInput, expectedOutput : nextOutput});
    }
    return result;
  }

}