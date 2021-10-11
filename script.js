let order = [];
let clickedOrder = [];
let score = 0;

// 0 = azul, 1 = amarelo, 2 = vermelho, 3 = verde
const blue = document.querySelector('.blue');
const yellow = document.querySelector('.yellow');
const red = document.querySelector('.red');
const green = document.querySelector('.green');

// Cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// Acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

// Checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Você acertou! Sua pontuação é de ${score} pontos.\nIniciando próximo nível.`);
        nextLevel();
    }
}

// Função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    setTimeout(() => {
        createColorElement(color).classList.remove('selected')
        checkOrder();
    }, 250)

}

// Função que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return blue;

    } else if(color == 1) {
        return yellow;

    } else if(color == 2) {
        return red;

    } else if(color == 3) {
        return green;
    }
}

// Função para proximo nivel
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//Função de derrota
let gameOver = () => {
    alert(`Poxa, você perdeu. Pontuação final: ${score} pontos.\nClique em OK para iniciar um novo jogo.`)
    order = [];
    clickedOrder = [];

    playGame();
}

// Função de novo jogo
let playGame = () => {
    alert("Boas vindas ao Gênesis! Iniciando novo jogo...")
    score = 0;
    
    nextLevel();
}

// Eventos pra clique nos divs de cores
blue.addEventListener('click', click(0))
yellow.addEventListener('click', click(1))
red.addEventListener('click', click(2))
green.addEventListener('click', click(3))

blue.onclick = () => click(0);
yellow.onclick = () => click(1);
red.onclick = () => click(2);
green.onclick = () => click(3);


// Inicia jogo
playGame();