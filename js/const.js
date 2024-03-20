const canvas = document.getElementById('demoArea');
const ctx = demoArea.getContext('2d');
const box = document.getElementById('box');
const btGroup = document.getElementById("bt_group");
const btList = document.getElementsByClassName("bt");

let screenScale;
let viewWidth;
let viewHeight;
let canvasSize;
let blockSize;
let blockNum;

function initProperty() {
  screenScale = window.devicePixelRatio;
  viewWidth = window.innerWidth;
  viewHeight = window.innerHeight;
  canvasSize = Math.max(initCanvasSize(), 600);
  blockSize = initBlockSize();
  blockNum = canvasSize / blockSize 
}

function initCanvasSize() {
  return ((Math.min(viewWidth, viewHeight) - 50)/ 256) * 256;
}

function initBlockSize() {
  return (canvasSize / 256) * 8;
}