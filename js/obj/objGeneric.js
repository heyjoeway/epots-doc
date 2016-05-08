function objGeneric(p, x, y, z, geo, mat, tag) {
	this.tag = tag;
	this.opacity = 1;
	this.clickable = true;

	this.model = new THREE.Mesh(geo, mat);
	
	this.model.receiveShadow = true;
	this.model.castShadow = true;

	p.scene.add(this.model);

	this.model.position.x = x;
	this.model.position.y = y;
	this.model.position.z = z;

	p.domEvents.addEventListener(this.model, 'click', (function(p){
		this.onClick(p);
	}).bind(this, p), false);

	p.domEvents.addEventListener(this.model, 'touchend', (function(p){
		this.onClick(p);
	}).bind(this, p), false);

	this.onClick = function(p) {
		if (this.clickable)
			goPage(this.tag);
	};

	this.ease = function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t };

	this.fadeTo = function(time, opacity) {
		this.opacityPrev = this.opacity;
		this.opacityNext = opacity;

		if (this.opacityPrev == 0)
			this.model.visible = true;

		this.timeTotal = time;
		this.timeCurrent = 0;

		var materials = this.model.material.materials;

		for (var i = 0; i < materials.length; i++)
			materials[i].transparent = true;

		this.model.visible = true;
	};

	this.update = function(p) {
		if (this.timeCurrent < this.timeTotal) {
			this.timeCurrent++;
			var pNext = this.ease(this.timeCurrent/this.timeTotal);
			var pPrev = 1 - pNext;

			this.opacity = 
				(pPrev * this.opacityPrev) +
				(pNext * this.opacityNext);

			var materials = this.model.material.materials;
			for (var i = 0; i < materials.length; i++)
				materials[i].opacity = this.opacity;

			if (this.timeCurrent >= this.timeTotal) {
				for (var i = 0; i < materials.length; i++)
					materials[i].transparent = this.opacity != 1;
				this.model.visible = this.opacity != 0;
			}
		}
	};
	this.remove = function(p) {};
}