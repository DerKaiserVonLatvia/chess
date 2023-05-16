var SELECTED_PIECE = "";
var SELECTED_PIECE_POSITION = "";
var CURRENT_TURN = "w";

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const blackTags = ["bp", "bk", "bn", "bq", "br", "bb"];
const whiteTags = ["wp", "wk", "wn", "wq", "wr", "wb"];
const circle = document.getElementById("selectedPiece");

var currentMove = 'w';

var [a1m, h1m, a8m, h8m, wkm, bkm] = [false,false,false,false,false,false];

var positionHistory = new Array();
var currentStep = 0;
var viewingStep = 0;
circle.style.backgroundSize = "100%";
circle.style.height = "80px";
circle.style.width = "80px";
let tempTag = ""

var position = "";

console.log("a");

var currentGame = "chess";


function switchGame(game) {
  currentGame = game;

  document.getElementById("notationOutput").innerHTML = "";
  if (game === "chess") {
    position = `wrwnwbwqwkwbwnwr|wpwpwpwpwpwpwpwp|________________|________________|________________|________________|bpbpbpbpbpbpbpbp|brbnbbbqbkbbbnbr`;

  } else if (game === "checkers") {
    position = `wc__wc__wc__wc__|__wc__wc__wc__wc|________________|________________|________________|________________|bc__bc__bc__bc__|__bc__bc__bc__bc`;
  }
  console.log("sdkgjfwyrgbakvszbrgogelfjvhakwelfhdkgvwej. f\erfk")
  loadBoard(position);
}


switchGame("chess");


function onClick(id) {
  let pressedSquare = document.getElementById(id);
  style = getComputedStyle(pressedSquare);
  let piece = pressedSquare.className.split(" ")[1];
  let currentPiece = circle.className.split(" ")[1];
  if (piece === undefined && currentPiece !== undefined) {
      const cm = canMove(tempTag, id, currentPiece);
    console.log(cm)
    if (cm.moves==true){
      if (cm.captures==true)
      {
        let pieceToCaptureSq = document.getElementById(cm.capturePiece);
        pieceToCaptureSq.className=pieceToCaptureSq.className.split(' ')[0];
      }
      console.log("we")
      pressedSquare.className += " " + currentPiece;
      circle.className = "selectedPiece";
      if (tempTag !== pressedSquare.id) {
        generateNotation(tempTag, currentPiece, pressedSquare.id, piece);
        encodeCurrentPosition()
        return 1;
      }
    }

  } else if (piece !== undefined && currentPiece == undefined) {
    circle.className = "selectedPiece " + piece;

    tempTag = id;

    pressedSquare.className = pressedSquare.className.replace(" " + piece, "");
  } else if (piece !== undefined && currentPiece !== undefined) {
    if (
      whiteTags.includes(piece) == whiteTags.includes(currentPiece) ||
      blackTags.includes(piece) == blackTags.includes(currentPiece)
    ) {
      let returnPieceSquare = document.getElementById(tempTag);
      returnPieceSquare.className += " " + currentPiece;
      circle.className = "selectedPiece " + piece;
      tempTag = id;
      pressedSquare.className = pressedSquare.className.replace(
        " " + piece,
        ""
      );
    } else {
      const cm = canMove(tempTag, id, currentPiece);
      if (cm.moves==true){
        if (cm.captures==true)
        {
          let pieceToCaptureSq = document.getElementById(cm.capturePiece);
          pieceToCaptureSq.className=pieceToCaptureSq.className.split(' ')[0];
        }
        circle.className = "selectedPiece";
        pressedSquare.className = pressedSquare.className.replace(
          " " + piece,
          " " + currentPiece
        );
        generateNotation(tempTag, currentPiece, pressedSquare.id, piece, true);
        encodeCurrentPosition();
      }
    }
  }
}

function checkPieceOnField(letter, number) {
  if (
    document.getElementById(letter + number).className.split(" ").length > 1
  ) {
    return true;
  } else {
    return false;
  }
}


function checkForChecks(piece, square){
    if (piece==='bk')
    {
      const whitePieces = document.querySelectorAll(".wp .wb .wn .wk .wr .wq")

      whitePieces.forEach(element => {
        let id = element.id;
        let p = element.className.split(" ")[1];
        if (piece=='')
        if (canRunThroughRows(id, square, piece)==true)
        {
          return true;s
        }
      });
    }
}


function canRunThroughRows(startpos, endpos, piece){
  startpos = startpos.split(',');
  endpos = endpos.split(',');
  const startNum = parseInt(startpos[1]);
  const startLet = letters.indexOf(startpos[0])+1;
  const endNum = parseInt(endpos[1]);
  const endLet = letters.indexOf(endpos[0])+1;



  if (piece=='b' || piece=='q'){
    if( Math.abs(endNum-startNum) != Math.abs(startLet-endLet)){
      return false;
    }
  }
  if (piece=='r' || piece=='q'){
    if(startLet!==endLet && startNum!==endNum){
      return false;
    }
  }

  let deltaNum = endNum < startNum ? -1 : endNum==startNum ? 0 : 1 ; // if the end number is smaller, we loop backwards, from largest to smallest; else 0
  let deltaLetter = endLet < startLet ? -1 : endLet==startLet ? 0 : 1; // if the end letter [index-1] is smaller, we loop backwards, from largest to smallest; else 0
  let l = startLet;
  let n = startNum;

  console.warn(l!=endLet)

  while (1)
  {
    if (l==endLet && n==endNum)
    {
      break;
    }
    const cell = document.getElementById(letters[l-1]+n.toString(10));
    console.log(document.getElementById(letters[l-1]+n.toString(10)));
    if (cell.className.split(' ')[1]!=undefined)
    {
      return false;
    }
    l+=deltaLetter;
    n+=deltaNum;
  }
  return true
}


function canMove(startpos, endpos, piece) {
  startpos=startpos.split('');
  endpos=endpos.split('');
  if (currentGame == "checkers") {
    if (Math.abs(startpos[1] - endpos[1]) === 1 && Math.abs((letters.indexOf(startpos[0]) + 1) - (letters.indexOf(endpos[0]) + 1)) === 1) {
      return { "moves": true, "captures": false, "capturePiece": undefined }
    }else if (Math.abs(startpos[1] - endpos[1]) == 2 && Math.abs((letters.indexOf(startpos[0]) + 1) - (letters.indexOf(endpos[0]) + 1)) == 2) {
      let medianNumber = (parseInt(startpos[1]) + parseInt(endpos[1])) / 2
      
      console.log(medianNumber)
      let medianNum = (parseInt(letters.indexOf(startpos[0])+1) + parseInt(letters.indexOf(endpos[0])+1)) / 2;
      let medianLetter = letters[medianNum-1];
      console.log(medianLetter);
      let jumpOver = document.getElementById(medianLetter + medianNumber);
      console.log(jumpOver)
      if (jumpOver.className.split(' ')[1] != undefined && jumpOver.className.split(' ')[1]!=piece) {
        console.warn("jumping over piece")
        return { "moves": true, captures: true, "capturePiece": jumpOver.id };
      } else {
        return { "moves": false, captures: false, "capturePiece": undefined };
      }
  } 


  }else if (currentGame==="chess")
  {
    const pieceType = piece.split('')[1];
    const pieceColor = piece.split('')[0];

    const startnumber = parseInt(startpos[1]);
    const startletter = startpos[0];

    const endnumber = parseInt(endpos[1]);
    const endletter = endpos[0];
    switch(pieceType)
    {
      case "p":
        switch(pieceColor)
        {
          case "b":
            var pieceInFront = document.getElementById(startletter+(startnumber-1).toString(10)).className.split(' ')[1];
            if (startletter==endletter && endnumber==startnumber-1 && pieceInFront==undefined || startletter==endletter && endnumber==startnumber-2 && startnumber==7 && canRunThroughRows(startpos.join(), endpos.join())==true)
            {
              console.log("capture")

              return {"moves": true, "captures":false}
            } else if (Math.abs((letters.indexOf(endletter)+1)-(letters.indexOf(startletter)+1))==1 && startnumber==endnumber+1)
            {
              let capturePiece=document.getElementById(endletter+endnumber.toString(10)).className.split(' ')[1];
              console.log(capturePiece);
              if(capturePiece!=undefined)
              {
                return {"moves": true, "captures":true, "captures": capturePiece};
              }else
              {
                return {"moves": false, "captures":false}
              }
            }
            return {"moves": false, "captures":false}
          case "w":
            var pieceInFront = document.getElementById(startletter+(startnumber+1).toString(10)).className.split(' ')[1];
            console.log(pieceInFront)
            if (startletter==endletter && endnumber==startnumber+1 && pieceInFront==undefined || startletter==endletter && endnumber==startnumber+2 && startnumber==2 && canRunThroughRows(startpos.join(), endpos.join())==true)
            {
              console.log("capture")

              return {"moves": true, "captures":false}
            } else if (Math.abs((letters.indexOf(endletter)+1)-(letters.indexOf(startletter)+1))==1 && startnumber==endnumber-1)
            {
              let capturePiece=document.getElementById(endletter+endnumber.toString(10)).className.split(' ')[1];
              console.log(capturePiece);
              if(capturePiece!=undefined)
              {
                console.log("capture")
                return {"moves": true, "captures":true, "captures": capturePiece};
              }else
              {
                return {"moves": false, "captures":false}
              }
        }}
        return {"moves": false, "captures":false}


      case "k":
        if (Math.abs(startnumber-endnumber)==1 || Math.abs(letters.indexOf(startletter)-letters.indexOf(endletter))==1)
        {
          pieceColor=='b'?bkm=true:wkm=true;
          return {"moves": true};
        }
        
        if (!wkm && pieceColor=='w' && canRunThroughRows(startpos.join(), endpos.join()))
        {
          switch((endletter+endnumber.toString(10)))
          {
            case "g1":
              if (!h1m)
              {
                h1m=true;
                wkm=true;
                document.getElementById("h1").className=document.getElementById("h1").className.split(' ')[0];
                document.getElementById("f1").className+=" wr";
                return {"moves":true};
              }
            case "c1":
              if (!a1m){
                a1m=true;
                whm=true;
                document.getElementById("a1").className=document.getElementById("a1").className.split(' ')[0];
                document.getElementById("d1").className+=" wr";
                return {"moves":true};
              }
          }
        }else if(pieceColor=='b' && !bkm && canRunThroughRows(startpos.join(), endpos.join()))
        {
          switch((endletter+endnumber.toString(10)))
          {
            case "g8":
              if (!h8m)
              {
                h8m=true;
                bkm=true;
                document.getElementById("h8").className=document.getElementById("h8").className.split(' ')[0];
                document.getElementById("f8").className+=" br";
                return {"moves":true};
              }
            case "c8":
              if (!a8m)
              {
                a8m=true;
                bkm=true;
                document.getElementById("a8").className=document.getElementById("a8").className.split(' ')[0];
                document.getElementById("f8").className+=" br";
                return {"moves":true};
              }
          }
        }
      case "n":
        console.log(startnumber)
        if (Math.abs(startnumber-endnumber)==1 && Math.abs(letters.indexOf(startletter)-letters.indexOf(endletter))==2
        ||
        Math.abs(letters.indexOf(startletter)-letters.indexOf(endletter))==1 && Math.abs(startnumber-endnumber)==2)
        {
          return {"moves": true};
        }else
        {
          return {"moves": false};
        }
      case "b":
        if (Math.abs(startnumber-endnumber)==Math.abs(letters.indexOf(startletter)-letters.indexOf(endletter)))
        {
          if (canRunThroughRows(startpos.join(), endpos.join())==true)
          {
            return {"moves":true}
          }
        }
        return {"moves":false}

      case "r":
        if (startnumber==endnumber || startletter==endletter)
        {
          if (startnumber!==endnumber || endletter!==startletter)
          {
            console.log("actually moved")
            pieceColor=='b'?startletter=='h'&&startnumber==8&&pieceColor=='b'?h8m=true:startletter=='a'&&startnumber==8&&pieceColor=='b'?a1m=true:a1m=false:startletter=='h'&&startnumber==1?h1m=true:startletter=='a'&&startnumber==1?a1m=true:a1m=false;
            console.log(a1m, h1m, a8m, h8m, wkm, bkm)
          }
          if (canRunThroughRows(startpos.join(), endpos.join())==true)
          {
            return {"moves":true}
          }
        }
        return {"moves":false}
      case "q":
        if (startnumber==endnumber || startletter==endletter)
        {
          if (canRunThroughRows(startpos.join(), endpos.join())==true)
          {
            return {"moves":true}
          }
        }
        if (Math.abs(startnumber-endnumber)==Math.abs(letters.indexOf(startletter)-letters.indexOf(endletter)))
        {
          if (canRunThroughRows(startpos.join(), endpos.join())==true)
          {
            return {"moves":true}
          }
        }
        return {"moves":false}

    }
    return { "moves": false, captures: false, "capturePiece": undefined };
  }
}


const onMouseMove = (e) => {
  circle.style.left = e.pageX + "px";
  circle.style.top = e.pageY + "px";
};
document.addEventListener("mousemove", onMouseMove);

function chunkString(str, length) {
  return str.match(new RegExp(".{1," + length + "}", "g"));
}




function fetchPosition() {
  return position;
}


function generateNotation(pos1, piece, pos2, piece2, takes) {

  let delimeter = takes ? '-#' : '-';
  const notation = pos1 + delimeter + pos2;
  let html = ``;

  if (piece.split('')[0] === 'b') {
    html = `&emsp;<span class="blacktext">${notation}</span><br/>`
  } else {
    html = `<span class="whitetext">${notation}</span>`
  }

  document.getElementById("notationOutput").innerHTML += html;
}

function encodeCurrentPosition() {
  const allSquares = document.querySelectorAll(".squareblack, .squarewhite");
  let splitOutputByRanks = [new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8)];

  allSquares.forEach((element) => {
    const id = element.id;
    const piece = element.className.split(' ')[1];
    const letter = id.split('')[0];
    const number = id.split('')[1];
    const letterToNum = letters.indexOf(letter);
    splitOutputByRanks[number - 1][letterToNum] = piece != undefined ? piece : "__";
  });

  let outputString = "";
  splitOutputByRanks.forEach((element) => {
    let rowText = element.join('');
    rowText += "|"

    outputString += rowText;
  });
  outputString[outputString.length - 1] = "";
  if (position != outputString) {
    position = outputString;
    positionHistory.push(outputString);
    currentStep++;
    viewingStep = currentStep;
  }

  return outputString;
}

function loadBoard(position) {
  console.warn(position)
  const ranks = position.split("|");
  let letternum = 0;
  let rank = 1;
  ranks.forEach((element0) => {
    const pieces = chunkString(element0, 2);

    let file = 0;
    if (pieces != undefined && pieces.length > 0) {
      pieces.forEach((pieceTag) => {
        let tag = letters[file] + rank;
        let square = document.getElementById(tag);
        square.onmousedown = function () {
          onClick(tag);
        };
        //console.log(id)

        if (square) {
          let index = square.firstChild;

          index.innerHTML = tag;
        }
        if (pieceTag != "__") {
          square.className = square.className.split(' ')[1] == undefined ? square.className + " " + pieceTag : square.className.split(' ')[0] + " " + pieceTag;
        
        } else {
          square.className = square.className.split(' ')[0] != undefined ? square.className.split(' ')[0] : square.className;
        }
        file++;
      });
    }
    rank++;
  });
}

function flipBoard() {

  encodeCurrentPosition();

  let allSq = document.querySelectorAll(".squareblack, .squarewhite");
  // let allWhites = document.querySelectorAll(".squarewhite")

  allSq.forEach((element) => {
    let letter = element.id.split("")[0];
    let number = element.id.split("")[1];
    let letterposition = letters.indexOf(letter);
    let newLetter = letters[7 - letterposition];
    let newNum = 9 - number;
    let newId = newLetter + newNum;

    element.id = newId;
    let piece = element.className.split(" ");
    let p = piece.length > 1 ? " " + piece[1] : "";
    element.className = element.className.replace(p, "");
  });

  loadBoard(position);
}
//loadBoard(position);
encodeCurrentPosition();




function stepBack() {
  console.log(viewingStep)

  viewingStep -= viewingStep > 0 ? 1 : 0;
  console.log(positionHistory)
  loadBoard(positionHistory[viewingStep]);
}
function stepForward() {
  console.log(viewingStep)

  viewingStep += viewingStep < currentStep ? 1 : 0;
  console.log(positionHistory)
  loadBoard(positionHistory[viewingStep]);
}
function backToMainPos() {
  viewingStep = currentStep;

  loadBoard(viewingStep)
}