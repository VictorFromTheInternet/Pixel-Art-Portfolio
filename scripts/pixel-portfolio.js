import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'




//
//  Logic for HTML Canvas and Key input
//
window.addEventListener('load', ()=>{
    console.log('load event')
    const canvas = document.getElementById('gameCanvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = 928
    canvas.height = 793
    // backgroundRatio = w / h 
    // const aspectRatio_width = 928 / 793;    
    // const windowRatio_width = window.innerWidth / window.innerheight
    
    // if(windowRatio_width > aspectRatio_width){
    //     // if window is taller 
    //     canvas.width = window.innerHeight * aspectRatio_width
    //     canvas.height = window.innerHeight 
    // }
    // else{
    //     // if window is wider            
    //     canvas.height = window.innerHeight
    //     canvas.width = canvas.height * aspectRatio_width
    // }    
    
    GAME(canvas, ctx)

})

function GAME(canvas, ctx){

    
    class Game{
        constructor(width, height){
            this.width = width
            this.height = height

            this.speed = 0 // pixels per frame

            // init class instances            
            this.background = new Background(this)
            this.player = new Player(this)
            this.input = new InputHandler()            

        }
        update(deltaTime){
            this.background.update()
            this.background.draw(ctx)
            this.player.update(this.input.keys, deltaTime)                    
        }
        draw(){
            // draw the player
            this.player.draw(ctx) 
        }
    }
    

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0
    console.log(game)

    function animate(timestamp){
        const deltaTime = timestamp - lastTime
        lastTime = timestamp

        // console.log(deltaTime)

        ctx.clearRect(0,0,canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0) // timestamp will be an integer

}

/*
window.addEventListener('load', ()=>{
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d')
    canvas.width = 400;    
    canvas.height = 400;
    // canvas.width = window.innerWidth 
    // canvas.height = window.innerHeight 

    let GLOBAL_X_VAL = 0
    let GAME_FRAME = 0    

    // this will add and remove vals from arr as keys are pressed and released
    class InputHandler{
        constructor(){
            this.keys = [];

            // add keys
            window.addEventListener('keydown', (event)=>{
                // console.log(event.key)
                
                if( event.key == 'ArrowDown' ||
                    event.key == 'ArrowUp' ||
                    event.key == 'ArrowLeft' ||
                    event.key == 'ArrowRight' &&
                    this.keys.indexOf(event.key) == -1
                ){
                    this.keys.push(event.key)
                }
                // console.log(this.keys)
            })
            // remove keys
            window.addEventListener('keyup', (event)=>{                                
                if( event.key == 'ArrowDown' ||
                    event.key == 'ArrowUp' ||
                    event.key == 'ArrowLeft' ||
                    event.key == 'ArrowRight'                     
                ){
                    // this.keys.splice(this.keys.indexOf(event.key), 1) 
                    
                    // current issue - cant jump while moving left/right
                    // try filtering instead of splicing
                    this.keys = this.keys.filter((elm, ind, arr)=>{
                        // console.log(elm)
                        // console.log(event.key)
                        return elm != event.key
                        // return elm != event.key
                    })
                }
            })

        }
    }
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
    class Background{
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById('background')
            this.x = 0
            this.y = 0
            this.width = 1440
            this.height = 480
            this.speed = 1
        }
        draw(context){
            let sx = 0
            let sy = 0
            let sWidth = this.width
            let sHeight = this.height

            let dx = 0
            let dy = 0
            let dWidth = this.width
            let dHeight = this.gameHeight

            // context.drawImage(  this.image, 
            //                     sx, 
            //                     sy, 
            //                     sWidth, 
            //                     sHeight,
            //                     dx + this.width,
            //                     dy,
            //                     dWidth,
            //                     dHeight)
            // context.drawImage(  this.image, 
            //                     sx, 
            //                     sy, 
            //                     sWidth, 
            //                     sHeight,
            //                     dx,
            //                     dy,
            //                     dWidth,
            //                     dHeight)

            context.drawImage(  this.image, 
                                this.x , 
                                this.y, 
                                this.width, 
                                this.gameHeight)
            context.drawImage(  this.image, 
                                this.x + this.width , 
                                this.y, 
                                this.width, 
                                this.gameHeight)
        }
        update(){
            this.x -= this.speed
            if(this.x < 0 - this.width)
                this.x = 0
        }
    }
    class Friend{

    }
    function handleFriends(){

    }
    function displayStatusText(){

    }


    // instances
    const input = new InputHandler()
    const player = new Player(canvas.width, canvas.height)    
    const background = new Background(canvas.width, canvas.height)

    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        background.draw(ctx)
        background.update()
        player.draw(ctx)
        player.update(input)
        
        // check the value of GLOBAL_X_VAL, divide by 100, display on screen        
        // console.log(Math.floor(GLOBAL_X_VAL / 100))
        updateMainCardContent(Math.floor(GLOBAL_X_VAL / 100))



        requestAnimationFrame(animate)

        GAME_FRAME++
    }
    animate()
})
*/








// credit: https://www.youtube.com/watch?v=7JtLHJbm0kA&t=35s