import express = require('express');
import bodyParser = require('body-parser');
import fs = require('fs');
import { NNNetwork } from './structures/Network';
import { Mnist } from './importers/Mnist';

var app = express();

app.use( express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); 

app.get( '/nn-showcase', (req, res) => {
  res.sendFile( __dirname + "/public/index.html");
});

app.get( '*', (req, res) => {
  res.sendStatus(404);
});

app.post( '/api/readNumber/:networkNumber', (req, res) => {

  var data = req.body.data;
  var networkNumber = req.params.networkNumber;

  var calculatedNetworks = [
    'number-recognition-1x20-hidden',
    'number-recognition-2x16-hidden'
  ]

  var inputArray = JSON.parse(data);

  var data = JSON.parse(
    fs.readFileSync(
      __dirname + "/../networks/"+ calculatedNetworks[networkNumber]+".json", 
      "utf-8"
    )
  );

  var network = new NNNetwork();
  network.load(data);
  var output = network.calculate(inputArray);
  var maxValue = 0;
  var maxIndex = 0;
  for( var i = 0; i < output.length; i++){
    if(output[i] > maxValue){
      maxValue = output[i];
      maxIndex = i;
    }
  }
  res.send({number : maxIndex, network : calculatedNetworks[networkNumber]});

});

app.get('/api/mnist/:number', (req, res) => {
  var number = +req.params.number;
  var mnist = new Mnist();
  mnist.init();
  var length = mnist.structuredData[number].length;
  var randomIndex = Math.floor(Math.random() * length);
  res.send(mnist.structuredData[number][randomIndex]);
})

app.listen( 8080, () => {
  console.log("App Listening on port 8080");
});

app.listen( 8000, () => {
  console.log("App Listening on port 8080");
});