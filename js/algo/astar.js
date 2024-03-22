// DEMO
function gen_path_astar() {
  let b = beginPoint;

  do {
    let position;
    if (b.xlt(endPoint)) position = new Position(b.x + 1, b.y, pathPointColor);
    else if (b.xgt(endPoint)) position = new Position(b.x - 1, b.y, pathPointColor);
    else if (b.ylt(endPoint)) position = new Position(b.x, b.y + 1, pathPointColor);
    else if (b.ygt(endPoint)) position = new Position(b.x, b.y - 1, pathPointColor);
    pathArr.push(b=position);
  } while(!b.eq(endPoint));
}
