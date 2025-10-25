import {Walking, Idle, Jump, Emote} from './playerStates.js'


/*

    todo:
    - track direction left/right
    - flip the sprite direction ( ctx.scale(-1,1) )
    - background should move in the opposite direction of the player    

*/


export class Player{
    constructor(game, scale, sWidth, sHeight){
        this.game = game    
        this.scale = scale
        this.sWidth = sWidth
        this.sHeight = sHeight

        this.floorPadding = 50     
        //this.floorPadding = 0   

        this.width = this.sWidth * this.scale
        this.height = this.sHeight * this.scale
        this.x = 0
        this.y = this.game.height - (this.height + this.floorPadding)

        this.currDirection = "right"
        this.lastDirection = "left"

        this.speed = 0
        this.maxSpeed = 3 // in pixels per frame
        this.vy = 0
        this.weight = 1

        this.image = document.getElementById('player')
        this.states = [
            new Walking(this),
            new Idle(this),
            new Jump(this),
            new Jump(this), // strike
            new Jump(this), // block
            new Jump(this), // damage
            new Jump(this), // death            
            new Emote(this)
        ]
        this.currentState = this.states[2] // default jump
        this.currentState.enter()

        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 3 // num frames for idle is 4
        this.fps = 6
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0 // will count global frames, and loop from 0-frameInterval 

    }

    update(input, deltaTime){
        this.currentState.handleInput(input)


        // update direction and speed (left, right)
        if(input.includes('d')){
            this.speed = this.maxSpeed
            this.game.speed = 1 // move bg left when going right

            this.lastDirection = "left"
            this.currDirection = "right"            
        }
        else if(input.includes('a')){
            this.speed = -1 * this.maxSpeed
            this.game.speed = -1 // move bg right when going left

            this.lastDirection = "right"
            this.currDirection = "left"            
        }
        else{
            this.speed = 0
            this.game.speed = 0 // idle
        }
        

        // x - horizontal movement
        this.x += this.speed
        

        //x -  boundaries <>
        if(this.x < 0)
            this.x = 0
        if(this.x > this.game.width - this.width)
            this.x = this.game.width - this.width

        // y - vertical movement ^v
        this.y += this.vy        
        if(this.onGround() == false) // apply gravity, upward force applied in enter() for jump state
            this.vy += this.weight
        else
            this.vy = 0


        // animation
        if(this.frameTimer > this.frameInterval ){
            this.frameTimer = 0 // reset global frame counter

            // change current sprite frame
            if(this.frameX < this.maxFrame)
                this.frameX++
            else 
                this.frameX = 0
        }
        else{
            this.frameTimer += deltaTime
        }
        

    }
    onGround(){
        return this.y >= this.game.height - (this.height + this.floorPadding)
    }

    setState(state,speed){ // called in state handler
        this.currentState = this.states[state] // state is an int val        
        this.currentState.enter()
    }

    draw(ctx){ // called in main
        // ctx.fillStyle = 'red'
        // ctx.fillRect(   this.x,
        //                 this.y,
        //                 this.width,
        //                 this.height
        // )
        
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        let sx = this.frameX * this.sWidth
        let sy = this.frameY * this.sHeight         
        
        ctx.save()
        
        if(this.currDirection == "left"){            
            ctx.scale(-1,1)
            ctx.drawImage(  
                this.image,
                sx,
                sy,
                this.sWidth,
                this.sHeight,
                -this.x - this.width,
                this.y ,
                this.width ,
                this.height
            )
        }
        else if(this.currDirection == "right"){
            ctx.drawImage(  
                this.image,
                sx,
                sy,
                this.sWidth,
                this.sHeight,
                this.x ,
                this.y ,
                this.width ,
                this.height
            )
        }        
        
        ctx.restore()

    }

}

/*
class Player{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight - 24

        // w = 54
        // h = 72
        this.width = 72
        this.height = 47.5

        this.x = 0
        this.y = this.gameHeight - this.height

        this.frameX = 0
        this.frameY = 0

        this.speed = 0
        this.vy = 0
        this.gravity = 1

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

        this.staggerFrame = 10            

        this.image = document.getElementById('player')
    }
    draw(context){
        // context.fillStyle = 'white'            
        // context.fillRect(this.x, this.y, this.width, this.height)          
        
        let position = Math.floor(GAME_FRAME / this.staggerFrame) % this.spriteAnimations[this.playerState].loc.length
        // console.log(position)

        this.frameX = this.width * position
        this.frameY = this.spriteAnimations[this.playerState].loc[position].y
        // console.log(this.frameX)

        
        context.drawImage(  this.image, 
                            this.frameX, 
                            this.frameY, 
                            this.width, this.height, 
                            this.x, 
                            this.y, 
                            this.width, 
                            this.height)
    }
    update(input){                        

        // movement
        if(input.keys.indexOf('ArrowRight') > -1){
            this.speed = 3
            GLOBAL_X_VAL += 1
            // console.log(GLOBAL_X_VAL)
        }else if(input.keys.indexOf('ArrowLeft') > -1){
            this.speed = -3
            
            if(GLOBAL_X_VAL > 0)
                GLOBAL_X_VAL -= 1

            // console.log(GLOBAL_X_VAL)
        }else if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
                this.vy -= 10
        }else{
            this.speed = 0
        }
        

        // boundaries X       
        this.x += this.speed
        if(this.x < 0) 
            this.x = 0
        else if(this.x > this.gameWidth - this.width)
            this.x = this.gameWidth - this.width
        
        // boundaries Y       
        this.y += this.vy
        if(this.onGround() == false){ // apply gravity
            this.vy += this.gravity
        }
        if(this.y > this.gameHeight - this.height){
            this.y = this.gameHeight - this.height
        }
        

    }
    onGround(){
        return this.y >= this.gameHeight - this.height
    }
}
*/