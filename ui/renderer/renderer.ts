import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export class Renderer {
	protected scene: THREE.Scene = new THREE.Scene();
	protected camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	protected domElement: HTMLElement;
	protected renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();

	protected ambientLight: THREE.AmbientLight = new THREE.AmbientLight(
		0x555555
	);
	protected toneMapping: THREE.ToneMapping = THREE.LinearToneMapping;
	protected toneMappingExposure = 1;

	protected stats: Stats = new Stats();
	protected statsElement: HTMLElement;
	protected clock: THREE.Clock;
	protected controls: FlyControls;

	public constructor() {
		// Create render context
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.domElement = document.body.appendChild(this.renderer.domElement);
		window.addEventListener('resize', this.onResize.bind(this));

		this.renderer.toneMapping = this.toneMapping;
		this.renderer.toneMappingExposure = this.toneMappingExposure;

		this.clock = new THREE.Clock();

		// Create scene
		this.scene.add(this.ambientLight);
		this.camera.position.z = 5;
		this.createScene();

		// Create stats
		this.createStats();

		// Create controls
		this.createControls();

		// Start
		this.frame();
	}

	public dispose() {
		window.removeEventListener('resize', this.onResize.bind(this));
		this.stats.end();
		this.statsElement.remove();
		this.renderer?.dispose();
		this.domElement?.remove();
	}

	protected createScene() {}

	protected createStats() {
		this.stats.dom.style.top = '0';
		this.stats.dom.style.left = 'unset';
		this.stats.dom.style.right = '0';
		this.statsElement = this.domElement?.parentElement
			? this.domElement.parentElement.appendChild(this.stats.dom)
			: this.domElement.appendChild(this.stats.dom);
	}

	protected createControls() {
		this.controls = new FlyControls(
			this.camera,
			<HTMLElement>(<any>document)
		);
		this.controls.movementSpeed = 10;
		this.controls.rollSpeed = Math.PI / 2;
		this.controls.autoForward = false;
		this.controls.dragToLook = true;
	}

	protected frame() {
		const delta = this.clock.getDelta();

		this.animate();
		this.controls.update(delta);
		this.renderer.render(this.scene, this.camera);
		this.stats.update();
		requestAnimationFrame(this.frame.bind(this));
	}

	protected animate() {}

	protected onResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}
