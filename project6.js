// This program runs a game called Mushroom Harvesters. It was meant to be similar
// to games such as Cookie Clicker and Candy Box 2. They're both much more developed
// in comparison to this, but I was surprised how many of the skills I would need to
// imitate them were mostly within the realm of what we learned in class. This genre
// of game in general is not all that exciting, but this was a good opportunity to
// find out just how much I've learned.
// Author: Braxton Meyer


//Initialize the count at zero, and sets the counter display to this variable.
let counter = 0;
document.getElementById("counter").innerHTML = counter;
let production = 1
let multiplier = 1
let pigmultiplier = 1

//Initialize the Pig object, technically player starts with no pig.
let pig = {name:"", size:0, color:"transparent"};

//initialize possible colors
let colors = ["pink", "palevioletred", "magenta", "burlywood"]
//Function to pick a random color
function randomColor() {
    let color = "black"
    color = colors[Math.floor(Math.random() * colors.length)];
    return color;
}

//This function was discovered on the internet, I did not write it.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//I wrote this function, but I had to do some research to find out about the setTimeout feature (from a stopwatch tutorial).
//Every cycle will increase the counter by 1, plus any multipliers.
function countCycle() {
    counter = counter + production * multiplier * pigmultiplier;
    document.getElementById("counter").innerHTML = counter
    setTimeout("countCycle()", 1000);
}

//Used to display any sort of information to the user, whether it be errors or good news.
function updateStatus(message, color) {
    document.getElementById("status").innerHTML = message;
    document.getElementById("status").style.color = color;
    document.getElementById("production").innerHTML = "You are currently producing " + production*multiplier*pigmultiplier + " mushroom(s) a second."
}

//used whenever a purchase is made. The price is passed as a parameter.
function purchaseItem(price) {
    if (counter >= price) {
        counter = counter - price;
        return true
    } else {
        return false
    }
}

//Creates a randomized pig for the player
function createPig(pigName) {
    pig = {name:pigName, size:getRandomInt(1,100), color:randomColor()};
    if (pig.name == "" ){
        pig.name = "Burt"
    }
}

//Updates the pig's stats and display on the screen.
function updatePig() {
    document.getElementById("pig").style.color = pig.color;
    document.getElementById("pigName").textContent = pig.name + ", the pig";
    document.getElementById("pigStats").textContent = pig.name + " multiplies your production by " + pig.size;
    pigmultiplier = pig.size
}

//Everything below here is the button logic for various upgrades.
purchasePigButton = document.getElementById("purchasePig")
purchasePigButton.addEventListener("click", () => {
    if (purchaseItem(1000)){
        pigName = document.getElementById("pigNameSelect").value
        createPig(pigName);
        updatePig();
        updateStatus("Take good care of it!","green")
    } else {
        updateStatus("You don't have enough mushrooms!","red")
    }
});

purchaseWorkerButton = document.getElementById("purchaseWorker")
purchaseWorkerButton.addEventListener("click", () => {
    if (purchaseItem(15)){
        production = production + 1
        updateStatus("Successful hire!","blue")
    } else {
        updateStatus("You don't have enough mushrooms!","red")
    }
});

purchaseDupesButton = document.getElementById("purchaseDupes")
purchaseDupesButton.addEventListener("click", () => {
    if (purchaseItem(100)){
        multiplier = multiplier * 2
        updateStatus("Successful purchase!","blue")
    } else {
        updateStatus("You don't have enough mushrooms!","red")
    }
});

purchaseCarlsButton = document.getElementById("selloutToCarls")
purchaseCarlsButton.addEventListener("click", () => {
    if (purchaseItem(300)){
        multiplier = multiplier * 3
        updateStatus("Hope this deal pays off...","blue")
    } else {
        updateStatus("You don't have enough mushrooms!","red")
    }
});

//A unique button in that it costs no mushrooms, and displays an info box.
helpButton = document.getElementById("help")
helpButton.addEventListener("click", () => {
    window.alert("You are a mushroom farmer, you start by automatically harvesting 1 mushroom every second by hand. You can trade in mushrooms for upgrades to increase your production!")
});

//Display a welcome message and start the "game loop" that increments mushroom gains.
updateStatus("Welcome!","green")
countCycle();