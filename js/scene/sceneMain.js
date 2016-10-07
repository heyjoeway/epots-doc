function sceneMain(p) {
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(45, 1, 1, 3);
	this.camhand = new camhandMain(this);
	
	// ---- LIGHTING ----

	this.ambientLight = new THREE.AmbientLight(0x666666);
	this.scene.add(this.ambientLight);

	this.mainLight = new THREE.DirectionalLight(0xFFFFFF, 1);
	this.mainLight.position.set(0.75, 0.5, 0.25);
	this.mainLight.target.position.set(0, 0, 0);
	this.scene.add(this.mainLight);
	
	var shadowLightProps = {
		castShadow: true,
		shadowDarkness: 0.4,
		shadowCameraTop: 0.5,
		shadowCameraBottom: -0.5,
		shadowCameraLeft: -0.5,
		shadowCameraRight: 0.5,
		shadowCameraNear: 0,
		shadowCameraFar: 1.5,
		shadowCameraFov: 45,
		// shadowCameraVisible: true
	};

	if (!isMobile.any) {
		for (var x in shadowLightProps)
			this.mainLight[x] = shadowLightProps[x];
	}

	this.scene.add(this.mainLight);

	game.renderer.shadowCameraFar = this.camera.far;

	this.shader = new shaderNormal(this);
	
	// ---- OBJECTS ----

	this.domEvents = new THREEx.DomEvents(this.camera, game.renderer.domElement);

	this.objArray = [];

	this.groupFocus = new THREE.Group();
	this.objFocus = {
		"rpi": new objGeneric(
			this, 0, 0, 0,
			window.res.mdl.rpi.geo,
			window.res.mdl.rpi.mat,
			"rpi"
		),	
		"pcb": new objGeneric(
			this, -0.1625, 0.03, -0.095,
			window.res.mdl.pcb.geo,
			window.res.mdl.pcb.mat,
			"pcb"
		),
		"relay": new objGeneric(
			this, -0.015, 0.125, 0.065,
			window.res.mdl.relay.geo,
			window.res.mdl.relay.mat,
			"relay"
		),
		"boost": new objGeneric(
			this, 0.047, 0.13, -0.1795,
			window.res.mdl.boost.geo,
			window.res.mdl.boost.mat,
			"boost"
		),
		"charger": new objGeneric(
			this, -0.28, 0.16, -0.218,
			window.res.mdl.charger.geo,
			window.res.mdl.charger.mat,
			"charger"
		),
		"attiny": new objGeneric(
			this, -0.292, 0.107, 0.07,
			window.res.mdl.attiny.geo,
			window.res.mdl.attiny.mat,
			"attiny"
		)
	};

	var keysFocus = Object.keys(this.objFocus);
	for (var i = 0; i < keysFocus.length; i++)
		this.objArray.push(this.objFocus[keysFocus[i]]);

	this.objLabels = {
		// "attiny": [
		// 	new objLabel(this,
		// 		-0.33877, 0.09398, 0.10434,
		// 		0.025,
		// 		1, "attiny"
		// 	),
		// 	new objLabel(this,
		// 		-0.33877, 0.09398, 0.0807,
		// 		0.025,
		// 		2, "attiny"
		// 	),
		// 	new objLabel(this,
		// 		-0.33877, 0.09398, 0.05822,
		// 		0.025,
		// 		3, "attiny"
		// 	),
		// 	new objLabel(this,
		// 		-0.33877, 0.09398, 0.03574,
		// 		0.025,
		// 		4, "attiny"
		// 	),
		// 	new objLabel(this,
		// 		-0.24193, 0.09398, 0.03574,
		// 		0.025,
		// 		5, "attiny"
		// 	),
		// 	new objLabel(this,
		// 		-0.24193, 0.09398, 0.05822,
		// 		0.025,
		// 		6, "attiny"
		// 	),
		// 	new objLabel(this,
		// 		-0.24193, 0.09398, 0.0807,
		// 		0.025,
		// 		7, "attiny"
		// 	),
		// 	new objLabel(this,
		// 		-0.24193, 0.09398, 0.10434,
		// 		0.025,
		// 		8, "attiny"
		// 	)
		// ]
	};

	var keysLabels = Object.keys(this.objLabels);
	for (var i = 0; i < keysLabels.length; i++) {
		var objs = this.objLabels[keysLabels[i]];
		for (var j = 0; j < objs.length; j++)
			this.objArray.push(objs[j]);
	}
	
	// ---- LOOPS AND EVENTS ----

	this.update = function(p) {
		updateArray(this.objArray, this);
		this.shader.update(this);
		this.camhand.update(this);
	};
	
	this.resize = function(p) {
		resizeArray(this.objArray, this);
		this.camera.aspect = p.width/p.height;
		this.camera.updateProjectionMatrix();
	};
}