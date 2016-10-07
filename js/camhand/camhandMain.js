function camhandMain(p) {
	p.camera.position.set(
		1,
		1,
		1
	);

	this.controls = new THREE.OrbitControls(p.camera, game.renderer.domElement)
	this.controls.enableZoom = false;
	this.controls.enablePan = false;
	// this.controls.enableRotate = false;
	this.controls.enableDamping = true;
	this.controls.dampingFactor = 0.05;
	this.controls.rotateSpeed = 0.025;
	this.controls.autoRotate = true;
	this.controls.autoRotateSpeed = 0.015;
	this.controls.update();

	this.focus = function(p, time, position, zoom) {
		this.targetPrev = this.controls.target.clone();
		this.targetNext = position;

		this.zoomPrev = p.camera.zoom;
		this.zoomNext = zoom;

		this.timeTotal = time;
		this.timeCurrent = 0;
	};

	this.ease = function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t };

	this.update = function(p) {
		this.controls.update();

		if (this.timeCurrent < this.timeTotal) {
			this.timeCurrent++;
			var pNext = this.ease(this.timeCurrent/this.timeTotal);
			var pPrev = 1 - pNext;

			this.controls.target.set(
				(pPrev * this.targetPrev.x) + (pNext * this.targetNext.x),
				(pPrev * this.targetPrev.y) + (pNext * this.targetNext.y),
				(pPrev * this.targetPrev.z) + (pNext * this.targetNext.z)
			);

			p.camera.zoom = (pPrev * this.zoomPrev) + (pNext * this.zoomNext);
			p.camera.updateProjectionMatrix();
		}
	};
}