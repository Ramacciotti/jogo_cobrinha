// Referencia o elemento no html
let canvas = document.getElementById("Canvas");
// Renderiza o desenho dentro do canvas e trata como plano 2D
let context = canvas.getContext("2d");
// Cada quadradinho tem 32 pixels
let box = 32;
// Cria a cobrinha como lista com várias cordenadas. Quando pintarmos, viram quadradinhos
let snake = [];
// Definir tamanho da cobrinha
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
// Criar variável para definir direção da cobrinha
let direction = "right";
// Fazer a comida apareça em vários lugares diferentes
let food ={
    // Randomico entre os limites do box
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Desenha e define o canvas
function criarBG(){
    // Cor do background
    context.fillStyle = "#202937";
    // Desenha o retângulo de acordo c tamanho do box
    context.fillRect(0,0,16 * box, 16 * box);
}

// Comida
function drawFood(){
    context.fillStyle = "lightslategrey";
    context.fillRect(food.x, food.y, box, box);
}

// Criar Cobrinha
function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        // Cor da cobrinha
        context.fillStyle = "lightgreen";
        // Tamanho da cobrinha (passados lá em cima) + tamanho do box que é 32
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Chama função ao perceber que uma tecla foi pressionada
document.addEventListener('keydown', teclas);

// Impedir que as setas scrollem o navegador
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Se a tecla for pressionada, mudar direção da corinha
function teclas(event){
    if(event.keyCode == 37 && direction != 'right') {
        direction = 'left';
    }
    if(event.keyCode == 38 && direction != 'down') {
        direction = 'up';
    }
    if(event.keyCode == 39 && direction != 'left') {
        direction = 'right';
    }
    if(event.keyCode == 40 && direction != 'up') {
        direction = 'down';
    }
}

// Iniciar o game
function iniciarJogo(){

    // Permitir que a cobrinha atravesse as paredes
    if(snake[0].x > 15*box && direction == "right") {
        snake[0].x = 0;
    }
    if(snake[0].x < 0 && direction == 'left') {
        snake[0].x = 16 * box;
    }
    if(snake[0].y > 15*box && direction == "down") {
        snake[0].y = 0;
    }
    if(snake[0].y < 0 && direction == 'up') {
        snake[0].y = 16 * box;
    }

    // Gameover se o corpinho bater nele mesmo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    // Criar canvas
    criarBG();
    // Criar cobrinha
    criarCobrinha();
    // Criar comidinha
    drawFood();

    // Posição que será ponto de partida da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // Adicionar quadradinho dependendo da posicao atual da cobrinha
    if(direction == "right") {
        snakeX += box;
    }
    if(direction == "left") {
        snakeX -= box;
    }
    if(direction == "up") {
        snakeY -= box;
    }
    if(direction == "down") {
        snakeY += box;
    }    

    // Checar cordenadas e aumentar tamanho da cobrinha
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    // Acrescentar corpinho à frente da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);   

}

// Atualiza a cada 100 milisegundos para que a cobrinha se mova nesse intervalo
let jogo = setInterval(iniciarJogo, 100);


