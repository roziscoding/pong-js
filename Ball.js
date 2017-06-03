class Ball {

    constructor(x, y, radius, xSpeed, ySpeed, color) {
        this._x = x || 10;
        this._y = y || 10;
        this._radius = radius || 7;
        this._speed = {
            x: xSpeed || Ball.DEFAULT_SPEED.x,
            y: ySpeed || Ball.DEFAULT_SPEED.y
        }
        this._color = color || 'white';
    }

    static get DEFAULT_SPEED() {
        return {
            x: -10,
            y: 4
        }
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y
    }

    get radius() {
        return this._radius;
    }

    set radius(radius) {
        this._radius = radius
    }
    get speed() {
        return this._speed;
    }

    set speed(speed) {
        this._speed = speed
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color
    }

    get reachedSideX() {
        const paddle = this.x > canvas.width / 2 ? rightPaddle : leftPaddle;
        if ((this.x + this.speed.x) + this.radius > canvas.width ||
            (this.x + this.speed.x) - this.radius < 0)
            return true;
        else
            return ((this.x + this.speed.x) + this.radius + paddle.width > canvas.width ||
                    (this.x + this.speed.x) - paddle.width - this.radius < 0) &&
                this.blockedByPaddle;
    }

    get reachedSideY() {
        return (this.y + this.speed.y) + this.radius > canvas.height ||
            (this.y + this.speed.y) - this.radius < 0
    }

    get blockedByPaddle() {
        const paddle = this.x > canvas.width / 2 ? rightPaddle : leftPaddle;
        return this.y > paddle.y &&
            this.y < paddle.y + paddle.height
    }

    get isAtLeft() {
        return this.x < canvas.width / 2;
    }

    /**
     * Recentraliza na tela
     */
    reset() {
        if (this.isAtLeft)
            this.speed = Ball.DEFAULT_SPEED;
        else
            this.speed = {
                x: -Ball.DEFAULT_SPEED.x,
                y: Ball.DEFAULT_SPEED.y
            }

        this.x = (canvas.width / 2);
        this.y = (canvas.height / 2);
        return this;
    }

    /**
     * Move um 'passo' nos dois eixos
     * 
     * @param {any} _xDistance Distância a mover na horizontal
     * @param {any} _yDistance Distância a mover na vertical
     * @returns 
     * 
     * @memberof Ball
     */
    step(_xDistance, _yDistance) {
        const xDistance = _xDistance || this.speed.x;
        const yDistance = _yDistance || this.speed.y;
        this.x += xDistance;
        this.y += yDistance;
        return this;
    }

    /**
     * Altera a direção em X
     * 
     * @returns ${Ball}
     * 
     * @memberof Ball
     */
    flipX() {
        this.speed = {
            x: -this.speed.x,
            y: this.speed.y
        }
        return this;
    };

    /**
     * Altera a direção em Y
     * 
     * @returns 
     * 
     * @memberof Ball
     */
    flipY() {
        this.speed = {
            x: this.speed.x,
            y: -this.speed.y
        }
        return this;
    };

    /**
     * Desenha no canvas
     * 
     * @param {any} canvCtx 
     * 
     * @memberof Ball
     */
    draw(canvCtx) {
        canvCtx.fillStyle = this.color;
        canvCtx.beginPath();
        canvCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        canvCtx.fill();
        return this;
    }

    /**
     * Inverte a direção e altera a velocidade da bola
     * 
     * @param {any} factor Fator de controle da bola
     * @returns 
     * 
     * @memberof Ball
     */
    mirror(factor) {
        const deltaY = this.y - ((this.isAtLeft ? leftPaddle : rightPaddle).y + (Paddle.DEFAULT_HEIGTH / 2));
        this.speed = {
            x: this.speed.x,
            y: deltaY * factor
        }
        return this;
    }

}