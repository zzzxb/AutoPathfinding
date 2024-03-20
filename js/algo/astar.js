// DEMO
function gen_path_astar(begin, end) {
  let genPathArr = [];
  let color = 'green'
  let b = begin;
  let e = end;

  do {
    let position;
    if (b.xlt(e)) position = new Position(b.x + 1, b.y, color);
    else if (b.xgt(e)) position = new Position(b.x - 1, b.y, color);
    else if (b.ylt(e)) position = new Position(b.x, b.y + 1, color);
    else if (b.ygt(e)) position = new Position(b.x, b.y - 1, color);
    genPathArr.push(position);
    draw(b = position);
  } while(!b.eq(end));

}
