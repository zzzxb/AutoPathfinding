window.onload = init;
window.addEventListener('resize', init);
window.addEventListener('click', drawCover);
window.addEventListener('touchstart', drawCover);

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
    btList[i].style.width = (blockSize * 5.15) + "px";
    btList[i].style.height = (blockSize * 1.55) + "px";
  }
}

function initCanvas() {
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  initPixelRation();
  resetCanvas();
}

function initPixelRation() {
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  canvas.width = canvas.offsetWidth * screenScale;
  canvas.height = canvas.offsetHeight * screenScale;
  ctx.scale(screenScale, screenScale);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nowAlgo = 0;
  beginPoint = undefined;
  endPoint = undefined;
  pathArr = [];
  coverList = [];
  canvasGrid();
}

function resetCanvas(begin, end, coverArr) {
  clearCanvas();
  drawBeginEndPoiont(begin, end);
  drawCoverArr(coverArr);
}

function canvasGrid() {
  for(i = 0; i < blockNum; i ++) {
    for(j = 0; j < blockNum; j ++) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
    }
  }
}

function algo(num) {
  alarmInfo(num);
  if (beginPoint != undefined && endPoint != undefined && nowAlgo != num) {
    nowAlgo = num;
    clearPath();
    drawCoverArr();
    switch(num) {
      case 1: gen_path_astar(); break;
      case 2: break;
    }
  }
}

function clearPath() {
    if(pathArr.length != 0) {
      pathArr = [];
      resetCanvas(beginPoint, endPoint, coverList);
    }
}

function clearCover() {
    if(coverList.length != 0) {
      let oldAlgo = nowAlgo;
      coverList = [];
      resetCanvas(beginPoint, endPoint);
      algo(oldAlgo);
    }
}

function drawBeginEndPoiont(begin, end) {
  beginPoint = begin != undefined ? begin : randomPosition(null, 'black');
  endPoint = end != undefined ? end : randomPosition(null, 'red');
  drawSE(beginPoint, endPoint);
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
  ctx.globalCompositeOperation = "destination-over";
  drawBlock(end);
}

function drawBlock(position) {
  ctx.fillStyle = position.color;
  ctx.fillRect(position.x * blockSize, position.y * blockSize, blockSize, blockSize);
}

function drawCoverArr(ca) {
  if (ca != undefined && ca.length != 0) {
    coverList = ca;
  }
  coverList.forEach(cover => drawBlock(cover));
}

function drawCover(event) {
  let now = new Date().getTime();
  if (now - dblClickTime < 300) {
    e.preventDefault();
  }
  dblClickTime = now;

  if (pathArr.length != 0) {
    return;
  }

  let mouseX = 0, mouseY = 0;
  if (isPhone()) {
    const touches = event.touches;
    if (touches.length > 0) {
      mouseX = touches[0].pageX;
      mouseY = touches[0].pageY;
    }
  }else {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  let cp = getCanvasPosition();

  if(mouseX > cp.x && mouseX < cp.x + canvasSize && mouseY > cp.y && mouseY < cp.y + canvasSize) {
    let exists = false;
    let clickPosition = new Position(Math.floor((mouseX - cp.x )/ blockSize), Math.floor((mouseY - cp.y) / blockSize), 'rgb(186, 85, 52)');

    coverList.forEach(function(cover){
      if(exists = cover.eq(clickPosition)) return;
    });

    if (!exists) { 
      if (beginPoint == undefined) { beginPoint = clickPosition; beginPoint.setColor('black'); }
      else if (endPoint == undefined) { endPoint = clickPosition; endPoint.setColor('red'); }
      else coverList.push(clickPosition);
      drawBlock(clickPosition)
    }
  }
}

function alarmInfo() {
  if (beginPoint == undefined) {
    alert("请点击画布创建起点(黑色)或点击Reset按钮");
  }else if (endPoint == undefined) {
    alert("请点击画布创建终点(红色)或点击Reset按钮");
  }
}
