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
let coverList = [];
let pathArr = [];
let nowAlgo = 0;

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