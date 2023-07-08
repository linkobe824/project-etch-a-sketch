// global reference to elements
const body = document.querySelector('#body');
const gridContainer = document.createElement('div');
gridContainer.classList.add('container');
const gridSizeButton = document.querySelector('.grid-size-btn')
const gridClearButton = document.querySelector('.grid-clear-btn')

function createSquareGrid(size=16){
    for (let i = 0; i < size ; i++){
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row-container');
        for(let j = 0; j < size; j++){
            const square =  document.createElement('div');
            square.classList.add('square');
            rowContainer.appendChild(square);
        }
        gridContainer.appendChild(rowContainer);
    }
    body.appendChild(gridContainer);
    
    activateSquares();
}

function changeSize(){
    let size;
    do{
        size = prompt('Choose Size [1-100] ');
        // close prompt
        if(size === null){
            return;
        }
    }while(size < 1 || size > 100);
    //clear grind Container
    gridContainer.innerHTML = "";

    createSquareGrid(size);
}

function activateSquares(){
    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            if(!square.classList.contains('passed')){
                square.classList.add('passed');
                square.style.background = randomRGBAColor();
            }else{
                square.style.background = increaseAlpha(square);
            }       
        })
    })
}


function randomRGBAColor(){
    let o = Math.round, r = Math.random, s = 255;
    let res = `rgba(${o(r()*s)}, ${o(r()*s)}, ${o(r()*s)}, 0.1)`
    return res
}

function increaseAlpha(element){
    let rgba = element.style.background;
    console.log(rgba)
    let rbgaArr = rgba.slice(5,-1).split(',');
    let alpha = parseFloat(rbgaArr[3])
    if(alpha < 1){
        alpha += 0.1;
    }   
    return `rgba(${parseInt(rbgaArr[0])}, 
            ${parseInt(rbgaArr[1])}, ${parseInt(rbgaArr[2])}, ${alpha})`
}

function clearGrid(){
    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        square.style.background = 'white';
        square.classList.remove('passed');
    })
}


function mainGame(){
    createSquareGrid();
    gridSizeButton.addEventListener('click', changeSize);  
    gridClearButton.addEventListener('click', clearGrid); 
}

mainGame();
