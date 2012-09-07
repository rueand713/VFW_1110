/*		Rueben Anderson
		10/5/2011
		VFW 1110
		Project 2 (To-do List App)
*/

// Wait until the DOM loads
window.addEventListener("DOMContentLoaded", function() {

	// The getElementById Function
	function getId(x) {
		var elementId = document.getElementById(x);
		
		return elementId;
	};


	// Create and populate the select field element.
	function makeOpts() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = getId("select"),
			selectOpt1 = getId("opt1"),
			selectOpt2 = getId("opt2"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "exercise");
		
	// Creates the "Physical Training" option group
		var optG1 = document.createElement("optgroup");
			optG1.setAttribute("label", "Physical Training");
			optG1.setAttribute("id", "opt1");
			optG1.innerHTML = "Physical Training";
			makeSelect.appendChild(optG1);
			
	// Creates the "Cardio Training" option group
		var optG2 = document.createElement("optgroup");
			optG2.setAttribute("label", "Cardio Training");
			optG2.setAttribute("id", "opt2");
			optG2.innerHTML = "Cardio Training";
			makeSelect.appendChild(optG2);
		
	// "Physical Training" option populating loop
		for (var i=0; i < physicalList.length; i++) {
			var makeOption = document.createElement("option"),
				optText = physicalList[i];
				
				makeOption.setAttribute("value", optText);
				makeOption.innerHTML = optText;
				optG1.appendChild(makeOption);
		};
	
	// "Cardio Training" option populating loop		
		for (var j=0; j < cardioList.length; j++) {
			var makeOption = document.createElement("option"),
				optText = cardioList[j];
				
				makeOption.setAttribute("value", optText);
				makeOption.innerHTML = optText;
				optG2.appendChild(makeOption);
		};
		
		selectLi.appendChild(makeSelect);
		
};

	function getCheckBoxValue() {
		// Checks for checkboxes with a checked state
		// Stores empty string for unchecked states & an x for checked states
		var daysArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	
		for (var l=0; l<daysArray.length; l++) {
			if (getId(daysArray[l]).checked) {
				day[l] = "&times";		// ascii value for multiplication symbol
			}
				else {
					day[l] = ""
				};
		};
	};

	function storeData() {
		var id = Math.floor(Math.random()*100000001);
	
	// Stores all form field values in an object.
	// Object properties contain arrays with the form lable and input value.
		getCheckBoxValue();
		var item = {
			name: ["Routine:", getId("routineName").value],
			routine: ["Exercise:", getId("exercise").value],
			sun: ["Sun:", day[0]],
			mon: ["Mon:", day[1]],
			tue: ["Tue:", day[2]],
			wed: ["Wed:", day[3]],
			thu: ["Thu:", day[4]],
			fri: ["Fri:", day[5]],
			sat: ["Sat:", day[6]],
			reDu: ["Reps/Duration:", getId("workout").value],
			notes: ["Comments:", getId("comments").value],
			date: ["Start:", getId("startDate").value]
		};
	
		localStorage.setItem(id, JSON.stringify(item));
		alert("Routine Added!");
	};

	function toggleControls(m) {
		switch(m) {
			case "on":
				getId("routineForm").style.display = "none";
				getId("clearLists").style.display = "inline";
				getId("showData").style.display = "none";
				getId("addNew").style.display = "inline";
				break;
			case "off":
				getId("routineForm").style.display = "block";
				getId("clearLists").style.display = "inline";
				getId("showData").style.display = "inline";
				getId("addNew").style.display = "none";
				getId("routines").style.display = "none";
				break;
			default:
				return false;
		};
	
	};

	function getData() {
		toggleControls("on");
			
			if (localStorage.length === 0) {
				alert("There is no data in Local Storage!");
			};
			//Write data from local storage to browser
		var makeDiv = document.createElement("div"),
			makeList = document.createElement("ul");
			
			makeDiv.setAttribute("id", "routines");
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			getId("routines").style.display = "block";
	
		for (var k=0; k<localStorage.length; k++) {
			var makeLi = document.createElement("li"),
				key = localStorage.key(k),
				value = localStorage.getItem(key),
				newObj = JSON.parse(value),
				makeSubList = document.createElement("ul");
				
				makeList.appendChild(makeLi);
				makeLi.appendChild(makeSubList);
				
				for (var n in newObj) {
					var makeSubLi = document.createElement("li"),
						optSubText = newObj[n][0] + " " + newObj[n][1];
						
						makeSubList.appendChild(makeSubLi);
						makeSubLi.innerHTML = optSubText;
				};
			
		};
	};

	function clearData() {
		if (localStorage.length === 0) {
			alert("There is no data to clear!");
		}
			else {
				localStorage.clear();
				alert("All routines have been removed!");
				window.location.reload();
				return false;
			};
	
	};

	// Variables
	var physicalList = ["Dumbell Curls", "Bench Press", "Squats", "Pull-Ups", "Leg Curls", "Sit-Ups"],
		cardioList = ["Running", "Jump Rope", "Swimming", "Bicycling", "Rowing", "Kickboxing"],
		day = [];
			
		makeOpts();							
					
					
	// Set the Link & Submit click events						
	var save = getId("submit"),
		showLink = getId("showData"),
		clearLink = getId("clearLists");
		
		
	showLink.addEventListener("click", getData);
	clearLink.addEventListener("click", clearData);
	save.addEventListener("click", storeData);

});