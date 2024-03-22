class Position {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.width = width == undefined ? 0 : width;
    this.height = height == undefined ? 0 : height;
    this.color = color == undefined ? 'rgba(0, 0, 0, 1)' : color;
  }

  setColor(color) { this.color = color; }
  xlt(position) { return this.x < position.x; }
  xgt(position) { return this.x > position.x; }
  ylt(position) { return this.y < position.y; }
  ygt(position) { return this.y > position.y; }
  eq(position) { return this.x == position.x && this.y == position.y; }
  toString() { return `{"x": ${this.x}, "y": ${this.y}, "color": ${this.color}}`}
}