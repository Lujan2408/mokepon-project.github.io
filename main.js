const chooseAttackSection = document.getElementById("choose-attack")
const resetGameButton = document.getElementById('reset-game')
const playerPetButton = document.getElementById("select-pet-button")
const fireButton = document.getElementById("fire-button")
const waterButton = document.getElementById("water-button")
const groundButton = document.getElementById("ground-button")
const resetButton = document.getElementById("reset-button")

const selectPetSection = document.getElementById("choose-pet")
const inputHipodoge = document.getElementById("hipodoge")
const inputCapipepo = document.getElementById("capipepo")
const inputRatigueya = document.getElementById("ratigueya")
const petPlayerSpan = document.getElementById("pet-player")

const petEnemySpan = document.getElementById("pet-enemy")

const spanPlayerLifes = document.getElementById("player-lifes") 
const spanEnemyLifes = document.getElementById("enemy-lifes")

const messagesSection = document.getElementById("result")
const playerAttacks = document.getElementById("player-attacks")
const enemyAttacks = document.getElementById("enemy-attacks")
const cardsContainers = document.getElementById("cardsContainers") 

let mokepones = [] 
let mokeponesOption 

let playerAttack 
let enemyAttack  
let playerLifes = 3 
let enemyLifes = 3

class Mokepon {
    constructor(name, image, life) {
        this.name = name 
        this.image = image
        this.life = life
        this.attacks = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', '5' )

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', '5')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', '5')

hipodoge.attacks.push( 
    { name: '💧', id: 'water-button' },
    { name: '💧', id: 'water-button' },
    { name: '💧', id: 'water-button' },
    { name: '🔥', id: 'fire-button' },
    { name: '🌱', id: 'ground-button' }
)

capipepo.attacks.push( 
    { name: '🌱', id: 'ground-button' },
    { name: '🌱', id: 'ground-button' },
    { name: '🌱', id: 'ground-button' },
    { name: '💧', id: 'water-button' },
    { name: '🔥', id: 'fire-button' }
)

ratigueya.attacks.push( 
    { name: '🔥', id: 'fire-button' },
    { name: '🔥', id: 'fire-button' },
    { name: '🔥', id: 'fire-button' },
    { name: '💧', id: 'water-button' },
    { name: '🌱', id: 'ground-button' }
)

mokepones.push(hipodoge,capipepo, ratigueya) 

function startGame() {
    chooseAttackSection.style.display = 'none'
    resetGameButton.style.display = 'none'

    mokepones.forEach((mokepon) => {
        mokeponesOption = `
        <input type="radio" name="pet" id=${mokepon.name}>
                <label class="mokepon-card" for=${mokepon.name}>
                    <p>${mokepon.name}</p>
                    <img src=${mokepon.image} alt=${mokepon.name}>
                </label>
        ` 
        cardsContainers.innerHTML += mokeponesOption
    })

    playerPetButton.addEventListener("click", selectPlayerPet)
    fireButton.addEventListener("click", fireAttack)
    waterButton.addEventListener("click", waterAttack)
    groundButton.addEventListener("click", groundAttack)  
    resetButton.addEventListener("click", resetGame)

}

function selectPlayerPet() {
    chooseAttackSection.style.display = 'flex'
    selectPetSection.style.display = 'none'
    
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
    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    messagesSection.innerHTML = result
    newPlayerAttack.innerHTML = playerAttack
    newEnemyAttack.innerHTML = enemyAttack
    
    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)
}

function creatFinalMessage(finalResult) { 
    resetGameButton.style.display = 'block'    
    messagesSection.innerHTML = finalResult

    fireButton.disabled = true 
    waterButton.disabled = true 
    groundButton.disabled = true 
}

function resetGame(){
    location.reload()
}

function random (min,max) {
    return Math.floor(Math.random() * (max - min +1) +min) 
} 

window.addEventListener("load", startGame)
