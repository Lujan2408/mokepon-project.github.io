let playerAttack 
let enemyAttack  
let playerLifes = 3 
let enemyLifes = 3

function startGame() {
    let playerPetButton = document.getElementById("pet-button")
    playerPetButton.addEventListener("click", selectPlayerPetButton)

    let fireButton = document.getElementById("fire-button")
    fireButton.addEventListener("click", fireAttack)
    let waterButton = document.getElementById("water-button")
    waterButton.addEventListener("click", waterAttack)
    let groundButton = document.getElementById("ground-button")
    groundButton.addEventListener("click", groundAttack)

}

 
function selectPlayerPetButton() {
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let petPlayerSpan = document.getElementById("pet-player")

    if(inputHipodoge.checked){
        petPlayerSpan.innerHTML = "Hipodoge"
    } else if(inputCapipepo.checked) {
        petPlayerSpan.innerHTML = "Capipepo"
    } else if(inputRatigueya.checked){
        petPlayerSpan.innerHTML = "Ratigueya"
    } else {
        alert("You must choose a pet")
    }

    selectEnemyPet()
}

function selectEnemyPet() {
    let randomPet = random(1,3) 
    let petEnemySpan = document.getElementById("pet-enemy") 

    if(randomPet == 1) {
        petEnemySpan.innerHTML = "Hipodoge"
    } else if(randomPet == 2) {
        petEnemySpan.innerHTML = "Capipepo"
    } else {
        petEnemySpan.innerHTML = "Ratigueya"
    }

}

function fireAttack () {
    playerAttack = "FIRE"
    randonEnemyAttack() 
}

function waterAttack () {
    playerAttack = "WATER"
    randonEnemyAttack()
}

function groundAttack () {
    playerAttack = "GROUND"
    randonEnemyAttack()
}


function randonEnemyAttack () {
    let randomAttack = random(1,3) 

    if (randomAttack == 1) {
        enemyAttack = "FIRE"
    } else if(randomAttack == 2) {
        enemyAttack = "WATER"
    } else {
        enemyAttack = "GROUND"
    }

    combat()
}

function combat () {
    let spanPlayerLifes = document.getElementById("player-lifes") 
    let spanEnemyLifes = document.getElementById("enemy-lifes") 
 
    if ( enemyAttack == playerAttack ){
        creatMessage(" - TIE")
    } else if ( playerAttack == "FIRE" && enemyAttack == "GROUND" || playerAttack == "WATER" && enemyAttack == "FIRE" || playerAttack == "GROUND" && enemyAttack == "WATER" ) { 
        creatMessage(" - YOU WON")
        enemyLifes --
        spanEnemyLifes.innerHTML = enemyLifes
    } else {
        creatMessage(" - YOU LOST")
        playerLifes -- 
        spanPlayerLifes.innerHTML = playerLifes  
    } 

    checkLifes() 

}

function checkLifes () {
    if(playerLifes == 0) {
        creatFinalMessage("YOU LOST :(")
    } else if(enemyLifes == 0) {
        creatFinalMessage("YOU WIN!! :)")
    }
}

function creatMessage (result) { 
    let messagesSection = document.getElementById("messages")

    let paragraph = document.createElement('p')
    paragraph.innerHTML = "Your pet attacked with " + playerAttack + ", Enemy's pet attacked with " + enemyAttack + result 
    
    messagesSection.appendChild(paragraph)


}

function creatFinalMessage(finalResult) { 
    let messagesSection = document.getElementById("messages")

    let paragraph = document.createElement('p')
    paragraph.innerHTML = finalResult
    
    messagesSection.appendChild(paragraph)

}

function random (min,max) {
    return Math.floor(Math.random() * (max - min +1) +min) 
} 

window.addEventListener("load", startGame)
