let container = document.querySelector('.container');
let size = container.offsetWidth;
let clearBtn = document.querySelector('button#clear'); 
let newBtn = document.querySelector('button#new')
let greyBtn = document.querySelector('button#grey');
let colorBtn = document.querySelector('button#color');
let main = document.querySelector('.main');
let input;
let num;
let rowCount;
let rowHeight;


squareNumber();
clearBtn.onclick = function(){clearScreen();}
newBtn.onclick = function(){newScreen();}
greyBtn.onclick = function(){greyScale();}
colorBtn.onclick = function(){randomColors();};
    

function squareNumber() {
    
    do {

    var squares = parseInt(prompt('How many squares would you like per row?(1-100)'), 10);

    } while (squares == NaN || squares == undefined || squares < 0 || squares > 100);
        
    input = squares;
    num = (650/input) + 'px';
    rowCount = Math.ceil(input*.54);  
    rowHeight = (360/rowCount) + 'px'; 
    makeRows();

}

function makeRows() {           
    
    for (let i = 0;i < rowCount;++i)  {
        
        let row = document.createElement('div');
        
        row.classList.add('rowStyle');
        row.style.height = rowHeight;        
        container.appendChild(row);
        makeSquares();
    }  
}

function makeSquares() {
    
    for (let i = 0;i < input;++i) {

        let lastRow = document.querySelector('.container').lastChild;
        let square = document.createElement('div');
        
        square.classList.add('squareStyle');
        square.style.height = rowHeight;        
        square.style.width = num;
        
            square.addEventListener('mouseenter', function(){               
                
                if(this.style.backgroundColor == 'rgb(166, 166, 166)' || this.style.backgroundColor == '') {
                    if(colorBtn.className == 'selected'){
                        this.style.background = randomRgb();
                    } else if(greyBtn.className == 'selected'){
                        this.style.background = randomGrey();
                    }
                } 
                else if (greyBtn.className == 'selected' || colorBtn.className == 'selected') {                    

                        let value = getComputedStyle(this);                 
                        let shade = value.filter; 
                        let array = shade.split('');
                        let parsed;
                        let newValue;                                   
                        
                        array.splice(0, 11);
                        parsed = (parseFloat(array.join('')));
                        newValue = 'brightness(' + (parsed - .1) + ')';
                        this.style.filter = newValue;
                        
                };    
                
            });
        
        lastRow.appendChild(square);
    }    
}

function clearScreen() {
       
    shakeClean();
  
    
        let squares = document.querySelectorAll('.container > div > div');

        for(i=0; i<squares.length; ++i){

            squares[i].style.background = 'rgb(166, 166, 166)';            
            squares[i].style.filter = 'brightness(1)';            
        }    
        document.addEventListener('animationend', function(){
            main.classList.remove('shake');
        })
    
}

function newScreen() {
    newBtn.classList.add('.turn');
    let rows = document.querySelectorAll('.container > div');

    for(i=0; i<rows.length; ++i) {

        rows[i].remove();

    }
    colorBtn.classList.replace('selected', 'disabled');
    greyBtn.classList.replace('selected', 'disabled');
    squareNumber();
}

function greyScale() {
    
    if (colorBtn.className == 'selected') {

        greyBtn.classList.replace('disabled', 'selected');
        colorBtn.classList.replace('selected', 'disabled'); 
        
        clearScreen();
    }     
    else if (greyBtn.className == 'disabled') {
       
        greyBtn.classList.replace('disabled', 'selected');
        colorBtn.classList.replace('selected', 'disabled');  

    }

}

function randomColors() {
   
    if (greyBtn.className == 'selected') {
        
        colorBtn.classList.replace('disabled', 'selected');
        greyBtn.classList.replace('selected', 'disabled');  
        
        clearScreen();

    }
    else if (colorBtn.className == 'disabled') {
    
        colorBtn.classList.replace('disabled', 'selected');
        greyBtn.classList.replace('selected', 'disabled'); 

    }

}

function random() {
    
    return parseInt(Math.random() * 256);

}

function randomRgb(){

    let r = random();
    let g = random();
    let b = random();
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
   
}

function randomGrey(){
    
    let greyNum = parseInt(Math.random() * 256);
    let r = greyNum;
    let g = greyNum;
    let b = greyNum;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';

}

function shakeClean(){
    
    main.classList.add('shake');
    
}



