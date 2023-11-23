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

const seeMapSection = document.getElementById("see-map")
const map = document.getElementById("map")

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

let indexPlayerAttack
let indexEnemyAttack
let playerVictories = 0 
let enemyVictories = 0

let petPlayerObject 
let petPlayer 
let playerAttack = []
let enemyAttack = []
let playerLifes = 3 
let enemyLifes = 3

let lienzo = map.getContext("2d")
let interval
let mapBackground = new Image()
mapBackground.src = './assets/canvas-background.jpg'

class Mokepon {
    constructor(name, image, life) {
        this.name = name 
        this.image = image
        this.life = life
        this.attacks = []
        this.x = 20
        this.y = 30 
        this.width = 80 
        this.height = 80 
        this.mapImage = new Image() 
        this.mapImage.src = image
        this.speedX = 0
        this.speedY = 0
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

    seeMapSection.style.display = 'none'

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
    // chooseAttackSection.style.display = 'flex'
    selectPetSection.style.display = 'none'
    seeMapSection.style.display = 'flex'
    
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
    startMap()
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
                button.disabled = true 
            } else if(e.target.textContent === "💧") {
                playerAttack.push('WATER')
                console.log(playerAttack)
                button.style.background = "rgb(170, 170, 170)"
                button.disabled = true 
            } else {
                playerAttack.push('GROUND')
                console.log(playerAttack)
                button.style.background = "rgb(170, 170, 170)"
                button.disabled = true 
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
    startFight()
}

function startFight() {
    if (playerAttack.length === 5) {
        combat()
    }
} 

function bothPlayersIndex (player, enemy) {
    indexPlayerAttack = playerAttack[player]
    indexEnemyAttack = enemyAttack[enemy]
}

function combat() { 

    for (let index = 0; index < playerAttack.length; index++) {
        if (playerAttack[index] === enemyAttack[index]) {
            bothPlayersIndex (index, index)
            createMessage(" TIE")
        } else if (playerAttack[index] === 'FIRE' && enemyAttack[index] === 'GROUND') {
            bothPlayersIndex(index, index)
            createMessage(" YOU WON")
            playerVictories++
            spanPlayerLifes.innerHTML = playerVictories
        } else if (playerAttack[index] === 'WATER' && enemyAttack[index] === 'FIRE') {
            bothPlayersIndex(index, index)
            createMessage(" YOU WON")
            playerVictories++
            spanPlayerLifes.innerHTML = playerVictories
        } else if (playerAttack[index] === 'GROUND' && enemyAttack[index] === 'WATER') {
            bothPlayersIndex(index, index)
            createMessage(" YOU WON")
            playerVictories++
            spanPlayerLifes.innerHTML = playerVictories
        } else {
            bothPlayersIndex(index, index)
            createMessage(" YOU LOST")
            enemyVictories++
            spanEnemyLifes.innerHTML = enemyVictories
        }
    } 

    checkVictories() 

}

function checkVictories () {
    if(playerVictories === enemyVictories) {
        creatFinalMessage("This was a Tie!")
    } else if(playerVictories > enemyVictories) {
        creatFinalMessage("YOU WIN!! :)")
    } else {
        createMessage("YOU LOST :(")
    }
}

function createMessage (result) { 
    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    messagesSection.innerHTML = result
    newPlayerAttack.innerHTML = indexPlayerAttack
    newEnemyAttack.innerHTML = indexEnemyAttack
    
    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)
}

function creatFinalMessage(finalResult) { 
    resetGameButton.style.display = 'block'    
    messagesSection.innerHTML = finalResult
}

function resetGame(){
    location.reload()
}

function random (min,max) {
    return Math.floor(Math.random() * (max - min +1) +min) 
} 

function drawCanvas() {
    petPlayerObject.x = petPlayerObject.x + petPlayerObject.speedX
    petPlayerObject.y = petPlayerObject.y + petPlayerObject.speedY

    lienzo.clearRect(0, 0, map.width, map.height)
    
    lienzo.drawImage(
        mapBackground, 
        0,
        0,
        map.width,
        map.height 
    )

    lienzo.drawImage(
        petPlayerObject.mapImage, 
        petPlayerObject.x,
        petPlayerObject.y, 
        petPlayerObject.width,
        petPlayerObject.height
    )
}

function moveUp() {
    petPlayerObject.speedY = - 7
}
function moveLeft() {
    petPlayerObject.speedX = - 7 
}
function moveDown() {
    petPlayerObject.speedY = + 7
}
function moveRight() {
    petPlayerObject.speedX = + 7
}

function stopMovement() {
    petPlayerObject.speedX = 0 
    petPlayerObject.speedY = 0
}

function pressKey(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowLeft':
            moveLeft()
            break 
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowRight': 
            moveRight() 
            break
        default:
            break
    }
}
function startMap() {
    petPlayerObject = getPetObject(petPlayer)

    map.width = 600 
    map.height = 400
    interval = setInterval(drawCanvas, 50)

    window.addEventListener('keydown', pressKey)
    window.addEventListener('keyup', stopMovement)
}

function getPetObject() {
    for (let i = 0; i < mokepones.length; i++) {
        if (petPlayer === mokepones[i].name) {
            return mokepones[i]
        }
        
    }
}

window.addEventListener("load", startGame)
