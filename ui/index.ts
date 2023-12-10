import { Renderer } from './renderer';
import * as THREE from 'three';

class LevelRenderer extends Renderer {
	protected cube: THREE.Mesh;

	createScene() {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube);
	}

	animate() {
		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;
	}
}

const renderer = new LevelRenderer();
