let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let boxs = document.querySelectorAll(".box");
let body = document.querySelector("body");

let started = false;
let level = 0;
let highScore = localStorage.getItem("Higest score");
if(highScore === null) localStorage.setItem("Higest score", 0) 
let gameseq = [];
let userseq = [];
let btnColors = ["yellow", "green", "red", "blue"];
h3.innerText = `Highest Score: ${highScore}`;
document.addEventListener("keypress", () => {
    if (started === false) {
        levelup();
        started = true;
    } 

    });

        let reset = () => {
            if(highScore < level) {
                h3.innerText = `Highest Score: ${level}`;
                localStorage.setItem("Higest score", level);
            }
            gameseq = [];
        userseq = [];
    level = 0;
    started = false;
    body.style.backgroundColor = "red";
    setTimeout(() => { body.style.backgroundColor = "white"; }, 500)
}

let check = (idx) => {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(() => {
                levelup();
            }, 500);
        }
    } else {
        h2.innerHTML = `Game Over. Your score is ${level}.<br/> Press any key to start.`
        reset();
    }
}
function userbtn() {
    let userColor = this.getAttribute("id");
    userseq.push(userColor);
    check(userseq.length - 1)
    btnFlash(this);
}

for (box of boxs) {
        box.addEventListener("click", userbtn)
    }


let btnFlash = (btn) => {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash")
    }, 100)
}


let levelup = () => {
    userseq = [];
    level++;
    h2.innerText = `Level: ${level}`;
    
    let idx = Math.floor(Math.random() * 4);
    let btnColor = btnColors[idx];
    let ranBtn = document.querySelector(`#${btnColor}`);
    gameseq.push(btnColor);
    setTimeout(() => { btnFlash(ranBtn) }, 200);
}