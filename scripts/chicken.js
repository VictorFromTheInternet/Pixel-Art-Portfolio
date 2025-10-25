import {Walking, Idle} from './chickenStates.js'

// 64w x 80h (4 col, 5 rows) 
// 16w x 16h
// front
// backwards
// right
// left
// idle

/*

    todo:
    - each chicken follows player movement
    - randomized spacing between chicken
    - chickens move faster the further they are from the player    

*/
export class Chicken{
    constructor(game, scale, sWidth, sHeight, followPlayer = null, flockIndex=0){
        this.game = game    
        this.scale = scale
        this.sWidth = sWidth
        this.sHeight = sHeight
        this.followPlayer = followPlayer // this will be a player class instance
        this.flockIndex = flockIndex

        this.floorPadding = 50             

        this.currDirection = "right"
        this.lastDirection = "left"

        this.width = this.sWidth * this.scale
        this.height = this.sHeight * this.scale
        this.x = Math.random() * (this.game.width - this.width) // randomized 
        this.y = this.game.height - (this.height + this.floorPadding)

        // follow behavior
        this.followDistance = 10 + (flockIndex * 10 )        
        this.followOffsetX = (Math.random() - .5) * 100

        this.speed = 0
        this.maxSpeed = 1 // in pixels per frame
        this.vy = 0
        this.weight = 1

        this.image = document.getElementById('friendChicken')
        this.states = [
            new Walking(this),
            new Idle(this)
        ]
        this.currentState = this.states[1] // default idle
        this.currentState.enter()

        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 3 // num frames for idle is 4
        this.fps = 1
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0 // will count global frames, and loop from 0-frameInterval 

    }

    update(deltaTime){
        if(this.followPlayer){
            this.follow()
        }

        // update position
        this.x += this.speed

        // boundaries <>
        if(this.x < 0) 
            this.x = 0
        if(this.x > (this.game.width - this.width)){
            this.x = this.game.width - this.width
        }

        // animation
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0

            if(this.frameX < this.maxFrame)
                this.frameX++
            else
                this.frameX = 0
        }
        else{
            this.frameTimer += deltaTime
        }



    }

    follow(){
        // calc target position 
        const targetX = this.followPlayer.x + this.followOffsetX

        // calc target distance
        const distanceX = targetX - this.x
        const distance = Math.abs(distanceX) // might need to replace this line w 2d calc later

        // only move if far enough away
        if(distance  > this.followDistance){
            const direction = distanceX > 0 ? 1 : -1

            // Set speed based on distance (faster when further away)
            const speedMultiplier = Math.min(distance / this.followDistance, 2)
            this.speed = direction * this.maxSpeed * speedMultiplier

            // Update facing direction
            this.currDirection = this.speed > 0 ? "right" : "left"

            // Set to walking state
            this.setState(0) // Walking is index 0

        }
        else{
            this.speed = 0
            this.setState(1)
        }



    }
    

    setState(state,speed){ // called in state handler
        this.currentState = this.states[state] // state is an int val
        // this.game.speed = speed
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
