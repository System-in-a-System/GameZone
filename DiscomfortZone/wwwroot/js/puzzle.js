﻿// Define the set of images in array
var images = [
    { src: './assets/img/puzzleGame/11.jpg', title: 'Eiffel tower' },
    { src: './assets/img/puzzleGame/12.jpg', title: 'Pyramids' },
    { src: './assets/img/puzzleGame/13.jpg', title: 'Great Wall of China' },
    { src: './assets/img/puzzleGame/14.jpg', title: 'Leaning Tower of Pisa' },

];

var gridSize = 5;
window.onload = function () {
    var grid = document.querySelector('#collage');
    imagePuzzle.startGame(images, gridSize);
};

// Create function to restart button
function restart() {
    var grid = document.querySelector('#collage');
    imagePuzzle.startGame(images, gridSize);
}

//Add alert to rules button
function rulesButtons() {

    alert('Rearrange the image parts in a way that it correctly forms the picture. \nThe no. of steps taken will be counted.');

}

// Declare timer variable
var timerFunction;

// Create The image puzzle
var imagePuzzle = {
    stepCount: 0,
    startTime: new Date().getTime(),
    startGame: function (images, gridSize) {
        this.setImage(images, gridSize);
        helper.doc('playPanel').style.display = 'block';
        helper.shuffle('sortable');
        this.stepCount = 0;
        this.startTime = new Date().getTime();
        this.tick();
    },
    tick: function () {
        var now = new Date().getTime();
        var elapsedTime = parseInt((now - imagePuzzle.startTime) / 1000, 10);
        helper.doc('timerPanel').textContent = elapsedTime;
        timerFunction = setTimeout(imagePuzzle.tick, 1000);
    },
    setImage: function (images, gridSize) {
        var percentage = 100 / (gridSize - 1 );
        var image = images[Math.floor(Math.random() * images.length)];
        helper.doc('imgTitle').innerHTML = image.title;
        helper.doc('actualImage').setAttribute('src', image.src);
        helper.doc('sortable').innerHTML = '';
        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';

           let li = document.createElement('li');
            li.id = i;
            li.setAttribute('data-value', i);
            li.style.backgroundImage = 'url(' + image.src + ')';
            li.style.backgroundSize = (gridSize * 100) + '%';
            li.style.backgroundPosition = xpos + ' ' + ypos;
            li.style.width = (400 / gridSize )  -1 + 'px';
            li.style.height = (400 / gridSize) - 25 + 'px';
            li.style.border = '0.1px solid white';

            li.setAttribute('draggable', 'true');
            li.ondragstart = (event) => event.dataTransfer.setData('data', event.target.id);
            li.ondragover = (event) => event.preventDefault();
            li.ondrop = (event) => {
                let origin = helper.doc(event.dataTransfer.getData('data'));
                let dest = helper.doc(event.target.id);
                let p = dest.parentNode;

                if (origin && dest && p) {
                    let temp = dest.nextSibling;
                    let x_diff = origin.offsetLeft - dest.offsetLeft;
                    let y_diff = origin.offsetTop - dest.offsetTop;

                    if (y_diff == 0 && x_diff > 0) {
                        //LEFT SWAP
                        p.insertBefore(origin, dest);
                        p.insertBefore(temp, origin);
                    }
                    else {
                        p.insertBefore(dest, origin);
                        p.insertBefore(origin, temp);
                    }


                    let vals = Array.from(helper.doc('sortable').children).map(x => x.id);
                    var now = new Date().getTime();
                    helper.doc('stepCount').textContent = ++imagePuzzle.stepCount;
                    document.querySelector('.timeCount').textContent = (parseInt((now - imagePuzzle.startTime) / 1000, 10));

                    if (isSorted(vals)) {
                     
                        helper.doc('actualImageBox').innerHTML = helper.doc('win').innerHTML;
                        helper.doc('stepCount').textContent = imagePuzzle.stepCount;
                       
                    }
                }
            };
            li.setAttribute('dragstart', 'true');
            helper.doc('sortable').appendChild(li);
        }
        helper.shuffle('sortable');
    }
};

// IF is sorted
isSorted = (arr) => arr.every((elem, index) => { return elem == index; });

var helper = {
    doc: (id) => document.getElementById(id) || document.createElement("div"),

    // Shuffle funtion
    shuffle: (id) => {
        var ul = document.getElementById(id);
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
    }




}

