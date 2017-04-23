import _ from 'underscore';
import {CircleBase} from 'main/objects/base';
import {getTexture, CANVAS, getRandomPointOnPerimeter, b} from 'main/utils';

class Meteor extends CircleBase {
	get texture() {
		return getTexture('meteor');
	}

	constructor({x=0, y=0, scene=null, planet=null}) {
		super(scene);

		this.planet = planet;
		this.radius = this.texture.width / 2;

		//pivot based on bottom middle of feet
		//this.pivot = {
			//x: parseInt(this.radius),
			//y: parseInt(this.radius),
		//};

		({x, y} = this.getStartPosition());

		this.createSprite();

		this.sprite.hitArea = new PIXI.Circle(this.x, this.y, this.radius);

		this.setPosition(x, y);

		[this.sprite.vx, this.sprite.vy] = this.calculateTrajectory();
	}

	calculateTrajectory() {
		let speedFactor = Math.random() * (0.005 - 0.002) + 0.005;

		let x1 = this.x;
		let y1 = this.y;

		let x2 = this.planet.x;
		let y2 = this.planet.y;

		let xt = x2 - x1;
		let yt = y2 - y1;

		return [speedFactor * xt, speedFactor * yt];
	}

	getStartPosition() {
		return getRandomPointOnPerimeter();
	}

	isOutOfBounds() {
		if (
			(this.x < -50) ||
			(this.x > (CANVAS.x + 50)) ||
			(this.y < -50) ||
			(this.y > (CANVAS.y + 50))
		) {
			return true;
		}
	}

	gameLoop({planet=null, player=null}) {
		if (this.isOutOfBounds()) {
			this.removeSprite();
			return 'outofbounds';
		}

		if (player.shielding) {
			console.log(this.sprite.vx, this.sprite.vy);
			if (b.circleRectangleCollision(this.sprite, player.sprite, true)) {
				console.log('blah');
				console.log(this.sprite.vx, this.sprite.vy);
				//this.trajectory.x = -this.trajectory.x;
				//this.trajectory.y = -this.trajectory.y;
			}
		} 

		if (b.circleCollision(this.sprite, planet.sprite)) {
			this.exploding = true;
			return 'gameover';
		}

		if (!this.exploding) {
			let newX = this.x + this.sprite.vx;
			let newY = this.y + this.sprite.vy;
			this.setPosition(newX, newY);
		}

	}
}

module.exports = Meteor;
