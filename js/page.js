var docData = {
	"relay": {
		url: "./cms/index.php?id=latching-relay",
		zoom: 5
	},
	"boost": {
		url: "./cms/index.php?id=the-attiny",
		zoom: 4
	},
	"attiny": {
		url: "./cms/index.php?id=the-attiny",
		zoom: 7
	},
	"charger": {
		url: "./cms/index.php?id=charging-regulator",
		zoom: 3
	},
	"rpi": {
		url: "./cms/index.php?id=raspberry-pi",
		zoom: 1.3
	},
	"pcb": {
		url: "./cms/index.php?id=the-circuit",
		zoom: 1.5
	},
	"info": {
		url: "./cms/index.php?id=information"
	},
	"data": {
		url: "./cms/index.php?id=data-1"
	}
};

$(window).load(function() {
	var docList = Object.keys(docData);

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
});

function canvasMinimize() {
	$("#canvas_container, #canvas_bg")	
		.removeClass("canvas_home")
		.addClass("canvas_left");
	$("#canvas_fullscreen").removeClass("softhide");
	$("#canvas_unfullscreen").addClass("softhide");
	transitionCanvas();
	setPlaceholder();
}

function canvasMaximize() {
	$("#canvas_container, #canvas_bg")
		.addClass("canvas_home")
		.removeClass("canvas_left");
	$("#canvas_fullscreen").addClass("softhide");
	$("#canvas_unfullscreen").removeClass("softhide");
	transitionCanvas();
	setPlaceholder();
}

function goPage(tag) {
	var p = window.game.sceneModel; 
	var zoom = docData[tag].zoom || 1;
	var hasTarget = typeof p.objFocus[tag] != "undefined";
	var opacity = hasTarget ? 0 : 1;

	var position = hasTarget ?
		p.objFocus[tag].model.position :
		new THREE.Vector3(0,0,0);

	var focusKeys = Object.keys(p.objFocus);
	for (var i = 0; i < focusKeys.length; i++) {
		var key = focusKeys[i];
		if (key != tag)
			p.objFocus[key].fadeTo(30, opacity);
		if (hasTarget)
			p.objFocus[key].clickable = false;
	}

	if (hasTarget) {
		var labelKeys = Object.keys(p.objLabels);
		for (var i = 0; i < labelKeys.length; i++) {
			var key = labelKeys[i];
			if (key == tag) {
				var objs = p.objLabels[key];
				for (var j = 0; j < objs.length; j++) {
					var obj = objs[j];
					obj.fadeTo(30, 1);
					obj.clickable = true;
				}
			}
		}
	}

	p.camhand.focus(p, 90, position, zoom);

	$("#doc_iframe").attr('src', docData[tag].url);

	$("#nav_home").addClass("softhide");
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

	var labelKeys = Object.keys(p.objLabels);
	for (var i = 0; i < labelKeys.length; i++) {
		var key = labelKeys[i];
		var objs = p.objLabels[key];
		for (var j = 0; j < objs.length; j++) {
			var obj = objs[j];
			obj.fadeTo(30, 0);
			obj.clickable = false;
		}
	}
	
	$("#nav_home").removeClass("softhide");
	$("#nav_logo").removeClass("softhide");
	$("#nav_back").addClass("softhide");

	canvasMaximize();

	$("#canvas_unfullscreen").addClass("softhide");
}

function setPlaceholder() {
	var jq = $(window);
	var size = Math.min(jq.width(), jq.height());
	$("#canvas_placeholder").width(size)
							.height(size);

	setTimeout(function() {
		var jqPh = $("#canvas_placeholder");
		var offset = jqPh.offset();
		$("body > canvas")
			.width(jqPh.width())
			.height(jqPh.height())
			.offset(jqPh.offset());
	}, 1);
}

function transitionCanvas() {
	clearTimeout(window.tcTimeout);
	$("body > canvas").addClass("canvas_transition");
	window.tcTimeout = setTimeout(function() {
		$("body > canvas").removeClass("canvas_transition");
	}, 1500);
}