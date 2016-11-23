'use strict'

function printOut(){
	let last = 1;
	  for (let z = 0; z < 10; z++){
	  console.log(last);
	  last = bringMin(0, 0, last);
  }
}

function bringMin (i, j, last){
  function toThe(x, y){
    if (y === 0) return 1;
    let accum = 1;
    for (let a = 0; a < y; a++){
      accum *= x
    }
    return accum;
  }
	if ((toThe(2,i) * toThe(5,j)) > last) {
    return (toThe(2,i) * toThe(5,j))
  } else {
    return Math.min(bringMin(i+1, j, last), bringMin(i, j+1, last))
  }
}

printOut()
// 1, 2, 4, 5, 8, 10, 16, 20, 25, 32
