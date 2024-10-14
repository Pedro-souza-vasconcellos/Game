//board
var blockSize = 25;
var linhas = 20;
var colunas = 20;
var board;
var context;
var pontos = document.getElementById('pontos');
var div = document.getElementById('game_over');
// cobra
var cobraX = blockSize * 5;
var cobraY = blockSize * 5;
var velocidadeX = 0;
var velocidadeY = 0;

var corpoCobra = [];

// comida
var comidaX;
var comidaY;

var gameOver = false;
var score = 0;

//audio
var audio = new Audio();
var morte = 'audios/pew.mp3';
var comer = 'audios/eat.mp3';

window.onload = function () {
    board = document.getElementById('board');
    board.height = linhas * blockSize;
    board.width = colunas * blockSize;
    context = board.getContext('2d');

    colocaComida();
    document.addEventListener('keyup', mudaDirecao);
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        // window.location.reload();
        return;
    }
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(comidaX, comidaY, blockSize, blockSize);

    if (cobraX == comidaX && cobraY == comidaY) {
        audio.src = comer;
        audio.play();
        corpoCobra.push([comidaX, comidaY]);
        score++
        pontos.textContent = "Pontos: " + score * 10;
        colocaComida();
    }
    for (var i = corpoCobra.length - 1; i > 0; i--) {
        corpoCobra[i] = corpoCobra[i - 1];
    }
    if (corpoCobra.length) {
        corpoCobra[0] = [cobraX, cobraY];
    }

    context.fillStyle = 'lime';
    cobraX += velocidadeX * blockSize;
    cobraY += velocidadeY * blockSize;
    context.fillRect(cobraX, cobraY, blockSize, blockSize);
    for (var i = 0; i < corpoCobra.length; i++) {
        context.fillRect(corpoCobra[i][0], corpoCobra[i][1], blockSize, blockSize);
    }

    // condições de gameOver
    if (cobraX < 0 || cobraX > colunas * blockSize || cobraY < 0 || cobraY > linhas * blockSize) {
        gameOver = true;
        // alert('Game Over')
        audio.src = morte;
        audio.play()
        div.hidden = false;
    }
    for (var i = 0; i < corpoCobra.length; i++) {
        if (cobraX == corpoCobra[i][0] && cobraY == corpoCobra[i][1]) {
            gameOver = true;
            // alert('Game Over')
            audio.src = morte;
            audio.play()
            div.hidden = false;
        }
    }
}

function mudaDirecao(event) {
    if ((event.code == "ArrowUp" || event.code == "KeyW") && velocidadeY != 1) {
        velocidadeX = 0;
        velocidadeY = -1;
    }
    else if ((event.code == "ArrowDown" || event.code == "KeyS") && velocidadeY != -1) {
        velocidadeX = 0;
        velocidadeY = 1;
    }
    else if ((event.code == "ArrowLeft" || event.code == "KeyA") && velocidadeX != 1) {
        velocidadeX = -1;
        velocidadeY = 0;
    }
    else if ((event.code == "ArrowRight" || event.code == "KeyD") && velocidadeX != -1) {
        velocidadeX = 1;
        velocidadeY = 0;
    }
}

function colocaComida() {
    comidaX = Math.floor(Math.random() * colunas) * blockSize;
    comidaY = Math.floor(Math.random() * linhas) * blockSize;
}

document.getElementById('playAgain').addEventListener('click',()=>{
    window.location.reload();
})
document.addEventListener('keyUp',function(event){
    if(event.code == "Enter"){
        window.location.reload();
    }
})


