class Paddle {

    constructor(x, y, width, height, color) {
        this._x = x || 0;
        this._y = y || 0;
        this._height = height || Paddle.DEFAULT_HEIGTH;
        this._width = width || 10;
        this._color = color || 'white';
    }

    static get DEFAULT_HEIGTH() {
        return 100;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    get width() {
        return this._width;
    }

    set width(width) {
        this._width = width;
    }

    get height() {
        return this._height;
    }

    set height(height) {
        this._height = height;
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color;
    }

    /**
     * Recentraliza na tela
     * 
     * @returns ${Paddle}
     * 
     * @memberof Paddle
     */
    reset() {
        this.y = (canvas.height / 2) - (this.height / 2);
        return this;
    }

    /**
     * Desenha no canvas
     * 
     * @param {any} canvCtx 
     * @returns 
     * 
     * @memberof Paddle
     */
    draw(canvCtx) {
        canvCtx.fillStyle = this.color;
        canvCtx.fillRect(this._x, this._y, this._width, this._height);
        return this;
    }

    /**
     * Move para a direita do canvas
     * 
     * @param {any} canvas 
     * @returns 
     * 
     * @memberof Paddle
     */
    toLeft(canvas) {
        this.x = canvas.width - this.width;
        return this;
    }
};