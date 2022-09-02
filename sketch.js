let button;
let pixels = [];

const funcInput = document.querySelector(".input");
const perfreport = document.querySelector(".perfreport");
const selectedType = document.querySelector('input[name="type"]:checked');

const pixelSize = 5;
const canvasSize = 400;


class pixel {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = 0;
	}
}

for (let x = 0; x < canvasSize / pixelSize; x++) {
	for (let y = 0; y < canvasSize / pixelSize; y++) {
		let pix = new pixel(x * pixelSize, y * pixelSize);
		pixels.push(pix);
	}
}

function setup() {
	createCanvas(canvasSize, canvasSize);
	noStroke();
	noFill();
	button = createButton('apply shader');
	button.position(canvasSize + 40, canvasSize / 2 + 40);
	button.mousePressed(applyShader);
}

function applyShader() {
	const shader = funcInput.innerText.replaceAll('\t', '').replaceAll('\n', '');
	const type = selectedType.value;
	const t0 = performance.now();
	pixels.forEach(pixel => {
		pixel.color = getShaderValue(pixel.x, pixel.y, shader);
		pixel.color *= type;
		renderPixel(pixel);
	});

	const t1 = performance.now();
	perfreport.innerText = `Shader rendered in ${t1-t0} ms`;
}

function getShaderValue(x, y, shader) {
	return eval(shader.replaceAll("x", x).replaceAll("y", y));
}

function renderPixel(pixel) {
	fill(pixel.color);
	rect(pixel.x, pixel.y, pixelSize, pixelSize);
}
