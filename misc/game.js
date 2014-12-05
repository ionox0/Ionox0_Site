/*jslint node: true*/
'use strict';
/*jslint browser: true*/ /*global  $*/

var Game = require ('crtrdg-gameloop');
var Keyboard = require('crtrdg-keyboard');

var game = new Game({
	canvas: 'game',
	width: 800,
	height: 400
});

var keyboard = new Keyboard(game);

game.on('update', function(){
	box.update(keyboard.keysDown);
	box.boundaries();
});

game.on('draw', function(context){
	context.fillStyle = '#000000';
	context.fillRect(0, 0, game.width, game.height);
	box.draw(context);
	target.draw(context);
});

var box = {
	x: 50,
	y: 50,
	width: 20,
	height: 20,
	color: 'blue',
	speed: 5
};

var currentDir;
var points = 0;
box.update = function(keysDown){
	if ('W' in keysDown){
		currentDir = 'W';
		box.y -= box.speed;
	}
	else if ('A' in keysDown){
		currentDir = 'A';
		box.x -= box.speed;
	}
	else if ('S' in keysDown){
		currentDir = 'S';
		box.y += box.speed;
	}
	else if ('D' in keysDown){
		currentDir = 'D';
		box.x += box.speed;
	}
	else {
		if (currentDir == 'W'){
			box.y -= box.speed;
		}
		if (currentDir == 'A'){
			box.x -= box.speed;
		}
		if (currentDir == 'S'){
			box.y += box.speed;
		}
		if (currentDir == 'D'){
			box.x += box.speed;
		}
	}
};

box.boundaries = function(){
	if (box.x <= 0){
		box.x = 0;
		game.pause();
	}
	if (box.x >= game.width - box.width){
		box.x = game.width - box.width;
		game.pause();
	}
	if (box.y <= 0){
		box.y = 0;
		game.pause();
	}
	if (box.y >= game.height - box.height){
		box.y = game.height - box.height;
		game.pause();
	}
};


box.draw = function(context){
	context.fillStyle = box.color;
	context.fillRect(box.x, box.y, box.width, box.height);
	if (box.x > target.x - box.width && box.x <= target.x + target.width && box.y > target.y - box.height && box.y <= target.y + target.height){
		box.speed += 0.5;
		points += 1;
	}
	$('#text-left').html('(use w,a,s,d to move) score: ' + points);
};

var target = {
	x: 500,
	y: 200,
	width: 20,
	height: 20,
	color: 'red'
};

target.draw = function(context){
	context.fillStyle = target.color;
	context.fillRect(target.x, target.y, target.width, target.height);
	if (box.x > target.x - box.width && box.x <= target.x + target.width && box.y > target.y - box.height && box.y <= target.y + target.height){
		target.x = Math.random()*game.width;
		target.y = Math.random()*game.height;
	}
};

