// DEMO
function gen_path_custom() {
  let b = beginPoint;

  let nextInvok = 0;
  let count = 0;
  do {
    let position;
    if ((b.xlt(endPoint) && nextInvok == 0) || nextInvok == 1) {
      nextInvok = 2;
      position = new Position(b.x + 1, b.y, pathPointColor);
    } else if ((b.xgt(endPoint) && nextInvok == 0) || nextInvok == 2) {
      nextInvok = 3;
      position = new Position(b.x - 1, b.y, pathPointColor);
    } else if ((b.ylt(endPoint) && nextInvok == 0) || nextInvok == 3) {
      nextInvok = 4;
      position = new Position(b.x, b.y + 1, pathPointColor);
    } else if ((b.ygt(endPoint) && nextInvok == 0) || nextInvok == 4) {
      nextInvok = 1;
      position = new Position(b.x, b.y - 1, pathPointColor);
    }

    if (crash(position)) {
      continue;
    }

    count += 1;
    if(count == 1024) {
      return;
    }

    console.log(nextInvok == 2 ? "右" : (nextInvok == 3) ? "左" : (nextInvok == 4 ? "下" : "上"));
    pathArr.push(b=position);
    nextInvok = 0;
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