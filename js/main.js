function updateArray(a, p) {
	for (var i=0;i<a.length;i++)
		a[i].update(p);
}

function resizeArray(a, p) {
	for (var i=0;i<a.length;i++)
		if (a[i].resize)
			a[i].resize(p);
}

var game = {
	init: function() {
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});
		this.renderer.setClearColor( 0x000000, 0 );
		this.renderer.shadowMapEnabled = true;

		document.body.appendChild(this.renderer.domElement);
		$("body").append(this.renderer.domElement);
		
		this.sceneModel = new sceneMain(this);
		this.sceneArray = [this.sceneModel];

		$(window).resize(function() { game.resize() });
		this.resize();
		this.update();
	},

	resize: function() {
		var jq = $("body");
		this.size = Math.min(jq.width(), jq.height())
		this.width = this.height = this.size;
		this.renderer.setSize(this.size, this.size);
		resizeArray(this.sceneArray, this);
	},
	
	update: function() {
		updateArray(game.sceneArray, game);
		requestAnimationFrame(game.update);
	}
}
