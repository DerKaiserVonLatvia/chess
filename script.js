var SELECTED_PIECE="";
var SELECTED_PIECE_POSITION="";
var CURRENT_TURN="w";

let letters = ["a","b","c","d","e","f","g","h"];

function writeChessTiles()
{

    letters.forEach(l => {

        for (let i = 1; i<=8; i++)
        {

            
let color = "white";
            if (letters.indexOf(l)%2==0)
            {
                if (i%2==0)
                {
                    color = "white";
                }else
                {
                    color="black"
                }
            }else{
                if (i%2==0)
                {
                    color = "black";
                }else
                {
                    color="white"
                }
            }

            var sq = document.getElementById(l+i);
            sq.onmousedown = function(){
                onClick(l ,i);
            };

            sq.onmouseup = function(){
                placePiece(l, i);
            }
            sq.style.gridColumnStart=letters.indexOf(l)+1;
            sq.style.gridColumnEnd=letters.indexOf(l)+1;
            sq.style.gridRowEnd=i;
            sq.style.gridRowStart=i;

        }
    });
}

function onClick(letter, number){

    
    let circle = document.getElementById('selectedPiece');


    let pressedSquare=document.getElementById(letter+number);
    style = getComputedStyle(pressedSquare);
    console.log(style)
    circle.style.backgroundImage=style.backgroundImage;
    circle.style.backgroundSize='100%';
    circle.style.height="80px";
    circle.style.width="80px";
    console.log(circle.className);
}


function checkPieceOnField(letter, number)
{
    if (document.getElementById(letter+number).className.split(" ").length>1)
    {
        return true;
    }
    else{
        return false;
    }
}

function canMove(startpos, endpos, piece){


    let startNumber = startpos.split('')[1]
    let startLetter = startpos.split('')[0]
    let endNumber = endpos.split('')[1]
    let endLetter = endpos.split('')[0]

    let pieceColor = piece.split('')[0];
    let pieceType = piece.split('')[1];


    if (pieceColor==="w")
    {
        if (pieceType==="p")
        {
            if (checkPieceOnField(startLetter, parseInt(startNumber)+1)===false)
            {
                if (startLetter==='2' && parseInt(endNumber)-parseInt(startNumber)==2 && startLetter===endLetter)
                {
                    return true//moved twice on first move
                }
                if (parseInt(endNumber)-parseInt(startNumber)==1 && startLetter===endLetter)
                {
                    return true;//moved once
                }
                if (Math.abs(letters.indexOf(endLetter)-letters.indexOf(startLetter))==1 && parseInt(endNumber)-parseInt(startNumber)==1 && checkPieceOnField(endLetter, endNumber))
                {
                    return true;
                }
            }

        }
    }

}

function placePiece(letter, number){
    if (SELECTED_PIECE!=="" && SELECTED_PIECE.split('')[0]===CURRENT_TURN && )
    {
        let piece = 
    }else{

    }
}

let circle = document.getElementById('selectedPiece');
const onMouseMove = (e) =>{
  circle.style.left = e.pageX + 'px';
  circle.style.top = e.pageY + 'px';
}
document.addEventListener('mousemove', onMouseMove);


writeChessTiles();