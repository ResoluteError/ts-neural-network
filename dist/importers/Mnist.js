"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const json0 = __importStar(require("../data/digits/0.json"));
const json1 = __importStar(require("../data/digits/1.json"));
const json2 = __importStar(require("../data/digits/2.json"));
const json3 = __importStar(require("../data/digits/3.json"));
const json4 = __importStar(require("../data/digits/4.json"));
const json5 = __importStar(require("../data/digits/5.json"));
const json6 = __importStar(require("../data/digits/6.json"));
const json7 = __importStar(require("../data/digits/7.json"));
const json8 = __importStar(require("../data/digits/8.json"));
const json9 = __importStar(require("../data/digits/9.json"));
class Mnist {
    constructor() {
        this.rawData = [];
        this.structuredData = [];
    }
    init() {
        this.rawData.push(json0.data);
        this.rawData.push(json1.data);
        this.rawData.push(json2.data);
        this.rawData.push(json3.data);
        this.rawData.push(json4.data);
        this.rawData.push(json5.data);
        this.rawData.push(json6.data);
        this.rawData.push(json7.data);
        this.rawData.push(json8.data);
        this.rawData.push(json9.data);
        this.structuredData = this.structureData(this.rawData);
    }
    structureData(rawData) {
        var result = [];
        for (var i = 0; i < 10; i++) {
            result[i] = this.convertRawData(rawData[i], i);
        }
        return result;
    }
    arraysEqual(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (a.length != b.length)
            return false;
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    convertRawData(data, num) {
        var result = [];
        var pixels = 28 * 28;
        var totalNumber = data.length / pixels;
        for (let i = 0; i < totalNumber; i++) {
            var nextInput = data.slice(i * pixels, i * pixels + pixels);
            var nextOutput = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            nextOutput[num] = 1;
            result.push({ input: nextInput, expectedOutput: nextOutput });
        }
        return result;
    }
}
exports.Mnist = Mnist;
