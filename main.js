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

let playerId = null
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

let heightWeAreLooking
let mapWidth = window.innerWidth - 20 
const maxWidthMap = 600 

if (mapWidth > maxWidthMap) {
   mapWidth = maxWidthMap - 20 
}

heightWeAreLooking = mapWidth * 400 / 600 

map.width = mapWidth
map.height = heightWeAreLooking

let lienzo = map.getContext("2d")
let interval
let mapBackground = new Image()
mapBackground.src = './assets/canvas-background.jpg'

class Mokepon {
    constructor(nombre, image, life, imageMap, id = null ) {
        this.id = id 
        this.nombre = nombre  
        this.image = image
        this.life = life
        this.attacks = []
        this.width = 45 
        this.height = 45 
        this.x = random(0, map.width - this.width)
        this.y = random(0, map.height - this.height)
        this.mapImage = new Image() 
        this.mapImage.src = imageMap
        this.speedX = 0
        this.speedY = 0
    }

    drawMokepon() {
        lienzo.drawImage(
            this.mapImage, 
            this.x,
            this.y, 
            this.width,
            this.height
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png')

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.png')

const HIPODOGE_ATTACKS = [
    { name: '💧', id: 'water-button' },
    { name: '💧', id: 'water-button' },
    { name: '💧', id: 'water-button' },
    { name: '🔥', id: 'fire-button' },
    { name: '🌱', id: 'ground-button' }
]

const CAPIPEPO_ATTACKS = [
    { name: '🌱', id: 'ground-button' },
    { name: '🌱', id: 'ground-button' },
    { name: '🌱', id: 'ground-button' },
    { name: '💧', id: 'water-button' },
    { name: '🔥', id: 'fire-button' }
]

const RATIGUEYA_ATTACKS = [
    { name: '🔥', id: 'fire-button' },
    { name: '🔥', id: 'fire-button' },
    { name: '🔥', id: 'fire-button' },
    { name: '💧', id: 'water-button' },
    { name: '🌱', id: 'ground-button' }
]

hipodoge.attacks.push(...HIPODOGE_ATTACKS)
capipepo.attacks.push(...CAPIPEPO_ATTACKS)
ratigueya.attacks.push(...RATIGUEYA_ATTACKS)

mokepones.push(hipodoge, capipepo, ratigueya) 

function startGame() {
    chooseAttackSection.style.display = 'none'
    resetGameButton.style.display = 'none'

    seeMapSection.style.display = 'none'

    mokepones.forEach((mokepon) => {
        mokeponesOption = `
        <input type="radio" nombre="pet" id=${mokepon.nombre}>
                <label class="mokepon-card" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.image} alt=${mokepon.nombre}>
                </label>
        ` 
        cardsContainer.innerHTML += mokeponesOption

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })

    playerPetButton.addEventListener("click", selectPlayerPet)  
    resetGameButton.addEventListener("click", resetGame)

    joinGame()
}

function joinGame() {
    fetch("http://localhost:8080/join")
        .then( function(res) {
            if(res.ok) {
                res.text()
                    .then( function(response) {
                        console.log(response)
                        playerId = response
                    })
            }
        })
}

function selectPlayerPet() {
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

    selectMokepon(petPlayer)

    extractAttacks(petPlayer) 
    startMap()
}

function selectMokepon(petPlayer) {
    fetch(`http://localhost:8080/mokepon/${playerId}`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            mokepon: petPlayer
        })
    })
}

function extractAttacks(petPlayer) {
    let attacks 
    for (let i = 0; i < mokepones.length; i++) {
        if (petPlayer === mokepones[i].nombre) {
            attacks = mokepones[i].attacks
        }
        
    }
    showAttacks(attacks)
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        mokeponAttacks = `
        <button id=${attack.id} class="attack-buttons AButton">${attack.nombre}</button>
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

function selectEnemyPet(enemy) {
    petEnemySpan.innerHTML = enemy.nombre
    mokeponEnemyAttacks = enemy.attacks 

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

    resetGameButton.style.display = 'block'    

    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    messagesSection.innerHTML = result
    newPlayerAttack.innerHTML = indexPlayerAttack
    newEnemyAttack.innerHTML = indexEnemyAttack
    
    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)
}

function creatFinalMessage(finalResult) { 
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
    petPlayerObject.drawMokepon()

    sendPosition(petPlayerObject.x, petPlayerObject.y)
}

function sendPosition(x,y) {
    fetch(`http://localhost:8080/mokepon/${playerId}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            x, 
            y
        })
    })
    .then(function (res) {
        if(res.ok) {
            res.json()
                .then(function ({ enemies }) {
                    // console.log(enemies)
                    enemies.forEach(enemy => {
                        let mokeponEnemy = null
                        
                        if(enemy.mokepon != undefined) {
                            const mokeponName = enemy.mokepon.nombre || ''

                            if( mokeponName === 'Hipodoge') {
                                mokeponEnemy = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png')
                            } else if( mokeponName === 'Capipepo') {
                                mokeponEnemy = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png')
                            } else if( mokeponName === 'Ratigueya' ) {
                                mokeponEnemy = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.png')
                            }

                            mokeponEnemy.x = enemy.x 
                            mokeponEnemy.y = enemy.y 
                            mokeponEnemy.drawMokepon();
                        }
                    });

                })
        }
    }) 
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

    interval = setInterval(drawCanvas, 50)

    window.addEventListener('keydown', pressKey)
    window.addEventListener('keyup', stopMovement)
}

function getPetObject() {
    for (let i = 0; i < mokepones.length; i++) {
        if (petPlayer === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function checkCollision(enemy) {
    const upEnemy = enemy.y 
    const downEnemy = enemy.y + enemy.height
    const rightEnemy = enemy.x + enemy.width
    const leftEnemy = enemy.x
    
    const upPet = petPlayerObject.y 
    const downPet = petPlayerObject.y + petPlayerObject.height
    const rightPet = petPlayerObject.x + petPlayerObject.width
    const leftPet = petPlayerObject.x

    if (
        downPet < upEnemy || 
        upPet > downEnemy ||
        rightPet < leftEnemy || 
        leftPet > rightEnemy
    ) {
        return
    }
    stopMovement()
    clearInterval(interval)
    chooseAttackSection.style.display = 'flex'
    seeMapSection.style.display = 'none'
    selectEnemyPet(enemy)

}

window.addEventListener("load", startGame)
