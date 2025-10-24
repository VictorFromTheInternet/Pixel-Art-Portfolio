export class InputHandler{
    constructor(){
        this.keys = [];

        // add keys
        window.addEventListener('keydown', (event)=>{
            // console.log(event.key)
            
            if( (event.key == 'w' ||
                event.key == 'a' ||
                event.key == 's' ||
                event.key == 'd' ||
                event.key == ' ' ||
                event.key == 'ArrowLeft' ||
                event.key == 'ArrowRight') &&
                this.keys.indexOf(event.key) == -1
            ){
                this.keys.push(event.key)
            }
            console.log(this.keys)
        })
        // remove keys
        window.addEventListener('keyup', (event)=>{                                
            if( event.key == 'w' ||
                event.key == 'a' ||
                event.key == 's' ||
                event.key == 'd' ||
                event.key == ' ' ||
                event.key == 'ArrowLeft' ||
                event.key == 'ArrowRight'                    
            ){
                // this.keys.splice(this.keys.indexOf(event.key), 1) 
                
                // current issue - cant jump while moving left/right
                // try filtering instead of splicing
                this.keys = this.keys.filter((elm, ind, arr)=>{                    
                    return elm != event.key                    
                })
            }
        })

    }
}