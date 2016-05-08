function objSkybox(p) {
	// this.cubemap = THREE.ImageUtils.loadTextureCube(this.urls); // load textures
	// this.cubemap.format = THREE.RGBFormat;

	this.shader = THREE.ShaderLib['cube'];
	this.shader.uniforms['tCube'].value = window.res.mdl.skybox.cubemap;

	this.skyBoxMaterial = new THREE.ShaderMaterial({
		fragmentShader: this.shader.fragmentShader,
		vertexShader: this.shader.vertexShader,
		uniforms: this.shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	this.skybox = new THREE.Mesh(
		new THREE.BoxGeometry(1000, 1000, 1000),
		this.skyBoxMaterial
	);

	p.scene.add(this.skybox);
	
	this.update = function(p) {};
	this.remove = function(p) {};
}