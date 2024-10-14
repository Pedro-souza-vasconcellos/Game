const audio = new Audio();
audio.src = './audios/point.mp3'
// board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

let timer = 1700;

let intervalo;
// pássaro
let passaroWidth = 34;
let passaroHeight = 24;
let passaroX = boardWidth/8;
let passaroY = boardHeight/2;
let imagemPassaro;

let passaro = {
    x : passaroX,
    y : passaroY,
    width : passaroWidth,
    height : passaroHeight
} 
// canos
let arrayCanos = [];
let canoWidth = 64;
let canoHeight = 512;
let canoX = boardWidth;
let canoY = 0;
let topPipeImg;
let bottomPipeImg

// fisica do jogo
let velocidadeX = -2;
let velocidadeY = 0;
let gravidade = 0.4;

let gameOver = false;
let score = 0;

window.onload = function(){
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d');



    //desenha o pássaro

    imagemPassaro = new Image();
    imagemPassaro.src = './images/passaro.png';
    imagemPassaro.onload = function(){
        context.drawImage(imagemPassaro,passaro.x,passaro.y,passaro.width,passaro.height)
    }
    topPipeImg = new Image();
    bottomPipeImg = new Image();
    topPipeImg.src = './images/toppipe.png';
    bottomPipeImg.src = './images/bottompipe.png';

    requestAnimationFrame(update)
    intervalo = setInterval(colocaCanos,timer);
    document.addEventListener('keydown',pulaPassaro);
    document.querySelector('body').addEventListener('click',pulaPassaroCelular);
}

function update(){
    requestAnimationFrame(update)
    if(gameOver){
        return;
    }
    context.clearRect(0,0,board.width,board.height);

    //passaro
    velocidadeY += gravidade;
    // passaro.y += velocidadeY;
    passaro.y = Math.max(passaro.y + velocidadeY,0);
    context.drawImage(imagemPassaro,passaro.x,passaro.y,passaro.width,passaro.height)

    if(passaro.y > board.height){
        gameOver = true;
    }

    //canos
    for(var i = 0; i < arrayCanos.length; i++){
        let cano = arrayCanos[i];
        cano.x += velocidadeX;
        context.drawImage(cano.img,cano.x,cano.y,cano.width,cano.height)
        if(!cano.atravessado && passaro.x > cano.x + cano.width){
            score +=1/2;
            var conta = score /10;

            if(conta % 1 == 0 && score != 1 && velocidadeX >= -9){
                audio.play();
                velocidadeX--
                clearInterval(intervalo);
                timer = timer - 150;
                 intervalo = setInterval(colocaCanos,timer)
            }


            cano.atravessado = true;
        }

         if(detectaColisoes(passaro,cano)){
             gameOver = true;
         }
        
    }
    // limpa canos
    while(arrayCanos.length > 0 && arrayCanos[0].x < -canoWidth){
        arrayCanos.shift();
    }

    //score
    context.fillStyle = 'white';
    context.font = '45px sans-serif';
    context.fillText(score,5,45);

    if(gameOver){
        context.fillText('GAME OVER', 5, 90)
    }
}

function colocaCanos(){
    if(gameOver){
        return;
    }
    let aleatoriaPosicaoY = canoY - canoHeight/4 - Math.random()*(canoHeight/2);
    let espacoAberto = board.height/4;

    let topCano = {
        img : topPipeImg,
        x : canoX,
        y : aleatoriaPosicaoY,
        width : canoWidth,
        height : canoHeight,
        atravessado : false
    }
    arrayCanos.push(topCano)

    let bottomCano = {
        img : bottomPipeImg,
        x : canoX,
        y : aleatoriaPosicaoY + canoHeight + espacoAberto,
        width : canoWidth,
        height : canoHeight,
        atravessado : false
    }

    arrayCanos.push(bottomCano);

}
function pulaPassaro(e) { 
    if(e.code == 'Space' || e.code == 'ArrowUp' || e.code == 'KeyW' || e.code == 'KeyX'){
        // pula
        velocidadeY = -6
        //reset
        if(gameOver){
            window.location.reload();
        }
    }
}
function pulaPassaroCelular(){
    velocidadeY = -6;
    if(gameOver){
        window.location.reload()
    }
}

function detectaColisoes(a,b){
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}