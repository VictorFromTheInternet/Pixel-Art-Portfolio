
class Caption{

    constructor(){
        this.notesArr = [            
            {
                "date":"",
                "timestamp":"",
                "content":"👋 Howdy, my name is Victor Arreola, welcome to my portfolio! <br><br> Use WASD to control the character <br> Use Mouse or Arrow keys to control the captions"
            },
            {
                "date":"",
                "timestamp":"",
                "content":"I am a Full Stack Web Developer from Texas and my passion is to make lives easier. "
            },
            {
                "date":"",
                "timestamp":"",
                "content":" I am looking for web development related positions, and believe my previous work history demonstrates that my skillset is suitable for many business use-cases . . ."
            },
            {
                "date":"Here's some of my skills . . .",
                "timestamp":"",
                "content":`
                
                    JavaScript, TypeScript,
                    HTML, CSS,
                    React,
                    Node.js (Express),
                    Python (Fast API),
                    Git, GitHub,
                    MongoDB,
                    SQL (MS SQL Server),
                    Swagger, Insomnia,
                    Figma,
                    Unqork,
                    Microsoft Power Apps,
                    and Microsoft Power Automate


                `
            },
            {
                "date":"Here's some of my work history (next card) . . .",
                "timestamp":"",
                "content":`                

                `
            },
            {
                "date":"Guaranty Bank & Trust (2022 - Present)",
                "timestamp":"Application Developer ",
                "content":"As a part of the Information Technology and Business Systems Management departments, I helped to improve several processes for the bank’s internal functions. My work primarily involved developing and maintaining In-house/Internal business applications, as well as migrating legacy applications onto newer platforms . . ."
            },
            {
                "date":"Guaranty Bank & Trust (2022 - Present)",
                "timestamp":"Application Developer ",
                "content":"While at Guaranty, I worked with the Microsoft Power Apps and Unqork development platforms, both of which are low-code solutions for full-stack web development . . ."
            },
            {
                "date":"Guaranty Bank & Trust (2022 - Present)",
                "timestamp":"Application Developer ",
                "content":"I’ve used the following patterns and implementations consistently for many projects: Multi-step forms, Dashboards, Role-based access control, REST APIs, SOAP APIs, Excel exports, PDF exports, CRON scheduled tasks, Sendgrid integrations, Twilio integrations, DocuSign integrations, and Fiserv Integrations (Precision & Director)"
            },
            {
                "date":"Here's some of my degrees and certifications (next card) . . .",
                "timestamp":"",
                "content":`                

                `
            },
            {
                "date":"Northeast Texas Community College (2022)",
                "timestamp":"Associate of Science - Computer Science",
                "content":"Studied the fundamentals of computer science and theory. The languages studied within the degree were: Java and C++ (D.S. Malik)"
            },
            {
                "date":"Northeast Texas Community College (2022)",
                "timestamp":"Computer Programming Certificate",
                "content":"Studied Functional and Object-Oriented programming as well as Data Structures and Algorithm design: Java and C++ (D.S. Malik)"
            },
            {
                "date":"FreeCodeCamp (2025)",
                "timestamp":"Backend Development & APIs Certificate",
                "content":"Studied server side programming with Node, Express, MongoDb. The certification projects included: URL Shortener Microservice, Exercise Tracker, and File Metadata Microservice."
            },            
            {
                "date":"",
                "timestamp":"",
                "content":`
                    Thats All Folks! <br><br> 
                    Heres where you can find me: <br>
                    <a style="color: white;" href="https://www.linkedin.com/in/victor-from-the-internet">LinkedIn</a> -
                    <a style="color: white;" href="https://github.com/victorfromtheinternet">GitHub</a> -
                    <a style="color: white;" href="mailto:victorfromtheinternet.dev@gmail.com">Email</a> 
                `
            },
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