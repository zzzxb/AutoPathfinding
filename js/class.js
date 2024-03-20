class Position {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color == undefined ? 'rgba(0, 0, 0, 1)' : color;
  }

  xlt(position) { return this.x < position.x; }
  xgt(position) { return this.x > position.x; }
  ylt(position) { return this.y < position.y; }
  ygt(position) { return this.y > position.y; }
  eq(position) { return this.x === position.x && this.y === position.y; }
  toString() { return `{"x": ${this.x}, "y": ${this.y}, "color": ${this.color}}`}
}