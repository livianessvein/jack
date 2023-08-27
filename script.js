cv = document.getElementById("canvas");
var largSacola = cv.width / 5
var posX = cv.width / 2 - largSacola / 2
var larguraCanvas = cv.width / 4
var alturaCanvas = cv.height - cv.height / 4.85
var dx = 8;
var dy = 20;
var y = 0;
var x = 0;
let qtd = 0
let lastPosX = posX
var vetVis = []
var vetVisIndex = []

var vetVisPosY = []
var vetVisPosX = []
var vetPontos = [-2, -1, 10, -5, -4, 5]


contexto = cv.getContext("2d");

var sacola = document.getElementById('sacola');

async function mexeSacola(event) {

  if (event == 'ArrowLeft' && posX + dx > 0) {
    posX -= dx
    if (posX < 0) {
      posX = 0
    }
  }
  if (event == 'ArrowRight' && posX + dx < cv.width - largSacola) {
    posX += dx
    if (posX > cv.width) {
      posX = cv.width - largSacola
    }
  }
  return posX
}

let lastPosSacolaX = posX
let lastPosSacolaY = alturaCanvas
function drawSacola(posx) {
  contexto.clearRect(lastPosSacolaX, lastPosSacolaY, largSacola, cv.height / 5);
  contexto.drawImage(sacola, posx, alturaCanvas, largSacola, cv.height / 5)
  lastPosSacolaX = posx
  lastPosSacolaY = alturaCanvas
}

function initialize() {
  document.addEventListener('keydown', async function(e) {
    const posx = await mexeSacola(e.key)
    drawSacola(posx)
    lastPosX = posx
  })
}

let vetElements = document.getElementsByName("elementos");
var txtpontos = document.getElementById('txtpontos');

function desenhaElemento(posX) {


  const widthElem = largSacola / 2
  const heightElem = cv.height / 5;
  const heightCanvas = cv.height;
  for (var j = 0; j < vetVis.length; j++) {
    function checkCollision() {
      return (lastPosX < vetVisPosX[j] + widthElem) && (vetVisPosX[j] + widthElem > vetVisPosX[j])
        && (alturaCanvas < vetVisPosY[j] + heightElem) && (alturaCanvas + heightElem > vetVisPosY[j])
    }
    if (checkCollision()) {
      contexto.clearRect(vetVisPosX[j], vetVisPosY[j] - dy, widthElem, heightElem);
      drawSacola(lastPosX)
    }
    else {
      contexto.clearRect(vetVisPosX[j], vetVisPosY[j] - dy, widthElem, heightElem);
      contexto.drawImage(vetVis[j], vetVisPosX[j], vetVisPosY[j], widthElem, heightElem)
    }

    if (checkCollision()) {
      const index = vetVisIndex[j]
      qtd += +vetPontos[index]

      txtpontos.innerHTML = qtd || 0

      vetVis = vetVis.filter((vet, i) => i !== j);
      vetVisIndex = vetVisIndex.filter((vet, i) => i !== j);
      vetVisPosY = vetVisPosY.filter((vet, i) => i !== j);
      vetVisPosX = vetVisPosX.filter((vet, i) => i !== j);

    }
    vetVisPosY[j] += dy

  }
}

function desenha() {
  drawSacola(lastPosX)
  desenhaElemento(lastPosX)
}



function cria() {
  var i = Math.floor(Math.random() * 6)
  var posX = Math.floor(Math.random() * (canvas.width - 80));
  var posY = 0;
  vetVis.push(vetElements[i]);
  vetVisIndex.push(i);
  console.log('v', vetVis)
  vetVisPosY.push(posY);
  vetVisPosX.push(posX);

}

desenha()

timer1 = window.setInterval(desenha, 500);
timer2 = window.setInterval(cria, 2000);

setTimeout(function(){
  clearInterval(timer1);
  clearInterval(timer2);
},1000*20)

