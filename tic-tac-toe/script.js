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
      let cross = e.target.children[0];
      cross.style.display = "initial";
      cross.children[0].style.transform = "rotate(45deg)";
      cross.children[1].style.transform = "rotate(-45deg)";
      if(turnNum>4){
        if(isWinning(player1Arr)) console.log("player 1 wins");
      }
    }
    else if(player2Turn){
      player2Arr.push(Number(e.target.id));// keeping track of player2's moves
      sortArr(player2Arr);
      let circle = e.target.children[1];
      circle.style.display = "initial";
      
      if(turnNum>4){
        if(isWinning(player2Arr)) console.log("player 2 wins");
      }
    }

  })
}

//function to sort the player arrays

function sortArr(arr){
 let temp;
 for(let i=0;i<arr.length;i++){

  for(let j=0;j<(arr.length-1);j++){
    if(arr[j]>arr[j+1]){
       temp=arr[j+1];
       arr[j+1]=arr[j];
       arr[j]=temp;
    }
  }

 }

}

//function to search thru the player arrays

function binarySearch(targetEl,arr){
  let high,low,mid;
  low = 0;
  high = arr.length - 1;
  mid = Math.floor((low+high)/2);
  
  while(low<=high){
    mid = Math.floor((low+high)/2);
    if(arr[mid]==targetEl){
      return true;
    }
    else{
      if(arr[mid]<targetEl){
        low = mid+1;
      }else if(arr[mid]>targetEl){
        high = mid-1;
      }
    }

  }
  return false;
}

//function for checking if a player has won 

function isWinning(arr){
  let currentEl;

  for(let i=0;i<arr.length;i++){
     currentEl = arr[i];

     if(arr[i+1]==arr[i]+1 && arr[i+2]==arr[i]+2){//row wise win
      return 1;
     }
     else if(binarySearch(arr[i]+10,arr) && binarySearch(arr[i]+20,arr)){//column wise win
      return 1;
     }
     else if(binarySearch(arr[i]+11,arr) && binarySearch(arr[i]+22,arr)){//diagonal wise win (this most likely does not account for the 2nd possible diagonal orientation)
      return 1;
     }
     else{return 0;}

  }

}