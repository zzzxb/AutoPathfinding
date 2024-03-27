// DEMO
function gen_path_custom() {
  let b = beginPoint;

  let count = 0;
  do {
    let position;
    if (b.xlt(endPoint) || count == 1) {
      position = new Position(b.x + 1, b.y, pathPointColor);
      count = 2;
    } else if (b.xgt(endPoint) || count == 2) {
      position = new Position(b.x - 1, b.y, pathPointColor);
      count = 3;
    } else if (b.ylt(endPoint) || count == 3) {
      position = new Position(b.x, b.y + 1, pathPointColor);
      count = 4;
    } else if (b.ygt(endPoint) || count == 4) {
      position = new Position(b.x, b.y - 1, pathPointColor);
      count = 1;
    }

    if (coverCrash(position)) {
      continue;
    }

    pathArr.push(b=position);
    count = 0;
  } while(!b.eq(endPoint));
}


function coverCrash(position) {
    coverList.forEach(function(cover){
      if(cover.eq(position)) {
        console.log("撞墙");
        return true;
      }
    });
}