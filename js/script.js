function BSTNode(value) {
	this.value = value;
	this.left = null;
	this.right = null;
	this.locX = 0;
	this.locY = 0;
	this.oldLocX = 0;
	this.oldLocY = 0;
	this.animLocX = 0;
	this.animLocY = 0;
}

var root = null;
var animTimeMs = 0;

// ---------------------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------------------

function levelSeparation() {
	return 100;
}

function nodeRadius() {
	return 25;
}

function animDurationMs() {
	return 500;
}

function animIntervalMs() {
	return 16;
}

// ---------------------------------------------------------------------------------------
// BST manipulation functions
// ---------------------------------------------------------------------------------------

function internalAddNode(node) {
	if (root == null) {
		root = node;
	} else {
		var parent = root;
		for (;;) {
			if (node.value < parent.value) {
				if (parent.left == null) {
					parent.left = node;
					return;
				} else {
					parent = parent.left;
				}
			} else if (node.value > parent.value) {
				if (parent.right == null) {
					parent.right = node;
					return;
				} else {
					parent = parent.right;
				}
			} else {
				return;
			}
		}
	}
}

function traverseInOrder(node, callback) {
	if (node.left != null) traverseInOrder(node.left, callback);
	callback(node);
	if (node.right != null) traverseInOrder(node.right, callback);
}

// ---------------------------------------------------------------------------------------
// BST rendering code
// ---------------------------------------------------------------------------------------

function layoutSubtree(node, nodeY, left, right) {
	node.locX = (left + right) / 2;
	node.locY = nodeY;
	var space = (right - left) / 2;
	if (node.left != null) {
		layoutSubtree(node.left, nodeY + levelSeparation(), left, left + space);
	}
	if (node.right != null) {
		layoutSubtree(node.right, nodeY + levelSeparation(), left + space, left + 2 * space);
	}
}

function drawLineBetweenNodes(context, parent, child) {
	context.beginPath();
	context.moveTo(parent.animLocX, parent.animLocY);
	context.lineTo(child.animLocX, child.animLocY);
	context.lineWidth = 1;
	context.strokeStyle = "#000000";
	context.stroke();
}

function displayBST(canvas, context) {
	if (root == null) return;

	traverseInOrder(root, function(node) {
		var t = animTimeMs / animDurationMs();
		t = 3*t*t - 2*t*t*t;
		node.animLocX = (1 - t) * node.oldLocX + t * node.locX;
		node.animLocY = (1 - t) * node.oldLocY + t * node.locY;
	});

	context.clearRect(0, 0, canvas.width, canvas.height);
	traverseInOrder(root, function(node) {
		if (node.left != null) drawLineBetweenNodes(context, node, node.left);
		if (node.right != null) drawLineBetweenNodes(context, node, node.right);
	});
	traverseInOrder(root, function(node) {
		context.beginPath();
		context.arc(node.animLocX, node.animLocY, nodeRadius(), 0, 2 * Math.PI);
		context.fillStyle = "#FFFFFF";
		context.fill();
		context.lineWidth = 2;
		context.strokeStyle = "#000000";
		context.stroke();

		context.font = "10pt helvetica";
		context.fillStyle = "#000000";
		context.fillText(node.value, node.animLocX, node.animLocY);
	});

	if (animTimeMs < animDurationMs()) {
		animTimeMs += animIntervalMs();
		if (animTimeMs > animDurationMs()) {
			animTimeMs = animDurationMs();
		}
		setTimeout(function() { displayBST(canvas, context) }, animIntervalMs());
	}
}

// ---------------------------------------------------------------------------------------
// UI code
// ---------------------------------------------------------------------------------------

function beginAnimation() {
	var canvas = document.getElementById("bstCanvas");
	var ctx = canvas.getContext("2d");

	traverseInOrder(root, function(node) {
		node.oldLocX = node.locX;
		node.oldLocY = node.locY;
	});
	layoutSubtree(root, nodeRadius() * 2, nodeRadius() * 2, canvas.width);
	animTimeMs = 0;

	displayBST(canvas, ctx);
}

function addNode() {
	var nodeValueInput = document.getElementById("nodeValueInput");

	var input_stringValue = nodeValueInput.value;
	var str_array = input_stringValue.split(' ');
	for (var i = 0; i < str_array.length; i++){
		var stringValue = str_array[i];
		var floatValue = parseFloat(stringValue);
		var finalValue = isNaN(floatValue) ? stringValue : floatValue;

		var node = new BSTNode(finalValue);

		internalAddNode(node);
	}
	nodeValueInput.value = "";
	beginAnimation();
}

function clear(){
	var canvas = document.getElementById("bstCanvas");
	var ctx = canvas.getContext("2d");
	root = null;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	nodeValueInput.value = "";
	beginAnimation();
}

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("addNodeButton").onclick = addNode;
	document.getElementById("clearNodeButton").onclick = clear;
	shortcut.add("enter", addNode);
});
