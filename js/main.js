window.onload = init;
window.addEventListener('resize', init);
window.addEventListener('click', drawCover);
window.addEventListener('touchstart', drawCover);

function init() {
  initProperty();
  initTags();
  initCanvas();
}

/** 用来初始化页面其他元素 */
function initTags() {
  box.style.width = canvasSize + "px";
  box.style.height = canvasSize + "px";
  btGroup.style.width = canvasSize + "px";
  for(let i = 0; i < btList.length; i++) {
    btList[i].style.width = (blockSize * 5.08) + "px";
    btList[i].style.height = (blockSize * 1.55) + "px";
  }
}

/** 初始化画布 */
function initCanvas() {
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  initPixelRation();
  resetCanvas();
}

/** 初始化画布像素比例 */
function initPixelRation() {
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  canvas.width = canvas.offsetWidth * screenScale;
  canvas.height = canvas.offsetHeight * screenScale;
  ctx.scale(screenScale, screenScale);
}

/** 清空画布，绘制方格 */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nowAlgo = 0;
  beginPoint = undefined;
  endPoint = undefined;
  pathArr = [];
  coverList = [];
  canvasGrid();
}

/** 清空画布， 指定begin, end，coverArr 则绘制， 否则仅随机生成起点和终点 */
function resetCanvas(begin, end, coverArr) {
  clearCanvas();
  drawBeginEndPoiont(begin, end);
  drawCoverArr(coverArr);
}

/** 绘制背景方格 */
function canvasGrid() {
  if (!enableDrawGrid) return;
  for(i = 0; i < blockNum; i ++) {
    for(j = 0; j < blockNum; j ++) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
    }
  }
}

/** 算法选择 */
function algo(num) {
  alarmInfo(num);
  if (beginPoint != undefined && endPoint != undefined && nowAlgo != num) {
    nowAlgo = num;
    clearPath();
    drawCoverArr();
    switch(num) {
      case 1: gen_path_custom(); break;
      case 2: gen_path_astar(); break;
      case 3: break;
      case 4: break;
    }
    genRainbowSpacing();
    drawBlocks(pathArr);
  }
}

/** 清空路径 */
function clearPath() {
    if(pathArr.length != 0) {
      pathArr = [];
      resetCanvas(beginPoint, endPoint, coverList);
    }
}

/** 清空画布 */
function clearCover() {
    if(coverList.length != 0) {
      let oldAlgo = nowAlgo;
      coverList = [];
      resetCanvas(beginPoint, endPoint);
      algo(oldAlgo);
    }
}

/** 绘制起点和终点 */
function drawBeginEndPoiont(begin, end) {
  beginPoint = (begin != undefined ? begin : randomPosition(null, beginPointColor));
  endPoint = (end != undefined ? end : randomPosition(beginPoint, endPointColor));
  drawBlock(beginPoint);
  drawBlock(endPoint);
}

/** 生成随机点 */
function randomPosition(exclusionPostiotion, color) {
  let position;
  do{
    let x = Math.floor(Math.random() * blockNum);
    let y = Math.floor(Math.random() * blockNum);
    position = new Position(x, y, color);

    if (exclusionPostiotion == undefined) break;
  }while(exclusionPostiotion.eq(position));
  return position;
}

/** 绘制方块数组 */
function drawBlocks(positionList, drawEnd) {
  genRainbowColor();
  if (positionList != undefined && positionList.length != 0)
    delayDrawBlock(positionList, drawEnd, 0);
}

/** 延时绘制方块 */
function delayDrawBlock(positionList, drawEnd, i) {
  setTimeout(function(){
    let position = positionList[i];
    if (!drawEnd && position.eq(endPoint)) return;
    position.color = genRainbowColor(position.color, i);
    drawBlock(position);
    if(i < positionList.length) delayDrawBlock(positionList, drawEnd, i + 1);
  }, delayTimePath);
}


/** 绘制方块 */
function drawBlock(position) {
  position.width = ((!enableAnimation || position.width == undefined)  ? blockSize : position.width);
  position.height = ((!enableAnimation || position.height == undefined) ? blockSize : position.height);

  if (enableAnimation) {
    let rate = 1 - (position.width / blockAnimationInrc) / 100;
    if(position.width < blockSize) {
      position.width = Math.min(position.width + blockAnimationInrc + rate, blockSize);
    } else if (position.width > blockSize) {
      position.width = Math.max(position.width - blockAnimationInrc + rate, blockSize);
    } 
    if (position.height < blockSize) {
      position.height = Math.min(position.height + blockAnimationInrc + rate, blockSize);
    }else if (position.height > blockSize) {
      position.height = Math.max(position.height - blockAnimationInrc + rate, blockSize);
    }
  }

  let drawX = (position.x * blockSize) + (position.width == blockSize ? 0 : (blockSize - position.width) / 2);
  let drawY = (position.y * blockSize) + (position.height == blockSize ? 0 : (blockSize - position.height) / 2)

  ctx.fillStyle = position.color;
  ctx.fillRect(drawX, drawY, position.width, position.height);
  // 给开始和结束点加个黑边框
  if (position.eq(beginPoint) || position.eq(endPoint)) {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(drawX, drawY, position.width, position.height);
  }

  // 绘制从小到达的扩大动画
  if (enableAnimation && (position.width != blockSize || position.height != blockSize)) {
   requestAnimationFrame(() => drawBlock(position))
  }
}

/** 获取路径🌈色块 */
function genRainbowColor(color, i) {
  if (rainbowPath && color == pathPointColor) {
    let beginColorSplit = splitRGB(beginPointColor);
    let r = beginColorSplit[0] - (rainbowSpacingR * (i + 1));
    let g = beginColorSplit[1] - (rainbowSpacingG * (i + 1));
    let b = beginColorSplit[2] - (rainbowSpacingB * (i + 1));
    // 调整透明度后出现的效果是因为方块放大动画中色块叠加产生的
    return `rgba(${r}, ${g}, ${b}, ${enableAnimation ? 0.1 : 0.5})`;
  } 

  return color;
}

/** 生成从起点到终点的距离长度的渐变色间距 */
function genRainbowSpacing() {
  let beginColorSplit = splitRGB(beginPointColor);
  let endColorSplit = splitRGB(endPointColor);
  rainbowSpacingR = (beginColorSplit[0] - endColorSplit[0]) / (pathArr.length - 1);
  rainbowSpacingG = (beginColorSplit[1] - endColorSplit[1]) / (pathArr.length - 1);
  rainbowSpacingB = (beginColorSplit[2] - endColorSplit[2]) / (pathArr.length - 1);
}


/** 将 rgb 颜色中 r, g, b 拿出来 */
function splitRGB(rgbColor) {
  let rgbSplit = [];
  if(rgbColor.startsWith("rgba")) {
    rgb = rgbColor.substring(5, rgbColor.length - 1);
    rgbSplit = rgb.split(",")
  }else if(rgbColor.startsWith("rgb")) {
    rgb = rgbColor.substring(4, rgbColor.length - 1);
    rgbSplit = rgb.split(",")
  }
  return rgbSplit;
}

/** 绘制遮挡数组 */
function drawCoverArr(ca) {
  if (ca != undefined && ca.length != 0) {
    coverList = ca;
  }
    drawBlocks(coverList, true);
}

/** 在有起点和终点方块时回执遮挡, 否则优先绘制起点和终点 */
function drawCover(event) {
  noDoubleTouch(event);

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

  // 绘制起点， 终点， 遮挡
  let cp = getCanvasPosition();
  if(mouseX > cp.x && mouseX < cp.x + canvasSize && mouseY > cp.y && mouseY < cp.y + canvasSize) {
    let exists = false;
    let clickPosition = new Position(Math.floor((mouseX - cp.x )/ blockSize), Math.floor((mouseY - cp.y) / blockSize), coverPointColor);

    coverList.forEach(function(cover){
      if(exists = cover.eq(clickPosition)) return;
    });

    if (!exists) { 
      if (beginPoint == undefined) { beginPoint = clickPosition; beginPoint.setColor(beginPointColor); }
      else if (endPoint == undefined && !beginPoint.eq(clickPosition)) { endPoint = clickPosition; endPoint.setColor(endPointColor); }
      else if(beginPoint != undefined && endPoint != undefined && !beginPoint.eq(clickPosition) && !endPoint.eq(clickPosition)) { coverList.push(clickPosition) }
      else return;
      drawBlock(clickPosition)
    }
  }
}

/** 没有起点和终点方块警告 */
function alarmInfo() {
  if (beginPoint == undefined) {
    alert("请点击画布创建起点(红色)或点击Reset按钮");
  }else if (endPoint == undefined) {
    alert("请点击画布创建终点(紫色)或点击Reset按钮");
  }
}

/** 300毫秒内不能连续点击两次屏幕 */
function noDoubleTouch(event) {
  let now = new Date().getTime();
  if (now - dblClickTime < 300) {
    event.preventDefault();
  }
  dblClickTime = now;
}