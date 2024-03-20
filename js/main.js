window.onload = init;
window.addEventListener('resize', init);

function init() {
  initProperty();
  initTags();
  initCanvas();
}

function initTags() {
  box.style.width = canvasSize + "px";
  box.style.height = canvasSize + "px";
  btGroup.style.width = canvasSize + "px";
  for(let i = 0; i < btList.length; i++) {
    btList[i].style.width = (blockSize * 4) + "px";
    btList[i].style.height = (blockSize * 2) + "px";
  }
}

function initCanvas() {
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  initPixelRation();
  canvasGrid()
}

function initPixelRation() {
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  canvas.width = canvas.offsetWidth * screenScale;
  canvas.height = canvas.offsetHeight * screenScale;
  ctx.scale(screenScale, screenScale);
}

function canvasGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(i = 0; i < blockNum; i ++) {
    for(j = 0; j < blockNum; j ++) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
    }
  }
}

function algo(num) {
  canvasGrid();
  let begin = randomPosition(null, 'black');
  let end = randomPosition(null, 'red');
  drawSE(begin, end);
  switch(num) {
    case 1: gen_path_astar(begin, end); break;
  }
}

function randomPosition(exclusionPostiotion, color) {
  let position;
  do{
    var x = Math.floor(Math.random() * blockNum);
    var y = Math.floor(Math.random() * blockNum);
    if (exclusionPostiotion == undefined) {
      position = new Position(x, y, color);
      break;
    }
  }while(exclusionPostiotion.eq(position));
  return position;
}

function drawSE(begin, end) {
  drawBlock(begin);
  drawBlock(end);
}

function drawBlock(position) {
  ctx.fillStyle = position.color;
  ctx.fillRect(position.x * blockSize, position.y * blockSize, blockSize, blockSize);
}