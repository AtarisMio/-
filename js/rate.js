var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//底色环
for(var radius = 40; radius<=61; radius+=7){
	ctx.beginPath();
	ctx.strokeStyle = "#37bda1";
	ctx.lineWidth = "5";
	ctx.arc(75, 75, radius, 0, 2 * Math.PI, false);
	ctx.stroke();
	for(var degree=0; degree<=(Math.PI /6 * 10); degree += (Math.PI /6 * 2)){
		ctx.beginPath();
		ctx.strokeStyle = "#53d6c4";
		ctx.lineWidth = "5";
		ctx.arc(75, 75, radius, degree, degree + Math.PI /6, false);
		ctx.stroke();
	}
}


function setRate(rate){
	$('.percent').text(rate+'%');
	if(rate===100)
		rate = 0;
	else if(rate === 0)
		rate = 100;
	rate = Math.floor(rate) / 100;
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	for(var radius = 40; radius <= 61; radius+=7)
	{
		ctx.beginPath();
		var grd=ctx.createLinearGradient(141,45.5,9,45.5);
		grd.addColorStop("0","#fff");
		grd.addColorStop("0.4","#39ffff");
		grd.addColorStop(1,"#39ffff");
		ctx.strokeStyle = grd;
		ctx.lineWidth = "4";
		ctx.arc(75, 75, radius, 0, 2 * Math.PI * (1 - rate), true);
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = "#39ffff";
		ctx.lineWidth = "1";
		ctx.arc(75 + radius * Math.cos(2 * Math.PI * (1 - rate)),75 + radius * Math.sin(2 * Math.PI * (1 - rate)), 1, 0, 2 * Math.PI, false);
		ctx.stroke();
	}
}
