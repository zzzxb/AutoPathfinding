const canvas = document.getElementById('demoArea');
const ctx = demoArea.getContext('2d');
const box = document.getElementById('box');
const btGroup = document.getElementById("bt_group");
const btList = document.getElementsByClassName("bt");

let blockAnimationInrc = 0.8;
let dblClickTime = 0;
let screenScale = 0;
let viewWidth = 0, viewHeight = 0;
let canvasSize = 0, blockSize = 0, blockNum = 0;
let canvasSizeMin = 256;
let beginPoint = 0, endPoint = 0;
let nowAlgo = 0;
let coverList = [];
let pathArr = [];
let enableAnimation = true;
let enableDrawGrid = true;
let delayTimePath = 1;

// 颜色相关
let beginPointColor = "rgba(255, 0, 0, 1)";
let endPointColor = "rgba(144, 101, 197, 1)";
let coverPointColor = "rgba(186, 85, 52, 1)";
let pathPointColor = 'rgba(64, 196, 99, 0.9)';
let rainbowPath = true;
let rainbowSpacingR = 0;
let rainbowSpacingG = 0;
let rainbowSpacingB = 0;

function initProperty() {
  screenScale = window.devicePixelRatio;
  viewWidth = window.innerWidth;
  viewHeight = window.innerHeight;
  canvasSize = isPhone() ? initCanvasSize() : Math.max(initCanvasSize(), 512);
  blockSize = initBlockSize();
  blockNum = canvasSize / blockSize;
  blockAnimationInrc = blockSize / 10;
}

function initCanvasSize() {
  return (Math.min(viewWidth, viewHeight) - (isPhone() ? 7 : 100)) / canvasSizeMin * canvasSizeMin;
}

function initBlockSize() {
  return (canvasSize / canvasSizeMin) * 8 * (isPhone() ? 2 : 1);
}

function isPhone() {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

function getCanvasPosition() {
  var rect = canvas.getBoundingClientRect();
  return new Position(rect.left + window.scrollX ,rect.top + window.scrollY);
}