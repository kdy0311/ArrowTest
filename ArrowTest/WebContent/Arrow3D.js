var canvas = null;
var ctx = null;


// #### Object ################
const DIR_FWD = 2;
const DIR_REV = 4;
const SW_OFF = 0;
const SW_ON = 1;

const RD = 1;
const RU = 2;
const LD = 3;
const LU = 4;


const START_COLOR = [0,246,255];	// 가장 밝은 색
const END_COLOR = [47,69,70]; 		// 가장 어두운 색
const ARROW_INTERVAL = 11;
const COLOR_STEP = 0.05;
const LIGHT_STEP = 5;
const ARROW_STEP = 4;

function objArrowLight(ctx, x1, y1, x2, y2, kind, sw) {
	this.ctx = ctx;
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.kind = kind;
	this.sw = sw;
	this.fwdTm = 0;
	this.revTm = ARROW_INTERVAL;
	this.arrCo = [];
	this.coNo = 0;
	this.coWait = 0;
	this.arrCo = f_getLocation(x1, y1, x2, y2);
	this.angle = f_getAngle(x1, y1, x2, y2);
	this.lightCur = 0;
	this.arrowCur = 0;
	this.lightALL = "OFF";
}

objArrowLight.prototype.setSwitch = function(sw) {
	// 최초 ON 이면 화살표 움직임 시작
	if (this.sw == SW_OFF && sw == SW_ON) {
		this.coNo = 0;
		removeArrow();
	}
	this.sw = sw;
}

objArrowLight.prototype.draw = function() {
	var i = 0;
	if(this.coWait==0){
		this.coWait = 1;	// 속도조절
		
		// Arrow Line Light 세팅만 함
		if(this.lightALL=='OFF'){
			if(this.lightCur%LIGHT_STEP==0){
				this.arrCo = f_startColor(this.arrCo, this.arrowCur);
				this.arrowCur++;
			}
			this.lightCur++;
		}
		if(this.lightCur==LIGHT_STEP*ARROW_STEP)
			this.lightALL='ON';
		
		// 색 조정해줌
		this.arrCo = f_currentColor(this.arrCo);
		for (i = 0; i < this.arrCo.length; i++) {
			drawArrowOneTest(this.arrCo[i][0], this.arrCo[i][1], this.kind, this.sw, this.arrCo[i][2]);
		}
	}else{
		this.coWait--;
	}
	
}
// ############################
function f_getAngle(x1, y1, x2, y2) {
	var rad = Math.atan2(y2 - y1, x2 - x1);
	return (rad * 180) / Math.PI;
}
function f_ctx() {
	canvas = document.getElementById("canvas");
	if (canvas.getContext) {
		ctx = canvas.getContext("2d");
	}
}

function removeArrow() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawArrowOne(x, y, a, sw, color) {
	r = color*START_COLOR[0]+(1-color)*END_COLOR[0];
	g = color*START_COLOR[1]+(1-color)*END_COLOR[1];
	b = color*START_COLOR[2]+(1-color)*END_COLOR[2];
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(a * Math.PI / 180);
	ctx.beginPath();
	if (sw == SW_ON) {
		 ctx.fillStyle = 'rgb('+r+','+g+', '+b+')';
	} else {
		ctx.fillStyle = 'rgb('+END_COLOR[0]+','+END_COLOR[1]+', '+END_COLOR[2]+')';
	}
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

function drawArrowOneTest(x,y,kind,sw,color) {
	r = color*START_COLOR[0]+(1-color)*END_COLOR[0];
	g = color*START_COLOR[1]+(1-color)*END_COLOR[1];
	b = color*START_COLOR[2]+(1-color)*END_COLOR[2];
	ctx.save();
	ctx.translate(x, y);
	ctx.beginPath();
	if (sw == SW_ON) {
		 ctx.fillStyle = 'rgb('+r+','+g+', '+b+')';
	} else {
		ctx.fillStyle = 'rgb('+END_COLOR[0]+','+END_COLOR[1]+', '+END_COLOR[2]+')';
	}
	ctx.moveTo(0, 0);
	if(kind == RD){
		ctx.lineTo(2,1);
		ctx.lineTo(4,-5);
		ctx.lineTo(8,-1);
		ctx.lineTo(6,5);
		ctx.lineTo(-4,3);
		ctx.lineTo(-8,-2);
		ctx.lineTo(2,1);
	}else if(kind == RU){
		ctx.lineTo(2,-1);
		ctx.lineTo(1,5);
		ctx.lineTo(7,4);
		ctx.lineTo(8,-2);
		ctx.lineTo(-2,-6);
		ctx.lineTo(-8,-4);
		ctx.lineTo(2,-1);
	}else if(kind == LD){
		ctx.lineTo(-3,0);
		ctx.lineTo(-2,-6);
		ctx.lineTo(-7,-5);
		ctx.lineTo(-8,1);
		ctx.lineTo(2,5);
		ctx.lineTo(8,3);
		ctx.lineTo(-3,0);
	}else if(kind == LU){
		ctx.lineTo(-2,-1);
		ctx.lineTo(8,1);
		ctx.lineTo(4,-3);
		ctx.lineTo(-6,-5);
		ctx.lineTo(-8,0);
		ctx.lineTo(-4,4);
		ctx.lineTo(-2,-1);
	}
	ctx.fill();
	ctx.restore();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function f_getLocation(x1, y1, x2, y2) {
	var intercept = 0; // 절편
	var inclination = 0; // 기울기
	var increase = 0; // 증가량
	var tmp = 0;
	var arr = new Array();
	if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
		for (var i = 0; i < Math.abs(x2 - x1); i++) {
			inclination = (y2 - y1) / (x2 - x1);
			intercept = y1 - (inclination * x1);
			if (x1 > x2) {
				tmp = i * -1;
			} else {
				tmp = i;
			}
			increase = inclination * (x1 + tmp) + intercept;
			element = new Array();
			element.push(x1 + tmp);	// x
			element.push(increase);	// y
			element.push(0);		// color
			if(i%ARROW_INTERVAL==0)
				arr.push(element);
		}
	} else {
		for (var i = 0; i <= Math.abs(y2 - y1); i++) {
			inclination = (x2 - x1) / (y2 - y1);
			intercept = x1 - (inclination * y1);
			if (y1 > y2) {
				tmp = i * -1;
			} else {
				tmp = i;
			}
			increase = inclination * (y1 + tmp) + intercept;
			element = new Array();
			element.push(increase);
			element.push(y1 + tmp);
			element.push(0);		// color
			if(i%ARROW_INTERVAL==0)
				arr.push(element);
		}
	}
	console.log(arr);
	return arr;
}

// ARROW_STEP 간격으로 1세팅(ex.ARROW_STEP = 5 => 1 0 0 0 0 1 0 0 0 0)
function f_startColor(arr, arrowCur){
	for (var i = arrowCur; i < arr.length; i+=ARROW_STEP) {
		arr[i][2] = 1;
	}
	return arr;
}

// COLOR_STEP만큼 값을 빼고 0이 되면 다시 1로 돌아감.
// #주의 : 1에서 COLOR_STEP을 빼면 0이 되게 COLOR_STEP을 해야함
function f_currentColor(arr){
	for (var i = 0; i < arr.length; i++) {
		if(arr[i][2]>0){
			arr[i][2] = +(arr[i][2]-COLOR_STEP).toFixed(12);
		}
		if(arr[i][2]==0){
			arr[i][2] = 1;
		}
	}
	return arr;
}