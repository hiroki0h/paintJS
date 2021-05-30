const canvas = document.getElementById('jsCanvas');
const range = document.getElementById('jsRange');
const colors = document.getElementsByClassName('jsColor');
const mode = document.getElementById('jsMode');
const saveButton = document.getElementById('jsSave');

const ctx = canvas.getContext('2d');
const defaultSize = 700;
const defaultColor = '#fff';
canvas.width = defaultSize;
canvas.height = defaultSize;
ctx.lineWidth = range.value;
ctx.strokeStyle = '#2c2c2c';

ctx.fillStyle = defaultColor;
ctx.fillRect(0,0,defaultSize,defaultSize);

let painting = false;
let filling = false;
let color = '#000';
// let clickColor;

// console.log(range.value);
// console.log(colors);
// console.log(Array.from(colors));

startPainting = () => {
    painting = true;
};
stopPainting = () => {
    painting = false;
};
onMouseMove = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
};
handleColorClick = (e) => {
    color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    console.log(color);
};
handleFillClick = () => {
    if(!filling){
        console.log('color',color);
        ctx.fillStyle = color;
        ctx.fillRect(0,0,defaultSize,defaultSize);
        mode.innerText = 'Paint';
        filling = true;
    }else{
        mode.innerText = 'Fill';
        filling = false;
    }
};
handleRangeChange = (e) => {
    const size = e.target.value;
    ctx.lineWidth = size;
};
handleCanvasClick = () => {
    // console.log(mode);
    if(filling){
        ctx.fillStyle = color;
        ctx.fillRect(0,0,defaultSize,defaultSize);
        console.log(mode);
    }
};
handleContextmenu = (e) => {
    e.preventDefault();
};
handleSaveClick = () => {
    const image = canvas.toDataURL();
    const data = Date.now();
    const link = document.createElement('a');
    link.href = image;
    link.download = `🎨${data}`;
    link.click();
};

if(canvas){
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown',startPainting);
    canvas.addEventListener('mouseup',stopPainting);
    canvas.addEventListener('mouseleave',stopPainting);
    mode.addEventListener('click',handleFillClick);
    canvas.addEventListener('click',handleCanvasClick);
    canvas.addEventListener('contextmenu',handleContextmenu);
    saveButton.addEventListener('click',handleSaveClick);
}
if(range){
    range.addEventListener('input',handleRangeChange);
}
Array.from(colors).forEach(color => color.addEventListener('click',handleColorClick));