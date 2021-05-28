var turn = true; //true means X turn
var circles = [];

/***************************************************************/
function reset(A, B, C) {
    document.getElementById('circle' + A).style.color = "white";
    document.getElementById('circle' + B).style.color = "white";
    document.getElementById('circle' + C).style.color = "white";

    setTimeout(function () { location.reload() }, 3000);
}

//checkWinner
function checkWinner() {
    for (var i = 1; i <= 9; i++) {
        circles[i] = document.getElementById('circle' + i).innerHTML;
    }


    // load win audio file
    let win = new Audio();
    win.src = "./assets/tictactoe/sounds/winning.mp3";

    /***************************************************************/
    // check horizontal
    if (circles[1] == circles[2] && circles[2] == circles[3] && circles[1] != "") {
        alert('player ' + circles[1] + ' Wins the game');
        win.play();
        reset(1, 2, 3);
    }
    if (circles[4] == circles[5] && circles[5] == circles[6] && circles[4] != "") {
        alert('player ' + circles[4] + ' Wins the game');
        win.play();
        reset(4, 5, 6);
    }
    if (circles[7] == circles[8] && circles[8] == circles[9] && circles[7] != "") {
        alert('player ' + circles[7] + ' Wins the game');
        win.play();
        reset(7, 8, 9);
    }

    //check vertical
    if (circles[1] == circles[4] && circles[4] == circles[7] && circles[1] != "") {
        alert('player ' + circles[1] + ' Wins the game');
        win.play();
        reset(1, 4, 7);
    }
    if (circles[2] == circles[5] && circles[5] == circles[8] && circles[2] != "") {
        alert('player ' + circles[2] + ' Wins the game');
        win.play();
        reset(2, 5, 8);
    }
    if (circles[3] == circles[6] && circles[6] == circles[9] && circles[3] != "") {
        alert('player ' + circles[3] + ' Wins the game');
        win.play();
        reset(3, 6, 9);
    }

    //check diagonal
    if (circles[1] == circles[5] && circles[5] == circles[9] && circles[1] != "") {
        alert('player ' + circles[1] + ' Wins the game');
        win.play();
        reset(1, 5, 9);
    }
    if (circles[3] == circles[5] && circles[5] == circles[7] && circles[3] != "") {
        alert('player ' + circles[3] + ' Wins the game');
        win.play();
        reset(3, 5, 7);
    }

}


function insert(id) {
    var insertValue = document.getElementById(id);
    if (turn && insertValue.innerHTML == "") {
        insertValue.innerHTML = "X";
        turn = !turn;
    } else if (!turn && insertValue.innerHTML == "") {
        insertValue.innerHTML = "O";
        turn = !turn;
    }
    checkWinner();
}

