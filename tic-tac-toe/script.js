// *****code to change the css to display the cross and circle*****
// const crossContainer = document.getElementById('11');
// const cross = crossContainer.children[0];

// cross.addEventListener('click',e=>{
//   cross.children[0].style.transform = "rotate(45deg)";
  
//   cross.children[1].style.transform = "rotate(-45deg)";
  
// })

//variables initialization

let turnNum = 0;
let player1Turn = 0;
let player2Turn = 0;
let player1Arr=[];
let player2Arr=[];
const rows = document.querySelector('#game-container').children; // to select the rows of the game container

function turnCalc(){ //function to calculate whose turn it is and increment the total turn num at the end
  if(turnNum%2 == 0){
    player1Turn = 1;
    player2Turn = 0;
  }else{
    player2Turn = 1;
    player1Turn = 0;
  }
  turnNum++;
}


for(let i=0;i<rows.length;i++){
  rows[i].addEventListener('click',e=>{//adding a click event to all the rows

    turnCalc();//firstly the turn calculations are to be done

    if(player1Turn){
      player1Arr.push(Number(e.target.id));// keeping track of player1's moves
      sortArr(player1Arr);

    }else if(player2Turn){
      player2Arr.push(Number(e.target.id));// keeping track of player2's moves
      sortArr(player2Arr);
    }
  
    //now to check if someone has won in this turn

    if(turnNum>=5){ // winning before turn no. 5 is impossible
      //some function which takes the sorted player arrays and finds if someone is winning based on the logic defined inside it
    }

  })
}

//function to sort the player arrays

function sortArr(arr){
 
}

