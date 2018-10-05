import { NNNetwork } from "./structures/Network";

var network = new NNNetwork();
network.init(2, [2, 1], [1, 1], [1, 1]);
network.calculate([1,1]);

console.log(JSON.stringify(network.export(), null, 2));
