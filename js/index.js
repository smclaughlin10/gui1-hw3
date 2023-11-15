/* File: style.css
GUI Assignment: HW3 - Creating an Interactive Dynamic Table
Sean Mclaughlin, UMass Lowell Computer Science,
Sean_Mclaughlin1@student.uml.edu
Copyright (c) 2023 by Sean. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by SM on November 12, 2023 */

function formSubmit() {
	let mainTable = document.getElementById("myTable");

	// Gathering all form values inputted
	let startHorizontal = document.getElementById("startHorizontal");
	let endHorizontal = document.getElementById("endHorizontal");
	let startVertical = document.getElementById("startVertical");
	let endVertical = document.getElementById("endVertical");
	
	// Array for iterating in formStyleReset function
	let formInputs = [startHorizontal, endHorizontal, startVertical, endVertical];
	
	let startHVal = startHorizontal.value;
	let endHVal = endHorizontal.value;
	let startVVal = startVertical.value;
	let endVVal = endVertical.value;
	
	let msgSH = document.getElementById("paragraphSH");
	let msgEH = document.getElementById("paragraphEH");
	let msgSV = document.getElementById("paragraphSV");
	let msgEV = document.getElementById("paragraphEV");
	
	let msgs = [msgSH, msgEH, msgSV, msgEV];

	// Reset Table if there is an existing one
	formStyleReset(mainTable, formInputs, msgs);
	
	let error = false;

	// Validation
	// Checking for blank inputs
	if (isNaN(startHVal)) { alert(); return;}
	if ((startHVal == '') || (endHVal == '') || (startVVal == '') || (endVVal == '')) {
		if (startHVal === '') {
			formInputErrorBlank(msgSH);
			updateFormColor(startHorizontal);
		}
		if (endHVal === '') {
			formInputErrorBlank(msgEH);
			updateFormColor(endHorizontal);
		}
		if (startVVal === '') {
			formInputErrorBlank(msgSV);
			updateFormColor(startVertical);
		}
		if (endVVal === '') {
			formInputErrorBlank(msgEV);
			updateFormColor(endVertical);
		}
		return;
	}

	// Converting value into number
	startHVal = Number(startHorizontal.value);
	endHVal = Number(endHorizontal.value);
	startVVal = Number(startVertical.value);
	endVVal = Number(endVertical.value);
	
	// Start Value is Higher than end Value
	if (startHVal >= endHVal) {
		formInputErrorOrdering(startHorizontal, msgSH);
		formInputErrorOrdering(endHorizontal, msgEH);
		error = true;
	}
	if (startVVal >= endVVal) {
		formInputErrorOrdering(startVertical, msgSV);
		formInputErrorOrdering(endVertical, msgEV);
		error = true;
	}

	// Out of Desired Range Errors
	if (startHVal < -50) {
		updateFormColor(startHorizontal);
		formInputErrorOutOfRange(msgSH);
		error = true;
	}
	if (endHVal > 50) {
		updateFormColor(endHorizontal);
		formInputErrorOutOfRange(msgEH);
		error = true;
	}
	if (startVVal < -50) {
		updateFormColor(startVertical);
		formInputErrorOutOfRange(msgSV);
		error = true;
	}
	if (endVVal > 50) {
		updateFormColor(endVertical);
		formInputErrorOutOfRange(msgEV);
		error = true;
	}
	if (error) { return; }

	// Make table
	mainTable.innerHTML = makeTable(startHVal, endHVal, startVVal, endVVal);
}

function makeTable(startH, endH, startV, endV) {
	// Make the table
	let table = '<table>'
	table += '<tr>';
	table += '<td></td>';
	let i;
	// Make all the rows
	for (i = startH; i <= endH; i++) {
		table += '<th>' + i + '</th>'
	}
	table += '</tr>';
	// Make all the columns 
	for (let k = startV; k <= endV; k++) {
		table += '<tr>';
		table += '<th>' + k + '</th>';
		for (let j = startH; j <= endH; j++) {
			table += '<td>' + (k*j) + '</td>';
		}
		table += '</tr>';
	}
	table += '</table>'
	// Returning entire "table" string to formSubmit function
	return table;
}

// Resets styling of form when form is submitted again.
function formStyleReset(table, inputForm, msgs) {
	table.innerHTML = "";
	for (let i = 0; i < 4; i++) {
		inputForm[i].style.borderColor = "black";
		msgs[i].style.display = "none";
		msgs[i].innerHTML = "";
	}
	return;
}

// Update form color, called when there is an error.
function updateFormColor(element) {
	element.style.borderColor = "red";
	return;
}

// Function for updating the error message when a field is blank
function formInputErrorBlank(msg) {
	msg.innerText = "Invalid or no value entered";
	msg.style.display = "inline";
	return;
}

// Function for updating the error message when the inputted 
// value is greater than 50 or less than -50
function formInputErrorOutOfRange(msg) {
	msg.innerText = "Value Out of Range";
	msg.style.display = "inline";
	return;
}

// Function for updating the message when min value is greater than a max value
function formInputErrorOrdering(element, msg) {
	element.style.borderColor = "red";
	msg.innerText = "Start Value is larger or equal to End Value";
	msg.style.display = "inline";
	return;
}
