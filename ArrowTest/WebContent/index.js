
var testArrow1 = null;

$( function() {	
	initDatas();	
});


function initDatas() {
	// Arrow 설정
	f_ctx();
	testArrow1 = new objArrowLight(ctx, 50, 100, 120, 200, RD, SW_OFF);

	f_drawArrow();
}

function f_drawArrow() {
	//removeArrow();
	testArrow1.draw();
	testArrow1.setSwitch(SW_ON);
	requestAnimationFrame(f_drawArrow);
}

/*function sleep (delay) {
	   var start = new Date().getTime();
	   while (new Date().getTime() < start + delay);
}*/

