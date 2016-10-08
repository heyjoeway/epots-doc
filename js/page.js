$(window).load(function() {
	var docList = [
		"relay",
		"boost",
		"attiny",
		"charger",
		"rpi",
		"pcb",
		"info",
		"data"
	];

	for (var i = 0; i < docList.length; i++) {
	 	var doc = docList[i];
		$(".nav_" + doc).click((function(doc) {
			goPage(doc);
		}).bind(this, doc));
	}

	$("#nav_back").click(goHome);

	$(window).resize(function() {
		setPlaceholder();
	});
	setPlaceholder();

	$("#canvas_fullscreen").click(canvasMaximize);
	$("#canvas_unfullscreen").click(canvasMinimize);

	$(window).click(function() {
		$("#nav_home").addClass("softhide_mobile");
	});

	$("#nav_menu").click(function() {
		setTimeout(function() {
			console.log("HEP");
			$("#nav_home").removeClass("softhide_mobile");
		}, 1);
	});

	$("#load").addClass("softhide");
});

function canvasMinimize() {
	$("body").removeClass("canvas_home")
		.addClass("canvas_left");
	$("#canvas_fullscreen").removeClass("softhide");
	$("#canvas_unfullscreen").addClass("softhide");
	transitionCanvas();
	setPlaceholder();
}

function canvasMaximize() {
	$("body").addClass("canvas_home")
		.removeClass("canvas_left");

	$("#canvas_fullscreen").addClass("softhide");
	$("#canvas_unfullscreen").removeClass("softhide");
	transitionCanvas();
	setPlaceholder();
}

function goPage(tag) {
	$("body").scrollTop(0);

	var zoomAmt = {
		"relay": 5,
		"boost": 4,
		"attiny": 7,
		"charger": 3,
		"rpi": 1.3,
		"pcb": 1.5
	};

	var p = window.game.sceneModel; 
	var zoom = zoomAmt[tag] || 1;
	var hasTarget = typeof p.objFocus[tag] != "undefined";
	var opacity = hasTarget ? 0 : 1;

	if (hasTarget)
		var position = p.objFocus[tag].model.position;
	else
		var position = new THREE.Vector3(0,0,0);

	var focusKeys = Object.keys(p.objFocus);
	for (var i = 0; i < focusKeys.length; i++) {
		var key = focusKeys[i];
		if (key != tag)
			p.objFocus[key].fadeTo(30, opacity);
		if (hasTarget)
			p.objFocus[key].clickable = false;
	}

	// if (hasTarget) {
	// 	var labelKeys = Object.keys(p.objLabels);
	// 	for (var i = 0; i < labelKeys.length; i++) {
	// 		var key = labelKeys[i];
	// 		if (key == tag) {
	// 			var objs = p.objLabels[key];
	// 			for (var j = 0; j < objs.length; j++) {
	// 				var obj = objs[j];
	// 				obj.fadeTo(30, 1);
	// 				obj.clickable = true;
	// 			}
	// 		}
	// 	}
	// }

	p.camhand.focus(p, 90, position, zoom);
	
	var iframeURL = {
		"relay": "./cms/index.php?id=latching-relay",
		"boost": "./cms/index.php?id=boost-converter",
		"attiny": "./cms/index.php?id=the-attiny",
		"charger": "./cms/index.php?id=charging-regulator",
		"rpi": "./cms/index.php?id=raspberry-pi",
		"pcb": "./cms/index.php?id=the-circuit",
		"info": "./cms/index.php?id=information",
		"data": "./cms/index.php?id=data-1",
	}

	$("#doc_cont").load(iframeURL[tag] + " #content");

	$("#nav_home").addClass("softhide");
	$("#nav_menu").addClass("softhide");
	$("#nav_logo").addClass("softhide");
	$("#nav_back").removeClass("softhide");

	canvasMinimize();
}

function goHome() {
	var p = window.game.sceneModel; 
	p.camhand.focus(p, 60, new THREE.Vector3(0,0,0), 1);

	var focusKeys = Object.keys(p.objFocus);
	for (var i = 0; i < focusKeys.length; i++) {
	 	var key = focusKeys[i];
	 	setTimeout((function(p, key) {
 			p.objFocus[key].fadeTo(60, 1);
	 		p.objFocus[key].clickable = true;
	 	}).bind(this, p, key), 1000);
	}

	// var labelKeys = Object.keys(p.objLabels);
	// for (var i = 0; i < labelKeys.length; i++) {
	// 	var key = labelKeys[i];
	// 	var objs = p.objLabels[key];
	// 	for (var j = 0; j < objs.length; j++) {
	// 		var obj = objs[j];
	// 		obj.fadeTo(30, 0);
	// 		obj.clickable = false;
	// 	}
	// }

	$("#nav_home").removeClass("softhide");
	$("#nav_logo").removeClass("softhide");
	$("#nav_menu").removeClass("softhide");
	$("#nav_back").addClass("softhide");

	canvasMaximize();

	$("#canvas_unfullscreen").addClass("softhide");
}

function setPlaceholder() {
	var $window = $(window);
	var size = Math.min($window.width(), $window.height());
	$("#canvas_placeholder")
		.width(size)
		.height(size);

	setTimeout(function() {
		var $pholder = $("#canvas_placeholder");
		var offset = $pholder.offset();
		$("body > canvas")
			.width($pholder.width())
			.height($pholder.height())
			.offset($pholder.offset());
	}, 1);
}

function transitionCanvas() {
	clearTimeout(window.tcTimeout);
	$("body > canvas").addClass("canvas_transition");
	window.tcTimeout = setTimeout(function() {
		$("body > canvas").removeClass("canvas_transition");
	}, 1500);
}