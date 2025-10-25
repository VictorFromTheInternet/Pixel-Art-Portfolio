
//
//  Animations
//
// row 0  : walking (6 col)
// row 1  : standing (4 col)
// row 2  : standing (3 col)
// row 3  : strike (4 col)
// row 4  : block (4 col)
// row 5  : take damage (3 col)
// row 6  : death (5 col)
// row 7  : emote/raise sword (6 col)
const states = {
    walking: 0,
    idle: 1,
    run: 2,
    attack: 3,
    block: 4,
    damage: 5,
    death: 6,
    emote: 7,
}

class State{
    constructor(state){
        this.state = state
    }
}

// default state 
// handleInput reacts to: left, right, up, default is idle
export class Idle extends State{
    constructor(player){
        super('idle')
        this.player = player // assigning an instance of a player class
    }
    enter(){      
        this.player.frameX = 0  
        this.player.maxFrame = 3 // 4 frames
        this.player.frameY = 1        
        // this.player.game.caption.prevCard()
    }

    // this function will switch the current state
    // based on input
    handleInput(input){ // expects keys arr as input          

        if(input.includes(' ')){            
            this.player.setState(states.emote, 0) // int val of 7
            console.log(`State: run/emote - ${states.emote}`)
        }
        else if(input.includes('a') || input.includes('d')){            
            this.player.setState(states.walking, 1) // int val of 0
            console.log(`State: walking - ${states.walking}`)
        }        
        else if(input.includes('w') && this.player.onGround()){            
            this.player.setState(states.run, 0) // int val of 3
            console.log(`State: run/jump - ${states.run}`)
        }
        
    }
}


// walking state 
// handleInput reacts to: left, right, up, default is idle
export class Walking extends State{
    constructor(player){
        super('walking')
        this.player = player // assigning an instance of a player class
    }
    enter(){       
        this.player.frameX = 0 
        this.player.maxFrame = 5 // 6 frames
        this.player.frameY = 0        
    }
    handleInput(input){ // expects keys arr as input
        

        if(input.includes(' ')){            
            this.player.setState(states.emote, 0) // int val of 7d
            console.log(`State: emote - ${states.emote}`)
        }
        else if(input.includes('w') && this.player.onGround()){            
            this.player.setState(states.run, 0) // int val of 3
            console.log(`State: jump - ${states.run}`)
        } 
        // else if(this.player.frameX == 5 || ( input.includes('a') == -1 && input.includes('d') ==-1) ){            
        //     this.player.setState(states.idle, 0) // int val of 1
        //     console.log (`State: idle - ${states.idle}`)            
        // }
        else if(   (input.includes('a') == -1 && 
                    input.includes('d') == -1 && 
                    input.includes('w') == -1 &&
                    input.includes(' ') == -1) ||
                    input.length == 0
                ){            
            this.player.setState(states.idle, 0) // int val of 1
            console.log (`State: idle - ${states.idle}`)            
        }
        
        if(input.includes('s') && this.player.onGround()){            
            this.player.setState(states.idle, 0) // int val of 3
            console.log(`State: idle - ${states.idle}`)
        }       
        
    }
}

// jump state 
// handleInput reacts to: left, right, up, default is idle
export class Jump extends State{
    constructor(player){
        super('run')
        this.player = player // assigning an instance of a player class
    }
    enter(){
        this.player.frameX = 0
        this.player.maxFrame = 2 // 3 frames
        this.player.frameY = 2        
        
        this.player.y += this.player.vy
        if(this.player.onGround()) // apply force upward
            this.player.vy -= 10    
                
            
    }
    handleInput(input){ // expects keys arr as input
                
        if(input.includes(' ')){            
            this.player.setState(states.emote, 1) // int val of 7
            console.log(`State: emote - ${states.emote}`)
        }
        else if(input.includes('a') || input.includes('d')){            
            this.player.setState(states.walking, 1) // int val of 0
            console.log(`State: walking - ${states.walking}`)
            
        }        
        else if(this.player.frameX == 2){            
            this.player.setState(states.idle, 0) // int val of 1
            console.log(`State: idle - ${states.idle}`)
            
        }
    }
}

// emote state 
// handleInput reacts to: left, right, up, default is idle
export class Emote extends State{
    constructor(player){
        super('emote')
        this.player = player // assigning an instance of a player class
    }
    enter(){
        this.player.frameX = 0
        this.player.maxFrame = 5 // 6 frames
        this.player.frameY = 7 // 8th anim/row                
                
            
    }
    handleInput(input){ // expects keys arr as input
        console.log(this.player.frameX)                
        // if(input.includes(' ')){            
        //     this.player.setState(states.emote, 1) // int val of 7
        //     console.log(`State: emote - ${states.emote}`)
        // }
        if(input.includes('a') || input.includes('d')){            
            this.player.setState(states.walking, 1) // int val of 0
            console.log(`State: walking - ${states.walking}`)            
        }
        else if(this.player.frameX == 5){            
            this.player.setState(states.idle, 0) // int val of 1
            console.log (`State: idle - ${states.idle}`)
            
        }
    }
}


/*
this.playerState = 'idle'
this.spriteAnimations = []
this.animationStates = [
    {
        name: 'walk',
        numFrames: 6
    },
    {
        name: 'idle',
        numFrames: 4
    },             
    {
        name: 'run',
        numFrames: 3
    },
    {
        name: 'attack',
        numFrames: 4
    },
    {
        name: 'block',
        numFrames: 6
    },
    {
        name: 'damage',
        numFrames: 3
    },
    {
        name: 'death',
        numFrames: 5
    },
    {
        name: 'emote',
        numFrames: 6
    }
]

// initializing the spriteAnimations arr
this.animationStates.forEach((state, index)=>{
    let frames = {
        loc: []
    }
    for(let j=0; j<state.numFrames; j++){
        let positionX = j * this.width
        let positionY = index * this.height

        frames.loc.push({x: positionX, y: positionY})
    }

    this.spriteAnimations[state.name] = frames
    console.log(this.spriteAnimations)
})

*/