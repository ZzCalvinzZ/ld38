import {CircleBase} from 'main/objects/base';
import {getTexture} from 'main/utils';

class Planet extends CircleBase {
	name = 'planet';

	get texture() {
		return getTexture(this.name);
	}

	constructor({x=0, y=0, radius=100, scene=null}) {
		super(scene);
		this.radius = radius;

		this.createSprite();
		this.setPosition(x, y);

		this.sprite.hitArea = new PIXI.Circle(this.x, this.y, this.radius);
	}

	//position based on center of the planet instead of top left
	setPosition(x, y) {
		super.setPosition(x - this.radius, y - this.radius);
	}
}

module.exports = Planet;


