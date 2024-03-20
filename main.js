class Position {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  toString() { return `{ "x": ${this.x}, "y": this.y, "color": this.color }`}
}

const windowSize = (512, 512);
const blockSize = (16, 16);

window.onload = function() {
  initCanvas();
}

function initCanvas() {
  const canvas = document.getElementById('demoArea');
  const ctx = demoArea.getContext('2d');
  initPixelRation(canvas, ctx);
  canvasGrid(ctx)
}

function initPixelRation(canvas, ctx) {
  var scale = window.devicePixelRatio;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  canvas.width = canvas.offsetWidth * scale;
  canvas.height = canvas.offsetHeight * scale;
  ctx.scale(scale, scale);
}

function canvasGrid(ctx, ) {
  for(i = 0; i < 32; i ++) {
    for(j = 0; j < 32; j ++) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.strokeRect(i*16,j*16,16,16)
    }
  }
}

function algo() {
  begin = randomPosition();
  end = randomPosition();
  generationPath(begin, end);
}

function randomPosition() {
  var x = Math.floor(Math.random() * windowSize[0]/blockSize[0]);
  var y = Math.floor(Math.random() * windowSize[0]/blockSize[0]);
  return new Position(x, y);
}

function generationPath(begin, end) {
  console.log("begin: ", begin.toString);
  console.log("end: ", end.toString);
}
