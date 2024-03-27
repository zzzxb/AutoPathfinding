// DEMO
function gen_path_custom() {
  let b = beginPoint;

  let count = 0;
  do {
    let position;
    if ((b.xlt(endPoint) && count == 0) || count == 1) {
      count = 2;
      position = new Position(b.x + 1, b.y, pathPointColor);
    } else if ((b.xgt(endPoint) && count == 0) || count == 2) {
      count = 3;
      position = new Position(b.x - 1, b.y, pathPointColor);
    } else if ((b.ylt(endPoint) && count == 0) || count == 3) {
      count = 4;
      position = new Position(b.x, b.y + 1, pathPointColor);
    } else if ((b.ygt(endPoint) && count == 0) || count == 4) {
      count = 1;
      position = new Position(b.x, b.y - 1, pathPointColor);
    }

    if (crash(position)) {
      continue;
    }

    pathArr.push(b=position);
    count = 0;
  } while(!b.eq(endPoint));
}

function crash(position) {
    return crashCover(position) || crashWall(position) || crashPath(position) || position.eq(beginPoint);
}

function crashPath(position) {
    for(let i = 0; i < pathArr.length; i++) {
      if(pathArr[i].eq(position)) {
        return true;
      }
    }
    return false;
}


function crashCover(position) {
    for(let i = 0; i < coverList.length; i++) {
      if(coverList[i].eq(position)) {
        return true;
      }
    }
    return false;
}

function crashWall(position) {
    return position.x < 0 || position.y > blockNum -1 || 
    position.y < 0 || position.y > blockNum - 1;
}