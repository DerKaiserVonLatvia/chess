function writeChessTiles()
{
    let letters = ["a","b","c","d","e","f","g","h"];

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


            console.log(`<div class="${"square"+color}" id="${l+i}"></div>`);

            var sq = document.getElementById(l+i);
            sq.style.gridColumnStart=letters.indexOf(l)+1;
            sq.style.gridColumnEnd=letters.indexOf(l)+1;
            sq.style.gridRowEnd=i;
            sq.style.gridRowStart=i;

        }
    });
}

writeChessTiles();