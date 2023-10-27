let playerAttack 
let enemyAttack  
let playerLifes = 3 
let enemyLifes = 3

function startGame() {
    let chooseAttackSection = document.getElementById("choose-attack")
    chooseAttackSection.style.display = 'none'

    let resetGameButton = document.getElementById('reset-game')
    resetGameButton.style.display = 'none'

    let playerPetButton = document.getElementById("select-pet-button")
    playerPetButton.addEventListener("click", selectPlayerPet)

    let fireButton = document.getElementById("fire-button")
    fireButton.addEventListener("click", fireAttack)
    let waterButton = document.getElementById("water-button")
    waterButton.addEventListener("click", waterAttack)
    let groundButton = document.getElementById("ground-button")
    groundButton.addEventListener("click", groundAttack)

    let resetButton = document.getElementById("reset-button")
    resetButton.addEventListener("click", resetGame)

}

function selectPlayerPet() {
    let chooseAttackSection = document.getElementById("choose-attack")
    chooseAttackSection.style.display = 'flex'

    let selectPetSection = document.getElementById("choose-pet")
    selectPetSection.style.display = 'none'
    
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
        createMessage(" TIE")
    } else if ( playerAttack == "FIRE" && enemyAttack == "GROUND" || playerAttack == "WATER" && enemyAttack == "FIRE" || playerAttack == "GROUND" && enemyAttack == "WATER" ) { 
        createMessage(" YOU WON")
        enemyLifes --
        spanEnemyLifes.innerHTML = enemyLifes
    } else {
        createMessage(" YOU LOST")
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

function createMessage (result) { 
    let messagesSection = document.getElementById("result")
    let playerAttacks = document.getElementById("player-attacks")
    let enemyAttacks = document.getElementById("enemy-attacks")

    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    messagesSection.innerHTML = result
    newPlayerAttack.innerHTML = playerAttack
    newEnemyAttack.innerHTML = enemyAttack
    
    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)


}

function creatFinalMessage(finalResult) { 
    let resetGameButton = document.getElementById('reset-game')
    resetGameButton.style.display = 'block'
    
    let messagesSection = document.getElementById("result")

    messagesSection.innerHTML = finalResult

    let fireButton = document.getElementById("fire-button")
    fireButton.disabled = true 
    let waterButton = document.getElementById("water-button")
    waterButton.disabled = true 
    let groundButton = document.getElementById("ground-button")
    groundButton.disabled = true 

}

function resetGame(){
    location.reload()
}

function random (min,max) {
    return Math.floor(Math.random() * (max - min +1) +min) 
} 

window.addEventListener("load", startGame)
