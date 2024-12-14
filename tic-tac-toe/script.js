//*****### game logic ###*****

//variables initialization

let turnNum = 0;
let player1Turn = 0;
let player2Turn = 0;
let player1Arr=[];
let player2Arr=[];
let gameOver = false; //gameOver flag to keep check if the game is over or not
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

//loop for assigning click events to the rows
for(let i=0;i<rows.length;i++){
  rows[i].addEventListener('click',e=>{//adding a click event to all the rows
    if(gameOver) return; // if the game is over no need to do all the stuff below
    if(e.target.dataset.clicked == "true") return; // the div has already been clicked so no need to do the stuff below
    e.target.dataset.clicked = "true";
    turnCalc();//firstly the turn calculations are to be done
    
    if(player1Turn){ // player1's turn
      player1Arr.push(Number(e.target.id));// keeping track of player1's moves
      sortArr(player1Arr);// sorting the array for future searching

      //making the cross visible
      let cross = e.target.children[0];
      cross.style.display = "initial";
      cross.children[0].style.transform = "rotate(45deg)";
      cross.children[1].style.transform = "rotate(-45deg)";

      //determining if player1 has won
      if(turnNum>4){//wining before turnNum exceeds 4 is impossible
        if(isWinning(player1Arr)) { //function test to check if a player has won , the function isWinning is defined below
          document.getElementById("declaration").style.opacity = "1";
          document.getElementById("declaration").innerHTML = `${player1} Wins`;
          gameOver = true;//setting the gameover flag to true
        }
      }
    }
    else if(player2Turn){ // player2's turn
      player2Arr.push(Number(e.target.id));// keeping track of player2's moves
      sortArr(player2Arr);
      let circle = e.target.children[1];
      circle.style.display = "initial";
      
      if(turnNum>4){
        if(isWinning(player2Arr)) {
          document.getElementById("declaration").style.opacity = "1";
          document.getElementById("declaration").innerHTML = `${player2} Wins`;
          gameOver = true;
        }
      }
    }

  })
}

//function to sort the player arrays

function sortArr(arr){//uses bubble sorting 
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

function binarySearch(targetEl,arr){//uses binary search
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
     else if(binarySearch(arr[i]+11,arr) && binarySearch(arr[i]+22,arr)){//diagonal wise win (11-22-33)
      return 1;
     }
     else if(binarySearch(arr[i]+9,arr) && binarySearch(arr[i]+18,arr)){//diagonal wise win (13-22-31 )
      return 1;
     }
     else{return 0;}

  }

}

//*****### ui logic ###*****

//player entry handling

let player1 = "player1";
let player2 = "player2";
let playerEntryBox  = document.getElementById("playerEntry");
let playerEntryCall = document.getElementById("player_btn");
let playerConfirm   = document.getElementById("player_confirm");

playerEntryCall.addEventListener('click',e=>{
  playerEntryBox.style.display = "block";
  playerEntryBox.style.opacity = "1";
  playerEntryBox.style.top = "50%";
  playerEntryBox.style.transform = "translate(-50%,-60%)"
})

playerConfirm.addEventListener("click",(e)=>{

 if(document.getElementById("player1").value != '') player1 = document.getElementById("player1").value;
 if(document.getElementById("player2").value != '') player2 = document.getElementById("player2").value;
 
 playerEntryBox.style.top = "0";
 playerEntryBox.style.transform = "translate(-50%,0%)";
 playerEntryBox.style.opacity = 0;
 playerEntryBox.style.display = "none";

})

// reset button handling

let defaultDom = document.body.innerHTML; //stores the default dom state of the document
let resetBtn = document.getElementById("reset_btn");

resetBtn.addEventListener('click',e=>{

  player1Arr.forEach(function(element){
   let currentEl = document.getElementById(`${element}`);
   currentEl.dataset.clicked = "false";
   let cross1 = currentEl.children[0];
      cross1.style.display = "none";
      cross1.children[0].style.transform = "rotate(-45deg)";
      cross1.children[1].style.transform = "rotate(45deg)";
  })
  player2Arr.forEach(function(element){
    let currentEl = document.getElementById(`${element}`);
    currentEl.dataset.clicked = "false";
    let circle1 = currentEl.children[1];
       circle1.style.display = "none";
   })

   document.getElementById("declaration").style.opacity = "0";
  
  turnNum = 0;
  player1Turn = 0;
  player2Turn = 0;
  player1Arr.length = 0;
  player2Arr.length = 0;
  gameOver = false;
})
