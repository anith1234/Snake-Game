// let a;
// var text=document.getElementById('txt');
// var button=document.getElementById('btn');
// button.addEventListener('click',()=>{
//    let a= document.getElementById('txt').innerHTML=text.value;
//     console.log(a);
//     document.getElementById("lab").innerHTML="Hello " + a
    
    
    

// })
// var count=0;
// var button=document.getElementById("incre").onclick=function(){
//     count+=1;
//     document.getElementById("lab").innerHTML=count
// }
// var button=document.getElementById("decre").onclick=function(){
//     count-=1;
//     document.getElementById("lab").innerHTML=count
// }
// var button=document.getElementById("res").onclick=function(){
//     count=0;
//     document.getElementById("lab").innerHTML=count
// }

// if else====

// var checkbox=document.getElementById("checked");
// var visa=document.getElementById("viscard");
// var master=document.getElementById("master");
// var paypal=document.getElementById("pay");

// var button=document.getElementById("check");

// button.addEventListener("click",()=>{

//    if(checkbox.checked){
//         console.log("you are subscribed");
//     }
//     if(visa.checked){
//         console.log("You are paying Visa")
//     }
//     else if(master.checked){
//         console.log("You are paying Mastercard")
//     }
//     else if(paypal.checked){
//         console.log("You are paying Paypal method")
//     }
//     else{
//         console.log("You must paying process")
//     }
 

// })

// Loops

// let username;
// do{
//    username= window.prompt("Enter you name");
   
   
// }while(username =="");
// console.log("Hello ",username);

// var symbol=window.prompt("Enter your symbol");
// var row=window.prompt("Enter your row");
// var column=window.prompt("Enter your column");

// for(var i=1; i<=row; i++){
//     for(var j=1; j<=column; j++){
//         document.getElementById("myrow").innerHTML += symbol;
//     }
//     document.getElementById("myrow").innerHTML +="<br>";
// }

// for of loop

// let fruits=["apple","bannana","orange","grapes"];
// fruits=fruits.sort().reverse();
// for(let fruit of fruits){
//     console.log(fruit);
// }

// let a1=["apple","mango","orange"];
// let a2=["Anith","stain","harish"];
// let a3=["sam","ravi","sabari"];
// let grocery=[a1,a2,a3];
// grocery[2][1]="Change"
// for(let list of grocery){
//     for(let result of list)
//     console.log(result)
// }

// Map===

// const store=new Map([
//     ["t-shirt",30],
//     ["shocks",30],
//     ["jeans",300]

// ])
// store.set("pants",40);
// // console.log(prize);
// console.log(store.has("j"));
// store.forEach((key,value)=>{
// console.log(`${value} $${key}`);
// })


// inheritance=====

// class Animal{
//   alive=true;
//      eat(){
//         console.log(`This ${this.name} is eaten`);
//     }
//      sleep(){
//           console.log(`This ${this.name} is sleep`);
//     }
// }
// class Rabbit extends Animal{
  
//     name="rabbit"
//     run(){
//         console.log(`This ${this.name} is run`);
//     }
 
   
// }
// class Fish extends Animal{
 
//     name="Fish"
//     swim(){
//         console.log(`This ${this.name} is swim`);
//     }
 
  
// }
// class Hawk extends Animal{
    
//     name="Hawk"
//     fly(){
//         console.log(`This ${this.name} is Fly`);
//     }
  

// }
// const rabbit=new Rabbit();
// const fish=new Fish();
// const hawk=new Hawk();
// console.log(rabbit.alive);
// rabbit.eat();
// rabbit.sleep();
// rabbit.run();

// hawk.eat();
// hawk.sleep();
// hawk.fly();

// setInterval(myfunc,1000)
// function myfunc(){
//     let d=new Date();
//     document.getElementById("interval").innerHTML=
//     d.getHours()+":"+
//     d.getMinutes()+":"+
//        d.getSeconds();
    
// }
// myfunc();

// Snake Game======
 


const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running= true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }     
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};







