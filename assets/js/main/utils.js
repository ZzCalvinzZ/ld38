let canvasWrapper = 'root';
let stage = new PIXI.Container()

let CANVAS = {
	x: 800,
	y: 800
}

let renderer = PIXI.autoDetectRenderer(
	CANVAS.x, CANVAS.y,
	{
		antialias: false,
		transparent: false,
		resolution: 1,
		autoResize: true,
	}
);

document.getElementById(canvasWrapper).appendChild(renderer.view);

let textures = {}
let sounds = {}

let getTexture = name => {
	let texture = textures[name];

	if (texture) {
		return texture;
	} else {
		throw 'no texture with that name';
	}

};

let getSound = name => {
	let sound = sounds[name];

	if (sound) {
		return sound;
	} else {
		throw 'no sound with that name';
	}

};

let toRadians = (angle) => {
	return angle * (Math.PI / 180);
}

let getRandomPointOnPerimeter = () => {
	let width = CANVAS.x;
	let height = CANVAS.y;
	let pos = {};
	
	let p = Math.floor((Math.random() * (width + width + height + height)));

	if (p < (width + height)) {
		if ( p < width ) {
			pos.x = p;
			pos.y = 0;
		} else {
			pos.x = width;
			pos.y = p - width;
		}
	} else {
		p = p - (width + height);
		if (p < width) {
			pos.x = width - p;
			pos.y = height;
		} else {
			pos.x = 0;
			pos.y = height - (p - width);
		}
	}

	return pos;
}

module.exports = {
	imagePath: filename => `static/img/${filename}`,
	soundPath: filename => `static/sound/${filename}`,
	stage: stage,
	textures: textures,
	getTexture: getTexture,
	getSound: getSound,
	sounds: sounds,
	CANVAS: CANVAS,
	renderStage: () => renderer.render(stage),
	toRadians: toRadians,
	getRandomPointOnPerimeter: getRandomPointOnPerimeter
};
