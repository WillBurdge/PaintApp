const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');
const undoBtn = document.getElementById('undo-btn');
const saveBtn = document.getElementById('save-btn');
const sprayCanOption = document.querySelector('.spray-can');
const paintBrushOption = document.querySelector('.paint-brush');
const penOption = document.querySelector('.pen');
const pencilOption = document.querySelector('.pencil');

let currentTool = 'pencil';
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = '#000000';
let currentBrushSize = 5;
let undoStack = [];

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = currentBrushSize;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  undoBtn.disabled = false;
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

undoBtn.addEventListener('click', () => {
  if (undoStack.length > 1) {
    undoStack.pop();
    ctx.putImageData(undoStack[undoStack.length - 1], 0, 0);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undoStack.pop();
    undoBtn.disabled = true;
  }
});

saveBtn.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL();
  const link = document.createElement('a');
  link.download = 'painting.png';
  link.href = dataUrl;
  link.click();
});

sprayCanOption.addEventListener('click', () => {
  currentTool = 'sprayCan';
  currentBrushSize = 20;
  currentColor = '#000000';
});

paintBrushOption.addEventListener('click', () => {
  currentTool = 'paintBrush';
  currentBrushSize = 10;
  currentColor = '#000000';
});

penOption.addEventListener('click', () => {
  currentTool = 'pen';
  currentBrushSize = 5;
  currentColor = '#000000';
});

pencilOption.addEventListener('click', () => {
  currentTool = 'pencil';
  currentBrushSize = 2;
  currentColor = '#000000';
});

