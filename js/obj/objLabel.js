function objLabel(p, x, y, z, scale, number, tag) {
	this.tag = tag;
	this.number = number;

	this.opacity = 0;
	this.clickable = true;

	this.mat = new THREE.SpriteMaterial({
		map: window.res.mdl.labels.tex[number.toString()],
		color: 0xffffff
	});
	this.sprite = new THREE.Sprite(this.mat);

	this.sprite.scale.set(scale, scale, 1);
	this.sprite.visible = false;

	p.scene.add(this.sprite);

	this.sprite.position.x = x;
	this.sprite.position.y = y;
	this.sprite.position.z = z;

	// p.domEvents.addEventListener(this.sprite, 'click', (function(p){
	// 	this.onClick(p);
	// }).bind(this, p), false);

	// p.domEvents.addEventListener(this.sprite, 'touchend', (function(p){
	// 	this.onClick(p);
	// }).bind(this, p), false);

	// this.onClick = function(p) {
	// 	// if (this.clickable)
	// 		// goPage(this.tag);
	// };

	this.ease = function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t };

	this.fadeTo = function(time, opacity) {
		this.opacityPrev = this.opacity;
		this.opacityNext = opacity;

		if (this.opacityPrev == 0)
			this.sprite.visible = true;

		this.timeTotal = time;
		this.timeCurrent = 0;

		this.sprite.material.transparent = true;
		this.sprite.visible = true;
	};

	this.update = function(p) {
		if (this.timeCurrent < this.timeTotal) {
			this.timeCurrent++;
			var pNext = this.ease(this.timeCurrent/this.timeTotal);
			var pPrev = 1 - pNext;

			this.opacity = 
				(pPrev * this.opacityPrev) +
				(pNext * this.opacityNext);

			var material = this.sprite.material;
			material.opacity = this.opacity;

			if (this.timeCurrent >= this.timeTotal) {
				material.transparent = this.opacity != 1;
				this.sprite.visible = this.opacity != 0;
			}
		}
	};

	this.remove = function(p) {};
}