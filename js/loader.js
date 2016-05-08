// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
if (!Array.prototype.fill) {
  Array.prototype.fill = function(value) {

    // Steps 1-2.
    if (this === null)
		throw new TypeError('this is null or not defined');

    var O = Object(this);

    // Steps 3-5.
    var len = O.length >>> 0;

    // Steps 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0;

    // Step 8.
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    // Steps 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ?
      len : end >> 0;

    // Step 11.
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    // Step 12.
    while (k < final) {
      O[k] = value;
      k++;
    }

    // Step 13.
    return O;
  };
}

var res = {
	loaded: 0,
	done: false,
	mdl: {
		metalEnv: {
			texSrc: {
				px: { src: "./img/metal/pos-x.png" },
				nx: { src: "./img/metal/neg-x.png" },
				py: { src: "./img/metal/pos-y.png" },
				ny: { src: "./img/metal/neg-y.png" },
				pz: { src: "./img/metal/pos-z.png" },
				nz: { src: "./img/metal/neg-z.png" },
			},
			matSrc: function() {
				this.envMap = new THREE.ImageUtils.loadTextureCube([
					"./img/metal/pos-x.png",
					"./img/metal/neg-x.png",
					"./img/metal/pos-y.png",
					"./img/metal/neg-y.png",
					"./img/metal/pos-z.png",
					"./img/metal/neg-z.png"
				]);	
			}
		},

		attiny: {
			geoSrc: "./geo/attiny.json",
			matSrc: function() {
				var envMap = res.mdl.metalEnv.envMap;
				this.mat = new THREE.MeshFaceMaterial([
					new THREE.MeshLambertMaterial({ // Metal
						color: 0xFFFFFF,
						envMap: envMap,
						shininess: 50,
						reflectivity: 1,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // Black Plastic
						color: 0x181818,
						shading: THREE.FlatShading
					})
				]);
			}
		},
		pcb: {
			geoSrc: "./geo/pcb.json",
			texSrc: {
				map: { src: "./mat/pcb_map.jpg" },
			},
			matSrc: function() {
				this.mat = new THREE.MeshFaceMaterial([
					new THREE.MeshLambertMaterial({ // edges: in
						color: 0xBC985C
					}),
					new THREE.MeshLambertMaterial({ // perfboard
						color: 0xFFFFFF,
						map: this.tex.map,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // black plastic
						color: 0x181818,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // edges: out
						color: 0xEBC076
					})
				]);
			}
		},
		relay: {
			geoSrc: "./geo/relay.json",
			texSrc: {
				map: { src: "./mat/relay_map.jpg" }
			},
			matSrc: function() {
				var envMap = res.mdl.metalEnv.envMap;
				this.mat = new THREE.MeshFaceMaterial([
					new THREE.MeshPhongMaterial({ // gold
						color: 0xFFE37D,
						envMap: envMap,
						shininess: 100,
						reflectivity: 1
					}),
					new THREE.MeshLambertMaterial({ // Black Plastic
						color: 0x181818,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // perfboard
						color: 0xFFFFFF,
						map: this.tex.map,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // relay sides
						color: 0xF3EBDD,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // perf edge
						color: 0xFBD990,
						shading: THREE.FlatShading
					})
				]);
			}
		},
		boost: {
			geoSrc: "./geo/boost.json",
			texSrc: {
				map: { src: "./mat/boost_map.jpg"}
			},
			matSrc: function() {
				var envMap = res.mdl.metalEnv.envMap;
				this.mat = new THREE.MeshFaceMaterial([
					new THREE.MeshPhongMaterial({ // gold
						color: 0xFFE37D,
						envMap: envMap,
						shininess: 100,
						reflectivity: 1
					}),
					new THREE.MeshLambertMaterial({ // pcb edge
						color: 0x5689B8,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // connector
						color: 0xFFF3BC,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // Black Plastic
						color: 0x181818,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // perfboard
						color: 0xFFFFFF,
						map: this.tex.map,
						shading: THREE.FlatShading
					})
				]);
			}
		},
		charger: {
			geoSrc: "./geo/charger.json",
			texSrc: {
				map: { src: "./mat/charger_map.jpg" },
				capacitor: { src: "./mat/charger_capacitor.png" }
			},
			matSrc: function() {
				var envMap = res.mdl.metalEnv.envMap;
				this.mat = new THREE.MeshFaceMaterial([
					new THREE.MeshPhongMaterial({ // gold
						color: 0xFFE37D,
						envMap: envMap,
						shininess: 100,
						reflectivity: 1
					}),
					new THREE.MeshLambertMaterial({ // connector
						color: 0xFFF3BC,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // Metal
						color: 0xE7E7E7,
						envMap: envMap,
						shininess: 50,
						reflectivity: 1,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // Black Plastic
						color: 0x181818,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // pcb edge
						color: 0x5689B8,
						shading: THREE.FlatShading
					}),
					new THREE.MeshPhongMaterial({ // capacitor
						color: 0xFFFFFF,
						map: this.tex.capacitor,
						shininess: 50
						// shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // perfboard
						color: 0xFFFFFF,
						map: this.tex.map,
						shading: THREE.FlatShading
					})
				]);
			}
		},
		rpi: {
			geoSrc: "./geo/rpi.json",
			texSrc: {
				map: { src: "./mat/rpi_map.jpg" },
			},
			matSrc: function() {
				var envMap = res.mdl.metalEnv.envMap;
				this.mat = new THREE.MeshFaceMaterial([
					new THREE.MeshLambertMaterial({ // Beige
						color: 0xE4CE8E,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // Black Plastic
						color: 0x181818,
						shading: THREE.FlatShading
					}),
					new THREE.MeshPhongMaterial({ // GPIO
						color: 0xFFE37D,
						envMap: envMap,
						shininess: 100,
						reflectivity: 1
					}),
					new THREE.MeshLambertMaterial({ // Eth Light 1
						color: 0xFFC230
					}),
					new THREE.MeshLambertMaterial({ // Metal
						color: 0xFFFFFF,
						envMap: envMap,
						shininess: 50,
						reflectivity: 1,
						shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // PCB
						color: 0xFFFFFF,
						map: this.tex.map,
						shading: THREE.FlatShading
					}),
					new THREE.MeshBasicMaterial({ // Inside Video Ports
						color: 0x000000,
						// shading: THREE.FlatShading
					}),
					new THREE.MeshLambertMaterial({ // Eth Light 2
						color: 0x00BA00
					}),
				]);
			}
		}
	},

	load: function() {
		this.loadedMax = 0;

		for (var key in this.mdl) { // For each model
			var obj = this.mdl[key]; // get current model object

			var texSrc = obj.texSrc; // texture source object of current model
			if (typeof texSrc != "undefined") {
				obj.texLoader = {}; // also create empty object for texture loaders
				obj.tex = {};

				for (var texKey in texSrc) { // for each texture source listed
					this.loadedMax++;
					var srcCurrent = texSrc[texKey]; // get the current source
					var loaderCurrent =	 // give alias to loader
						obj.texLoader[texKey] = // create new loader for current source
						new THREE.TextureLoader(); // ^^^
					loaderCurrent.load(srcCurrent.src, (function(obj, texKey, tex) { // load dat, and do stuff when loaded
						for (var a in obj.texSrc[texKey]) { // for each key in texture source
							if (a == "properties") { // check if properties exist
								var props = obj.texSrc[texKey].properties; // if so, get them
								for (var b in props) // and apply each of em
									tex[b] = props[b].value;
							}
						}
						obj.tex[texKey] = tex; // set the actual texture object
						this.onLoad();
					}).bind(this, obj, texKey));
				}
			}

			var geoSrc = obj.geoSrc; // and geometry source object of current model
			if (typeof geoSrc != "undefined") {
				this.loadedMax++;
				if (typeof geoSrc == "function") {
					obj.geoSrc();
					this.onLoad();
				} else {
					var ext = geoSrc.split('.').pop();
					if (ext == "json") {
						obj.geoLoader = new THREE.JSONLoader();
						obj.geoLoader.load(geoSrc, (function(obj, geo, mat) {
							obj.geo = geo;
							obj.mat = new THREE.MeshFaceMaterial(mat);
							this.onLoad();
						}).bind(this, obj));
					}
				}
			}
		}
	},
	
	onLoad: function() {
		this.loaded += 1;
		if (this.loaded == this.loadedMax) this.postLoad();
	},
	
	postLoad: function() {
		for (var key in this.mdl) {
			var obj = this.mdl[key];
			if (typeof obj.matSrc == "function") {
				obj.matSrc();
				this.onLoad();
			}
		}
		this.done = true;
		window.game.init();
	}
};

res.load();