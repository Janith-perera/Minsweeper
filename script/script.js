const gameBoard = document.querySelector("#gameBoard")
let gameBombArray=[]
let gameCellArray=[]
window.addEventListener('load',function(e){
    let boardCells=''
    for(i=0; i<8; i++){
        for(j=0; j<8; j++){
            const cellob=new Cell(i,j)
            boardCells=boardCells + cellob.createEl()
            gameCellArray[cellob.index]=cellob
        }
    }
    gameBoard.innerHTML=boardCells
    boardReady()
})
function boardBombPlace(){
    let bArray=[]
    let bStart=0
    while(bStart<9){
        rand_no=Math.floor(Math.random() * 64);
        if(!bArray.includes(rand_no)){
            bArray.push(rand_no)
            bStart++
        }
    }
    bArray.forEach(index=>{
        gameCellArray[index].placeBomb()
        console.log("index :"+index)
    })
}
function boardReady(){
    const gameCells= document.querySelectorAll(".board-cell")
    let index=0
    gameCells.forEach((cell)=>{
        gameCellArray[index++].intEl(cell)
    })
    boardBombPlace()
}
class Cell { 
    constructor(i,j){
        this.i=i
        this.j=j
        this.index=i*8+j
        this.cellStatus='covered'
        this.cellNumber=0
    }
   createEl = ()=>{
        return `<div id='cell_i${this.i}j${this.j}' class="board-cell board-cell-3d"></div>`
   }
   intEl(cellEl){
        this.cellEl=cellEl
        this.cellEl.addEventListener('contextmenu',(e)=>{
            e.preventDefault()
            if(this.cellStatus==='discovered') return
                this.markFlag()         
        })
        this.cellEl.addEventListener('click',(e)=>{
            this.discover()
        })   
   }
   markFlag(){
        if(this.cellStatus==='covered'){
            this.cellStatus='flagged'
            this.cellEl.innerHTML='<div class="flag"><i class="fa fa-golf-flag-hole"></i></div>'
        }else if(this.cellStatus==='flagged'){
            this.cellStatus='unsured'
            this.cellEl.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" fill="green" class="bi bi-patch-question-fill" viewBox="0 0 16 16"><path d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627z"/></svg>'
        }else if(this.cellStatus==='unsured'){
            this.cellStatus='covered'
            this.cellEl.innerHTML=''
        }
        return
    }
    discover(){
        if(this.cellNumber!='bomb'&& this.cellStatus==='covered'){
            console.log(this.cellNumber)
            this.cellStatus='discovered'
            this.discoverNext()
            this.cellEl.classList.remove("board-cell-3d");
            this.cellEl.innerHTML= `<div class="cell-number-container align-middle"><p class="cell-number-text cell-number-${this.cellNumber}"> ${this.cellNumber} </p></div>`
        }else if(this.cellNumber==='bomb'&& this.cellStatus==='covered'){
            this.cellEl.innerHTML= `<div class="cell-number-container align-middle"><p class="cell-number-text cell-number-${this.cellNumber}"> <i class="fas fa-bomb"></i></div>`
            this.cellStatus='discovered'
            this.cellEl.classList.add("board-cell-bomb")
            this.cellEl.classList.remove("board-cell-3d")
            return true
        }           
    }
    setNumber(cellNumber){
        this.cellNumber=cellNumber
    }
    placeBomb(){
        this.cellNumber='bomb'
        console.log('bomb placed')
        this.increaseNumberNext()
    }
    increaseNumber(){
        console.log('increase called'+ this.i +' '+this.j)
        if(this.cellNumber==='bomb')
            return
        ++this.cellNumber
    }
    increaseNumberNext(){
        this.cellDoThis('increaseNo')       
    }
    discoverNext(){
        this.cellDoThis('discover')     
    }
    cellDoThis(whtDo){
        if(this.cellNumber==0 || whtDo=='increaseNo'){
            console.log('discoverNext Called')
            if(this.i!=0){
                let nextI=this.i-1
                if(this.j!=0){
                    let nextJ=this.j-1
                    let nextCell=nextI*8+nextJ
                   if(whtDo=='discover'){
                        gameCellArray[nextCell].discover()
                   }else if(whtDo=='increaseNo'){
                        gameCellArray[nextCell].increaseNumber()
                        console.log('increaseNumber has called')
                   }
                    console.log(gameCellArray[nextCell])
                }
                let nextJ=this.j
                let nextCell=nextI*8+nextJ
                if(whtDo=='discover'){
                    gameCellArray[nextCell].discover()
                }else if(whtDo=='increaseNo'){
                    gameCellArray[nextCell].increaseNumber()
                }
                console.log(gameCellArray[nextCell])
                if(this.j!=7){
                    let nextJ=this.j+1
                    let nextCell=nextI*8+nextJ
                    if(whtDo=='discover'){
                        gameCellArray[nextCell].discover()
                    }else if(whtDo=='increaseNo'){
                        gameCellArray[nextCell].increaseNumber()
                    }
                    console.log(gameCellArray[nextCell])
                }
            }
            let nextI=this.i
            if(this.j!=0){
                let nextJ=this.j-1
                let nextCell=nextI*8+nextJ
                if(whtDo=='discover'){
                    gameCellArray[nextCell].discover()
                }else if(whtDo=='increaseNo'){
                    gameCellArray[nextCell].increaseNumber()
                }
                console.log(gameCellArray[nextCell])
            }
            if(this.j!=7){
                let nextJ=this.j+1
                let nextCell=nextI*8+nextJ
                if(whtDo=='discover'){
                    gameCellArray[nextCell].discover()
                }else if(whtDo=='increaseNo'){
                    gameCellArray[nextCell].increaseNumber()
                }
                console.log(gameCellArray[nextCell])
            }
            if(this.i!=7){
                let nextI=this.i+1
                if(this.j!=0){
                    let nextJ=this.j-1
                    let nextCell=nextI*8+nextJ
                    if(whtDo=='discover'){
                        gameCellArray[nextCell].discover()
                    }else if(whtDo=='increaseNo'){
                         gameCellArray[nextCell].increaseNumber()
                    }
                    console.log(gameCellArray[nextCell])
                }
                let nextJ=this.j
                let nextCell=nextI*8+nextJ
                if(whtDo=='discover'){
                    gameCellArray[nextCell].discover()
                }else if(whtDo=='increaseNo'){
                    gameCellArray[nextCell].increaseNumber()
                }
                console.log(gameCellArray[nextCell])
                if(this.j!=7){
                    let nextJ=this.j+1
                    let nextCell=nextI*8+nextJ
                    if(whtDo=='discover'){
                        gameCellArray[nextCell].discover()
                    }else if(whtDo=='increaseNo'){
                        gameCellArray[nextCell].increaseNumber()
                    }
                    console.log(gameCellArray[nextCell])
                }
            }
        }
    }
}