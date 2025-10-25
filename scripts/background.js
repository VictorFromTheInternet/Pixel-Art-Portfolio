

class Layer{
    constructor(game, width, height, speedModifier, image){
        this.game = game
        this.width = width
        this.height = height
        this.speedModifer = speedModifier
        this.image = image   

        this.x = 0
        this.y = 0

        this.sx = 0
        this.sy = 0
        this.sWidth = 928
        this.sHeight = 793
    }
    update(){

        // using absolute value for speed calc
        const moveSpeed = Math.abs(this.game.speed) * this.speedModifer


        if(this.game.speed > 0){
            // player moving right, bg moves left
            this.x -= moveSpeed

            // reset layer back in place, on the righthand side of screen
            // (gap will be covered by second image)
            if (this.x < -this.width)
                this.x = 0

        }
        else if(this.game.speed < 0){
            // player moving left, bg moves right
            this.x += moveSpeed
            if(this.x > 0)
                this.x = -this.width

        }
        // else (game speed == 0) the bg doesnt move                


    }
    draw(context){
        context.drawImage(  this.image, 
                            this.sx,
                            this.sy,
                            this.sWidth,
                            this.sHeight,
                            this.x,
                            this.y,
                            this.width,
                            this.height
        )

        // 2nd image to cover gap when 1st is off screen
        context.drawImage(  this.image, 
                            this.sx,
                            this.sy,
                            this.sWidth,
                            this.sHeight,
                            this.x + this.width,
                            this.y,
                            this.width,
                            this.height
        )

    }

}

export class Background{

    constructor(game){
        this.game = game
        this.width = game.width
        this.height = game.height

        // layer9 - grass shadow
        // layer8 - grass
        // layer7 - treetops
        // layer6 - bushes
        // layer4_lights
        // layer5 - trees & bushes
        // layer4 - trees shadow 3
        // layer7_lights
        // layer3 - trees shadow 2
        // layer2 - trees shadow
        // layer1 - sky 2
        // layer0 - sky        
        this.layer9_image = document.getElementById('layer9')
        this.layer8_image = document.getElementById('layer8')
        this.layer7_image = document.getElementById('layer7')
        this.layer6_image = document.getElementById('layer6')
        this.layer4_lights_image = document.getElementById('layer4_lights')
        this.layer5_image = document.getElementById('layer5')
        this.layer4_image = document.getElementById('layer4')
        this.layer7_lights_image = document.getElementById('layer7_lights')
        this.layer3_image = document.getElementById('layer3')
        this.layer2_image = document.getElementById('layer2')
        this.layer1_image = document.getElementById('layer1')
        this.layer0_image = document.getElementById('layer0')
        // console.log(this.layer1_image)


        // speed - 
        this.layer9 = new Layer(this.game, this.width, this.height, 1, this.layer9_image)        
        this.layer8 = new Layer(this.game, this.width, this.height, 1, this.layer8_image)
        this.layer7 = new Layer(this.game, this.width, this.height, 1, this.layer7_image)
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layer1_image)
        this.layer0 = new Layer(this.game, this.width, this.height, 1, this.layer0_image)

        this.layer6 = new Layer(this.game, this.width, this.height, .75, this.layer6_image)
        this.layer4 = new Layer(this.game, this.width, this.height, .75, this.layer4_image)

        this.layer5 = new Layer(this.game, this.width, this.height, .5, this.layer5_image)     
        this.layer3 = new Layer(this.game, this.width, this.height, .5, this.layer3_image)
        
        this.layer2 = new Layer(this.game, this.width, this.height, .25, this.layer2_image)  
        this.layer4_lights = new Layer(this.game, this.width, this.height, .25, this.layer4_lights_image)           
        this.layer7_lights = new Layer(this.game, this.width, this.height, .25, this.layer7_lights_image)
                      

        this.backgroundLayers = [
            this.layer0,
            this.layer1,
            this.layer2,
            this.layer3,
            this.layer7_lights, 
            this.layer4,  
            this.layer5,  
            this.layer4_lights,
            this.layer6, 
            this.layer7,
            this.layer8,     
            this.layer9                                                                                         
        ]
    }

    update(){
        this.backgroundLayers.forEach(layer =>{
            layer.update()
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer =>{
            layer.draw(context)
        })
    }
}