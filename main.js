const chooseAttackSection = document.getElementById("choose-attack")
const resetGameButton = document.getElementById('reset-game')
const playerPetButton = document.getElementById("select-pet-button")

const selectPetSection = document.getElementById("choose-pet")
const petPlayerSpan = document.getElementById("pet-player")

const petEnemySpan = document.getElementById("pet-enemy")

const spanPlayerLifes = document.getElementById("player-lifes") 
const spanEnemyLifes = document.getElementById("enemy-lifes")

const messagesSection = document.getElementById("result")
const playerAttacks = document.getElementById("player-attacks")
const enemyAttacks = document.getElementById("enemy-attacks")
const cardsContainer = document.getElementById("cardsContainer") 
const attacksContainer = document.getElementById("attacksContainer")

let mokepones = [] 
let mokeponesOption 
let mokeponAttacks
let mokeponEnemyAttacks  

let inputHipodoge
let inputCapipepo
let inputRatigueya

let fireButton 
let waterButton 
let groundButton 
let buttons = []

let petPlayer 
let playerAttack = []
let enemyAttack = []
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
        cardsContainer.innerHTML += mokeponesOption

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })

    playerPetButton.addEventListener("click", selectPlayerPet)  
    resetGameButton.addEventListener("click", resetGame)

}

function selectPlayerPet() {
    chooseAttackSection.style.display = 'flex'
    selectPetSection.style.display = 'none'
    
    if(inputHipodoge.checked){
        petPlayerSpan.innerHTML = inputHipodoge.id
        petPlayer = inputHipodoge.id
    } else if(inputCapipepo.checked) {
        petPlayerSpan.innerHTML = inputCapipepo.id
        petPlayer = inputCapipepo.id
    } else if(inputRatigueya.checked){
        petPlayerSpan.innerHTML = inputRatigueya.id
        petPlayer = inputRatigueya.id
    } else {
        alert("You must choose a pet")
    }

    extractAttacks(petPlayer) 
    selectEnemyPet()
}

function extractAttacks(petPlayer) {
    let attacks 
    for (let i = 0; i < mokepones.length; i++) {
        if (petPlayer === mokepones[i].name) {
            attacks = mokepones[i].attacks
        }
        
    }
    showAttacks(attacks)
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        mokeponAttacks = `
        <button id=${attack.id} class="attack-buttons AButton">${attack.name}</button>
        `

        attacksContainer.innerHTML += mokeponAttacks
    })

    fireButton = document.getElementById("fire-button")
    waterButton = document.getElementById("water-button")
    groundButton = document.getElementById("ground-button")
    buttons = document.querySelectorAll(".AButton") 
}

function attacksSequence(){
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                playerAttack.push('FIRE')
                console.log(playerAttack)
                button.style.background = "rgb(170, 170, 170)"
            } else if(e.target.textContent === "💧") {
                playerAttack.push('WATER')
                console.log(playerAttack)
                button.style.background = "rgb(170, 170, 170)"
            } else {
                playerAttack.push('GROUND')
                console.log(playerAttack)
                button.style.background = "rgb(170, 170, 170)"
            }
            randonEnemyAttack()
        })
    })
} 

function selectEnemyPet() {
    let randomPet = random(0, mokepones.length -1)  

    petEnemySpan.innerHTML = mokepones[randomPet].name
    mokeponEnemyAttacks = mokepones[randomPet].attacks 

    attacksSequence()
}

function randonEnemyAttack() {
    let randomAttack = random(0, mokeponEnemyAttacks.length -1) 

    if (randomAttack == 1 || randomAttack == 1) {
        enemyAttack.push("FIRE")
    } else if(randomAttack == 3 || randomAttack == 4) {
        enemyAttack.push("WATER") 
    } else {
        enemyAttack.push("GROUND")
    }
    console.log(enemyAttack)
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
