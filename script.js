var SELECTED_PIECE = "";
var SELECTED_PIECE_POSITION = "";
var CURRENT_TURN = "w";

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const blackTags = ["bp", "bk", "bn", "bq", "br", "bb"];
const whiteTags = ["wp", "wk", "wn", "wq", "wr", "wb"];
const circle = document.getElementById("selectedPiece");

circle.style.backgroundSize = "100%";
circle.style.height = "80px";
circle.style.width = "80px";
let tempTag = "";

function onClick(id) {
  let pressedSquare = document.getElementById(id);
  style = getComputedStyle(pressedSquare);
  let piece = pressedSquare.className.split(" ")[1];
  let currentPiece = circle.className.split(" ")[1];
  if (piece === undefined && currentPiece !== undefined) {
    pressedSquare.className += " " + currentPiece;
    circle.className = "selectedPiece";
  } else if (piece !== undefined && currentPiece == undefined) {
    circle.className = "selectedPiece " + piece;

    tempTag = id;

    pressedSquare.className = pressedSquare.className.replace(" " + piece, "");
  } else if (piece !== undefined && currentPiece !== undefined) {
    console.log(whiteTags.includes(piece) == whiteTags.includes(piece));
    if (
      whiteTags.includes(piece) == whiteTags.includes(currentPiece) ||
      blackTags.includes(piece) == blackTags.includes(currentPiece)
    ) {
      console.log("fa");
      let returnPieceSquare = document.getElementById(tempTag);
      returnPieceSquare.className += " " + currentPiece;
      circle.className = "selectedPiece " + piece;
      tempTag = id;
      pressedSquare.className = pressedSquare.className.replace(
        " " + piece,
        ""
      );
    } else {
      console.log("af");

      circle.className = "selectedPiece";
      pressedSquare.className = pressedSquare.className.replace(
        " " + piece,
        " " + currentPiece
      );
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
  let startNumber = startpos.split("")[1];
  let startLetter = startpos.split("")[0];
  let endNumber = endpos.split("")[1];
  let endLetter = endpos.split("")[0];

  let pieceColor = piece.split("")[0];
  let pieceType = piece.split("")[1];

  if (pieceColor === "w") {
    if (pieceType === "p") {
      if (checkPieceOnField(startLetter, parseInt(startNumber) + 1) === false) {
        if (
          startLetter === "2" &&
          parseInt(endNumber) - parseInt(startNumber) == 2 &&
          startLetter === endLetter
        ) {
          return true; //moved twice on first move
        }
        if (
          parseInt(endNumber) - parseInt(startNumber) == 1 &&
          startLetter === endLetter
        ) {
          return true; //moved once
        }
        if (
          Math.abs(letters.indexOf(endLetter) - letters.indexOf(startLetter)) ==
            1 &&
          parseInt(endNumber) - parseInt(startNumber) == 1 &&
          checkPieceOnField(endLetter, endNumber)
        ) {
          return true;
        }
      }
    }
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

var position = `wrwnwbwqwkwbwnwr|wpwpwpwpwpwpwpwp|________________|________________|________________|________________|bpbpbpbpbpbpbpbp|brbnbbbqbkbbbnbr`;

function fetchPosition() {
  return position;
}

function encodeCurrentPosition() {
  let allSquares = document.querySelectorAll(".squareblack, .squarewhite");
  let splitOutputByRanks = ["", "", "", "", "", "", "", ""];

  allSquares.forEach((element) => {
    let piece = element.className.split(" ")[1];
    let id = element.id;
    let rank = id.split("")[1];

    splitOutputByRanks[rank - 1] += piece != undefined ? piece : "__";
  });

  let outputString = "";
  splitOutputByRanks.forEach((element) => {
    outputString += element + "|";
  });
  outputString[outputString.length - 1] = "";
  position = outputString;
  return outputString;
}

function loadBoard() {
  const ranks = fetchPosition().split("|");
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
          square.className += " " + pieceTag;
        }
        file++;
      });
    }
    rank++;
  });
}

function flipBoard() {
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

  loadBoard();
}
loadBoard();
