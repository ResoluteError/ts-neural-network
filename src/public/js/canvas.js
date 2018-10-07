/*

  Props to Kauê Gimenes & user1083202 on Stackoverflow 
  for providing the basic drawing snippet.
  src: https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse

*/
var canvas, ctx, flag = false,
  prevX = 0,
  currX = 0,
  prevY = 0,
  currY = 0,
  dot_flag = false;

var x = "black",
  y = 25;

function init() {
  canvas = document.getElementById('drawingCanvas');
  ctx = canvas.getContext("2d");
  canvasR = document.getElementById('calculatingCanvas');
  ctxR = canvasR.getContext("2d");
  w = canvas.width;
  h = canvas.height;

  canvas.addEventListener("mousemove", function (e) {
    findxy('move', e)
  }, false);
  canvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
  }, false);
  canvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
  }, false);
}

function draw() {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = x;
  ctx.lineWidth = y;
  ctx.stroke();
  ctx.closePath();
}

function erase() {
  ctx.clearRect(0, 0, w, h);
  ctxR.clearRect(0, 0, w, h);
  $('#numberResult').html('__');
  $('#chosenNetwork').html('__');
}

function getMnist(){
  var number = Math.floor(Math.random()*10);
  $.get('api/mnist/'+number, (data, status) => {
    var imgData = ctx.getImageData(0, 0, 280, 280);
    console.log(imgData);
    var length = imgData.data.length / 4;
    
    var pixels = Math.sqrt(length);
    var scaleFactor = pixels / 28;
    console.log("length: " + length);
    console.log("pixels: " + pixels);
    console.log("scaleFactor: " + scaleFactor);
    console.log(data.input);
    drawFromInput( imgData, data.input, pixels, scaleFactor, ctx);
  });
}

function save() {
  document.getElementById("canvasimg").style.border = "2px solid";
  var dataURL = canvas.toDataURL();
  document.getElementById("canvasimg").src = dataURL;
  document.getElementById("canvasimg").style.display = "inline";
}

function getData(NNNumber) {
  $('#numberResult').html('__');
  $('#chosenNetwork').html('__');
  var imgData = ctx.getImageData(0, 0, 280, 280);
  var alphaArr = [];
  for (var i = 3; i < imgData.data.length; i += 4) {
    alphaArr.push(imgData.data[i]);
  }
  var length = alphaArr.length;
  var pixelWidth = Math.sqrt(length);
  var scaleFactor = pixelWidth / 28;
  var scaledArr = [];

  for (var row = 0; row < 28; row++) {
    for (var col = 0; col < 28; col++) {
      var sum = 0;
      for (var w = 0; w < scaleFactor; w++) {
        for (var h = 0; h < scaleFactor; h++) {
          sum += alphaArr[w * pixelWidth + h + col * scaleFactor + row * scaleFactor * pixelWidth];
        }
      }
      scaledArr.push((sum / (scaleFactor * scaleFactor)) / 255);
    }
  }
  console.log(imgData);
  drawFromInput(imgData, scaledArr, pixelWidth, scaleFactor, ctxR);

  var data = {
    data : JSON.stringify(scaledArr)
  }
  $.post('api/readNumber/'+NNNumber, data, ( data, status ) => {
    $('#numberResult').html(data.network);
    $('#chosenNetwork').html(data.number);
  });
}

function drawFromInput( imgData, inputArray, pixels, scaleFactor, context){
  for (var row = 0; row < pixels; row++) {
    for (var col = 0; col < pixels; col++) {
      imgData.data[3 + 4 * (row * pixels + col)] = inputArray[Math.floor(row / scaleFactor) * 28 + Math.floor(col / scaleFactor)] * 255;
    }
  }

  context.putImageData(imgData, 0, 0);

}

function findxy(res, e) {
  if (res == 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.getBoundingClientRect().left;
    currY = e.clientY - canvas.getBoundingClientRect().top;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
      ctx.beginPath();
      ctx.fillStyle = x;
      ctx.fillRect(currX, currY, 2, 2);
      ctx.closePath();
      dot_flag = false;
    }
  }
  if (res == 'up' || res == "out") {
    flag = false;
  }
  if (res == 'move') {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.getBoundingClientRect().left;
      currY = e.clientY - canvas.getBoundingClientRect().top;
      draw();
    }
  }
}