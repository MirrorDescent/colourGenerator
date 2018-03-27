var test = document.getElementById("test");

var lRow;
var cRow;
var pRow;
createRows();

var noRows = 0;
var noCells = 0;

function newColour() {
	deleteAll();
	var stringOne = document.getElementById("myTextarea").value.toLowerCase();
	stringOne = stringOne.replace(/[^\w\s]|_/g, "")
	var stringArray = stringOne.split(" ");
	for(var i=0; i < stringArray.length; i++) {
		if(stringArray[i].length > 2) {
			var divideArrays = divideText(stringArray[i]);
			var rangeArray = rangeChecker(divideArrays.sections);
			var unitArray = unitCalc(divideArrays.sections);
			console.log(rangeArray);
			console.log(unitArray);
			toRGB(rangeArray, unitArray,stringArray[i]);
		}
	}
}

function deleteAll() {
		test.innerHTML = "";
		
		lRow = test.insertRow();
		cRow = test.insertRow();
		pRow = test.insertRow();
}

function createRows() {
	lRow = test.insertRow();
	cRow = test.insertRow();
	pRow = test.insertRow();
	noRows = noRows + 1;
}
function divideText(string) {
	var len = string.length
	var partsLen = Math.ceil(len / 3);
	var remains = len % 3;
	
	var count = 3;
	var partsArray = [];
	
	if(remains != 0) {
		if(remains == 2) {
			partsArray.push(partsLen - 1);
			count = count - 1
		} else {
			partsArray.push(partsLen - 1);
			partsArray.push(partsLen - 1);
			count = count - 2
		}
	}
	
	for(var i=0; i < count; i++) {
			partsArray.push(partsLen);
	}
	
	var sectionArray = [];
	
	var counter = 0;
	for(i=0; i < partsArray.length; i++) {
		var newSection = "";
		for(var j=0; j < partsArray[i]; j++) {
			newSection += string.charAt(counter);
			counter = counter + 1;
		}
		sectionArray.push(newSection);
	}
	
	var divideArrays = {
		parts: partsArray,
		sections: sectionArray
	}
	return divideArrays;
}

function rangeChecker(sectionArray) {
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	
	var rangeArray = [];
	
	for(var i=0; i < sectionArray.length; i++) {
		var sum = 0;
		for(var j=0; j < sectionArray[i].length; j++) {
			for(var l=0; l < alphabet.length; l++) {
				if(sectionArray[i][j] == alphabet[l]) {
					sum = sum + l;
				}
			}
		}
		var avg = Math.round(sum / sectionArray[i].length) * 10;
		rangeArray.push(avg);
	}
	return rangeArray;
}

function unitCalc(sectionArray) {
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	
	var unitArray = [];
	
	for(var i=0; i < sectionArray.length; i++) {
		var sum = 0;
		for(var j=0; j < sectionArray[i].length; j++) {
			for(var l=0; l < alphabet.length; l++) {
				if(sectionArray[i][j] == alphabet[l]) {
					sum = sum + l;
				}
			}
		}
		numbers = String(sum);
		var sumTwo = 0;
		while(numbers.length != 1){
			sumTwo = 0;
			for(k=0; k < numbers.length; k++) {
				var num = parseInt(numbers[k]);
				sumTwo = sumTwo + num;
			}
			numbers = String(sumTwo);
		}	
		console.log(sumTwo);
		unitArray.push(sumTwo);
	}
	return unitArray;
}
	
function toRGB(rangeArray, unitArray, word) {
	var r = rangeArray[0] + unitArray[0];
	var g = rangeArray[1] + unitArray[1];
	var b = rangeArray[2] + unitArray[2];
	var colour = "rgb(" + r + "," + g + "," + b + ")";	
	
	console.log(colour);
	var currentWidth = noCells * 100;
	var width = document.getElementById("wrapper").offsetWidth;
	
	if(currentWidth + 100 < width) {
		var newCell = cRow.insertCell();
		newCell.width = "100px";
		newCell.height = "100px";
		newCell.style.borderRadius = "10px";
		newCell.style.backgroundColor = colour;
		
		var lCell = lRow.insertCell();
		lCell.width = "100px";
		lCell.height = "20px";
		lCell.style.textAlign = "center";
		lCell.innerHTML = word;
		
		var pCell = pRow.insertCell();
		pCell.width = "100px";
		pCell.height = "20px";
		pCell.style.textAlign = "center";
		pCell.innerHTML = colour;
	}
	else{
		noCells = 0;
		noRows = noRows + 1;
		createRows();
		
		var newCell = cRow.insertCell();
		newCell.width = "100px";
		newCell.height = "100px";
		newCell.style.borderRadius = "10px";
		newCell.style.backgroundColor = colour;
		
		var lCell = lRow.insertCell();
		lCell.width = "100px";
		lCell.height = "20px";
		lCell.style.textAlign = "center";
		lCell.innerHTML = word;
		
		var pCell = pRow.insertCell();
		pCell.width = "100px";
		pCell.height = "20px";
		pCell.style.textAlign = "center";
		pCell.innerHTML = colour;
	}
	
	noCells = noCells + 1;
}