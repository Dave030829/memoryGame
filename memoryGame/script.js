const cards = ["😂","😂","❤️","❤️","😍","😍","😒","😒","🤑",
"🤑","🤬","🤬","🤢","🤢","💀","💀","😈","😈","🎃","🎃"];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
}

var shuffledCards = shuffle(cards);
var idCounter = 1;
var idMap = {};
var matchCheck = [];
var foundCounter = 0;
var scoreCounter = 0;
var playPressed = false;

// Function to show the alert
function showAlert() {
    let winnerAlert = document.querySelector('.winnerAlert');
    winnerAlert.style.visibility = 'visible';
    
    let background = document.querySelector('body::after');
    background.style.display = 'block';
}

// Function to hide the alert
function hideAlert() {
    let winnerAlert = document.querySelector('.winnerAlert');
    winnerAlert.style.visibility = 'hidden';
    
    let background = document.querySelector('body::after');
    background.style.display = 'none';
}


for(var i = 0; i < shuffledCards.length; i++)
{
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuffledCards[i];

    box.onclick = function(){
        scoreCounter++;
        if (this.classList.contains('boxOpen')) {
            return; // Ignore clicks on already open boxes
        }
        
        this.classList.add('boxOpen');
        matchCheck.push(this);

        if(matchCheck.length === 2)
        {
            if(matchCheck[0].innerHTML === matchCheck[1].innerHTML)
            {
                // Cards match, leave them open
                matchCheck = [];
                foundCounter++;
            }
            else
            {
                // Cards don't match, close them after 0.5 seconds
                setTimeout(() => {
                    matchCheck[0].classList.remove('boxOpen');
                    matchCheck[1].classList.remove('boxOpen');
                    matchCheck = [];
                }, 500);
            }
        }
        if(foundCounter == cards.length/2)
        {
            setTimeout(() => {
                showAlert();
            }, 200);
        }
        document.querySelector('#score').textContent = "Score: "+scoreCounter;
        document.querySelector('#endScore').textContent = "Score: "+scoreCounter;
    }

    if(!idMap[shuffledCards[i]]) {
        idMap[shuffledCards[i]] = idCounter++;
    }
    box.id ='emoji-' + idMap[shuffledCards[i]];

    document.querySelector('.gameBox').appendChild(box);
}


let myButton = document.querySelector('#playButton');

myButton.addEventListener('click', function() {
    let boxes = document.querySelectorAll('.item');
    let i = 0;

    function openBox() {
        if (i < boxes.length) {
            boxes[i].classList.add('boxOpen');
            i++;
            setTimeout(openBox, 100);
        } else {
            setTimeout(closeBoxes, 2000);
        }
    }

    function closeBoxes() {
        boxes.forEach(function(box) {
            box.classList.remove('boxOpen');
        });
    }

    openBox();
});
