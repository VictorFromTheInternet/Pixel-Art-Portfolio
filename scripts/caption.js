
class Caption{

    constructor(){
        this.notesArr = [            
            {
                "date":"Friday, October 24th, 2025",
                "timestamp":"5:24 pm CST",
                "content":"Testing stuff out"
            },
            {
                "date":"Friday, October 24th, 2025",
                "timestamp":"5:24 pm CST",
                "content":"Testing stuff out 2"
            }
        ]
        this.mainCaption = document.getElementById('main-caption')
        this.currIndex = 0
        this.updateMainCardContent(this.currIndex)
    }        

    // update the inner html for the caption element
    updateMainCardContent(index){
        this.currIndex = index
        let {date="-", timestamp="-", content="-"} = this.notesArr[index]

        this.mainCaption.querySelector('.timestamp').innerHTML = timestamp
        this.mainCaption.querySelector('.date').innerHTML = date
        this.mainCaption.querySelector('.content').innerHTML = content
    }
    nextCard(){
        if(this.currIndex < this.notesArr.length)
            this.currIndex++
        
        if(this.currIndex >= this.notesArr.length - 1)
            this.currIndex = this.notesArr.length - 1
        
        this.updateMainCardContent(this.currIndex)
    }
    prevCard(){
        if(this.currIndex > 0)
            this.currIndex--
        else if(this.currIndex < 0)
            this.currIndex = 0

        // console.log(this.currIndex)
        this.updateMainCardContent(this.currIndex)
    }
}

// create instances
// const input = new InputHandler()
const caption = new Caption()
console.log(caption)


let keys = [];

// add keys, update caption
window.addEventListener('keydown', (event)=>{
    if( event.key == 'ArrowLeft' && keys.indexOf(event.key) == -1){
        keys.push(event.key)
        caption.prevCard()
    }
    if( event.key == 'ArrowRight' && keys.indexOf(event.key) == -1){
        keys.push(event.key)
        caption.nextCard()
    }
    // console.log(keys)s
})

// remove keys
window.addEventListener('keyup', (event)=>{                                
    if( 
        event.key == 'ArrowLeft' ||
        event.key == 'ArrowRight'                    
    ){
        keys = keys.filter((elm, ind, arr)=>{                    
            return elm != event.key                    
        })
    }
})


let prevBtn = document.querySelector('.caption-buttons .prev')
let nextBtn = document.querySelector('.caption-buttons .next')
// console.log(prevBtn)
// console.log(nextBtn)

prevBtn.addEventListener('click',()=>{
    caption.prevCard()
})
nextBtn.addEventListener('click',()=>{
    caption.nextCard()
})