const canvas = document.querySelector("canvas"),
	toolBtns = document.querySelectorAll(".tool"),
	fillColor = document.querySelector("#fill-color"),
	sizeSlider = document.querySelector("#size-slider"),
	colorBtns = document.querySelectorAll(".colors .option"),
	colorPicker = document.querySelector("#color-picker"),
	clearCanvas = document.querySelector(".clear-canvas"),
	saveImg = document.querySelector(".save-img"),
	ctx = canvas.getContext("2d");

let prevMouseX,
	prevMouseY,
	snapshot,
	isDrawing = false,
	selectedTool = "brush",
	brushWidth = 5,
	selectedColor = "#000";

window.addEventListener("load", () => {
	canvas.height = canvas.offsetHeight;
	canvas.width = canvas.offsetWidth;
});

const drawRect = (e) => {
	if (!fillColor.checked) {
		ctx.strokeRect(
			e.offsetX,
			e.offsetY,
			prevMouseX - e.offsetX,
			prevMouseY - e.offsetY
		);
	}
	ctx.fillRect(
		e.offsetX,
		e.offsetY,
		prevMouseX - e.offsetX,
		prevMouseY - e.offsetY
	);
};

const drawCircle = (e) => {
	ctx.beginPath();
	let radius = Math.sqrt(
		Math.pow(prevMouseX - e.offsetX, 2) +
			Math.pow(prevMouseY - e.offsetY, 2)
	);
	ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
	fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDrawing = (e) => {
	isDrawing = true;
	prevMouseX = e.offsetX;
	prevMouseY = e.offsetY;
	ctx.beginPath();
	ctx.lineWidth = brushWidth;
	snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const Drawing = (e) => {
	if (!isDrawing) return;
	ctx.putImageData(snapshot, 0, 0);
	if (selectedTool === "brush") {
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
	} else if (selectedTool === "rectangle") {
		drawRect(e);
	} else if (selectedTool === "circle") {
		drawCircle(e);
	} else if (selectedTool === "triangle") {
        drawTriangle(e);
    }
};

toolBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		document.querySelector(".options .active").classList.remove("active");
		btn.classList.add("active");
		selectedTool = btn.id;
		alert(selectedTool);
	});
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", Drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false));
