// DEMO
function gen_path_astar() {
  let color = 'green'
  let b = beginPoint;

  do {
    let position;
    if (b.xlt(endPoint)) position = new Position(b.x + 1, b.y, color);
    else if (b.xgt(endPoint)) position = new Position(b.x - 1, b.y, color);
    else if (b.ylt(endPoint)) position = new Position(b.x, b.y + 1, color);
    else if (b.ygt(endPoint)) position = new Position(b.x, b.y - 1, color);
    pathArr.push(position);
    drawBlock(b = position);
  } while(!b.eq(endPoint));

}
