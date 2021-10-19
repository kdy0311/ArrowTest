var arrowTest = null;
var canvas = null;
var ctx = null;

$( function() {	
	f_ctx();
	arrowTest = new objArrowLight(ctx, 10,10,100,10);
	arrowTest.draw();
});

function objArrowLight(ctx, x1, y1, x2, y2){
	this.ctx = ctx;
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.arrCo = [];
	f_getLocation(x1, y1, x2, y2);
}

objArrowLight.prototype.draw = function() {
	drawArrowOne();
}
function drawArrowOne(x,y) {
	ctx.save();
	ctx.translate(x, y);
	ctx.beginPath();
    ctx.moveTo(0, 0);
	ctx.lineTo(-6, -6);
	ctx.lineTo(0, -6);
	ctx.lineTo(6, 0);
	ctx.lineTo(0, 6);
	ctx.lineTo(-6, 6);
	ctx.fill();
	ctx.restore();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function f_getLocation(x1, y1, x2, y2) {
	for(var i=0; i<x2-x1; i++){
		
	}
}
function f_ctx() {
	canvas = document.getElementById("canvas");
	if (canvas.getContext) {
		ctx = canvas.getContext("2d");
	}
}