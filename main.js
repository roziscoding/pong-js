let canvas,
    canvCtx,
    fps = 30,
    leftPaddle,
    rightPaddle,
    ball,
    paused = true,
    score = {
        p1: 0,
        p2: 0
    },
    hasWinner = false;


const WIN_SCORE = 10;
/**
 * Define o tamanho do canvas para o tamanho da janela
 */
function setCanvasSize() {
    const w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        width = w.innerWidth || e.clientWidth || g.clientWidth,
        height = w.innerHeight || e.clientHeight || g.clientHeight;

    canvas.width = width;
    canvas.height = height;
}

/**
 * Calcula a posição do mouse relativa ao canvas
 * 
 * @param {any} evt 
 */
function calculateMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    return {
        x: evt.clientX - rect.left - root.scrollLeft,
        y: evt.clientY - rect.top - root.scrollTop
    };
}

function moveAi() {
    if (rightPaddle.y < ball.y - 35) {
        rightPaddle.y += ball.xSpeedModulus * 0.6;
    } else if (rightPaddle.y + Paddle.DEFAULT_HEIGTH > ball.y + 35) {
        rightPaddle.y -= ball.xSpeedModulus * 0.6;
    }
}

/**
 * Reposiciona os elementos na tela 
 */
function move() {
    moveAi();
    ball.step();
    if (ball.reachedSideX) {
        if (ball.blockedByPaddle) {
            ball.flipX().mirror(0.35);
        } else {
            if (ball.isAtLeft) {
                score.p2++;
            } else {
                score.p1++;
            }

            if (score.p1 >= WIN_SCORE || score.p2 >= WIN_SCORE) {
                announceWinner();
            } else {
                ball.reset().flipX();
            }
        }
    }
    if (ball.reachedSideY) ball.flipY();
}

function announceWinner() {
    paused = true;
    reset(true);
    hasWinner = true;
    render();
}

/**
 * Reposiciona e renderiza o canvas a cada ${fps} segundos
 */
function tick() {
    move();
    render();
    if (!paused) setTimeout(tick, 1000 / fps);
}

/**
 * Desenha um retângulo preenchido
 * 
 * @param {number} x Posição horizontal
 * @param {number} y Posição vertical
 * @param {number} width Largura
 * @param {number} height Altura
 * @param {string} color Cor do preenchimento
 */
function drawRect(x, y, width, height, color) {
    canvCtx.fillStyle = color;
    canvCtx.fillRect(x, y, width, height);
}

function drawLine(x, thickness, spacing, height, color) {
    for (let i = 0; i <= canvas.height; i += spacing) {
        drawRect(x, i, thickness, height, color);
    }
}

/**
 * Renderiza os elementos
 */
function render() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    canvCtx.fillStyle = 'white';
    canvCtx.fillText(`Player 1 Score: ${score.p1}`, 100, 120);
    canvCtx.fillText(`Player 2 Score: ${score.p2}`, canvas.width - 200, 120);
    if (!hasWinner) {
        ball.draw(canvCtx);
        leftPaddle.draw(canvCtx);
        rightPaddle.draw(canvCtx);
        canvCtx.fillText(`Spacebar: ${paused ? 'Play' : 'Pause'}`, 50, canvas.height - 50);
        canvCtx.fillText('Esc: Reset', canvas.width - 100, canvas.height - 50, 100);
        drawLine(canvas.width / 2 - 1, 2, 40, 20, 'white');
    } else {
        canvCtx.fillText(`Player ${score.p1 > score.p2 ? '1' : '2'} wins!`, canvas.width / 2 - 25, canvas.height / 2, 50);
    }
}

/**
 * Atualiza o tamanho do canvas e redesenha
 */
function performResize() {
    paused = true;
    reset();
    render();
}

/**
 * Retorna todos os valores para seus valores iniciais
 */
function reset(keepScores) {
    setCanvasSize();
    ball.reset();
    leftPaddle.reset();
    rightPaddle.toLeft(canvas).reset();
    if (!keepScores)
        score = {
            p1: 0,
            p2: 0
        };
    hasWinner = false;
    render();
}

/**
 * Define o estado de pausa do jogo
 */
function togglePause() {
    if (hasWinner) {
        hasWinner = false;
        reset();
    }
    paused = !paused;
    tick();
}

/**
 * Realiza operações de inicialização básicas
 */
function init() {
    canvas = document.getElementById('gameCanv');
    canvCtx = canvas.getContext('2d');

    window.addEventListener('resize', performResize);
    document.addEventListener('keydown', evt => {
        switch (evt.keyCode) {
            case 32:
                togglePause();
                break;
            case 27:
                reset();
                break;
        }
    });

    canvas.addEventListener('mousemove', evt => {
        const mousePos = calculateMousePos(evt);
        leftPaddle.y = mousePos.y - leftPaddle.height / 2;
    });

    ball = new Ball();
    leftPaddle = new Paddle();
    rightPaddle = new Paddle();
}

/**
 * Chama functions de inicialização e inicia o jogo
 */
function run() {
    init();
    reset();
}

window.onload = run;