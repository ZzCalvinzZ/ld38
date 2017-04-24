import {CANVAS, renderStage, stage, toRadians} from 'main/utils';
import Background from 'main/objects/background';


class BackgroundScene {
	scene = new PIXI.Container();

	constructor() {
		this.setScene();
	}

	setScene() {
		this.background = new Background({
			scene: this.scene,
		});

		stage.addChildAt(this.scene, stage.children.length - 1);
	}


	gameLoop() {

	}

}

module.exports = BackgroundScene;

