
//
//  Animations
//
// 64w x 80h (4 col, 5 rows) 
// 16w x 16h
// front
// backwards
// right
// left
// idle
const states = {
    walking: 0,
    idle: 1,    
}

class State{
    constructor(state){
        this.state = state
    }
}

// default state 
// handleInput reacts to: left, right, default is idle
export class Idle extends State{
    constructor(player){
        super('idle')
        this.player = player // assigning an instance of a player class
    }
    enter(){      
        this.player.frameX = 0  
        this.player.maxFrame = 3 // 4 frames
        this.player.frameY = 4        
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
// handleInput reacts to: left, right, default is idle
export class Walking extends State{
    constructor(player){
        super('walking')
        this.player = player // assigning an instance of a player class
    }
    enter(){       
        this.player.frameX = 0 
        this.player.maxFrame = 3 // 4 frames
        this.player.frameY = 2        
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
