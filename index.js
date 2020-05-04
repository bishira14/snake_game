let tiles = document.querySelectorAll('.container div');
let move = 1;
let theSnake = [0,1,2];
let currentApple = 3;
let collision = [[89,90],[79,80],[69,70],[59,60],[49,50],[39,40],[29,30],[19,20],[9,10],
[90,89],[80,79],[70,69],[60,59],[50,49],[40,39],[30,29],[20,19],[10,9],[-10,0],[-9,1],[-8,2],
[-7,3],[-6,4],[-5,5],[-4,6],[-3,7],[-2,8],[-1,9],[100,90],[101,91],[102,92],[103,93],[104,94],[105,95],
[106,96],[107,97],[108,98],[109,99]];
let collArray=[];
document.addEventListener('keyup', keys)
let game = setInterval(theMove, 500);

function keys(e){
  if(e.keyCode === 37){
    move = -1;
  }else if(e.keyCode === 38){
    move = -10;
  }else if(e.keyCode === 39){
    move = 1;
  }else{
    move = 10;
  }
}

function theMove(){
  let tail = theSnake.shift();
  theSnake.push(theSnake[theSnake.length-1] + move);
  //if snake hits itself
  for(let k = 0; k < theSnake.length-1; k++){
    if(theSnake[theSnake.length-1] == theSnake[k]){
      return clearInterval(game);
    }
  }
  //collisions
    for(let i = 0; i < collision.length; i++){
      for(let j = 0; j < collision[i].length; j++){
         collArray.push(collision[i][j]);
      }
      if((collArray[0] == theSnake[theSnake.length-1]) && (collArray[1] == theSnake[theSnake.length-2])){
         return clearInterval(game);
         collArray = [];
      }else{
        collArray = [];
      }
    }

  tiles[tail].classList.remove('snake');
  theSnake.forEach(element => {
     tiles[element].classList.add('snake');
  });
  //when snake catches apple
  apple();
}

function apple(){
  if(tiles[theSnake[theSnake.length-1]].classList.contains('apple')){
    theSnake.unshift(theSnake[0] + move);
    tiles[theSnake[0]].classList.add('snake');
    tiles[currentApple].classList.remove('apple');

    let random = null;
    do{
      random = Math.floor(Math.random() * tiles.length);
    }while((tiles[random].classList.contains('snake')) == true)
    tiles[random].classList.add('apple');
    currentApple = random;

  }
}
