var SELECTED_PIECE = "";
var SELECTED_PIECE_POSITION = "";
var CURRENT_TURN = "w";

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const blackTags = ["bp", "bk", "bn", "bq", "br", "bb"];
const whiteTags = ["wp", "wk", "wn", "wq", "wr", "wb"];
const circle = document.getElementById("selectedPiece");


var positionHistory = new Array();
var currentStep = 0;
var viewingStep = 0;
circle.style.backgroundSize = "100%";
circle.style.height = "80px";
circle.style.width = "80px";
let tempTag = "";

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
    pressedSquare.className += " " + currentPiece;
    circle.className = "selectedPiece";
    if (tempTag !== pressedSquare.id) {
      generateNotation(tempTag, currentPiece, pressedSquare.id, piece);
      encodeCurrentPosition()
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

function checkPieceOnField(letter, number) {
  if (
    document.getElementById(letter + number).className.split(" ").length > 1
  ) {
    return true;
  } else {
    return false;
  }
}

function canMove(startpos, endpos, piece) {
  if (currentGame == "checkers") {
    if (Math.abs(startpos[1] - endpos[1]) === 1 && Math.abs((letters.indexOf(startpos[0]) + 1) - (letters.indexOf(endpos[0]) + 1)) === 1) {
      return { "moves": true, "captures": false, "capturePiece": undefined }
    };
  } else if (Math.abs(startpos[1] - endpos[1]) === 2 && Math.abs((letters.indexOf(startpos[0]) + 1) - (letters.indexOf(endpos[0]) + 1)) === 2) {
    let medianNumber = (startpos[1] + endpos[1]) / 2


    let startLetternum = letters.indexOf(startpos[0]);
    let endLetternum = letters.indexOf(endpos[0]);
    let medianNum = startLetternum + endLetternum / 2;
    let medianLetter = letters[medianNum];

    let jumpOver = document.getElementById(medianLetter + medianNum);
    if (jumpOver.split(' ') != undefined) {
      return { "moves": true, captures: true, "capturePiece": jumpOver.id };
    } else {
      return { "moves": false, captures: false, "capturePiece": undefined };
    }

  }else if (currentGame==="chess")
  {
    return undefined;
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
    console.log("change initiated")
    console.log(outputString)
    position = outputString;
    positionHistory.push(outputString);
    currentStep++;
    viewingStep = currentStep;
  }

  return outputString;
}

function loadBoard(position) {
  console.log("dskgfasfkuasdfkiasd");
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
        console.log(pieceTag);

        if (square) {
          let index = square.firstChild;

          index.innerHTML = tag;
        }
        if (pieceTag != "__") {


          console.log(pieceTag);

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