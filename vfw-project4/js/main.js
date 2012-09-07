/*		Rueben Anderson
		10/18/2011
		VFW 1110
		Project 4 (To-do List App)
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
		
	// Create the default option
		var optDef = document.createElement("option");
			optDef.setAttribute("label", "--Choose An Exercise--");
			optDef.innerHTML = "--Choose An Exercise--";
			makeSelect.appendChild(optDef);
			
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

	function setCheckBoxValue(item) {
		// Checks for checkboxes with a checked state
		// Adds a checked value to the checked attribute for true
		
			if (item.sun[1] == "&times") {
				getId("sunday").setAttribute("checked", "checked");
			}
			
			if (item.mon[1] == "&times") {
				getId("monday").setAttribute("checked", "checked");
			}
			
			if (item.tue[1] == "&times") {
				getId("tuesday").setAttribute("checked", "checked");
			}
			
			if (item.wed[1] == "&times") {
				getId("wednesday").setAttribute("checked", "checked");
			}
			
			if (item.thu[1] == "&times") {
				getId("thursday").setAttribute("checked", "checked");
			}
			
			if (item.fri[1] == "&times") {
				getId("friday").setAttribute("checked", "checked");
			}
			
			if (item.sat[1] == "&times") {
				getId("saturday").setAttribute("checked", "checked");
			}
		
	};

	function storeData(key) {
		
		// Checks if there is no key, which means this is a new routine and needs a new key.
		if (!key) {	
			var id = Math.floor(Math.random()*100000001),
				isNew = true;
		} 
			else {
				// Set the id to the existing key that is being edited so that the data will be overwritten.
				// This key is the same key being passed from the editSubmit event handler.
				var	id = key,
					isNew = false;
			};
	
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
		isOld == false;
		getId("startDate").setAttribute("disabled", "");
		if (isNew === true) {
			alert("Routine Added!");
		}
			else {
				alert("Routine Updated!");
			};
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
			getId("startDate").setAttribute("disabled", "");
			
			if (localStorage.length === 0) {
				autoFillData();
				alert("There is no data in Local Storage! Default data has been added.");
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
				linksLi = document.createElement("li"),
				key = localStorage.key(k),
				value = localStorage.getItem(key),
				newObj = JSON.parse(value),
				makeSubList = document.createElement("ul");
				
				makeList.appendChild(makeLi);
				makeLi.appendChild(makeSubList);
				getImage(newObj.routine[1], makeSubList);
				
				for (var n in newObj) {
					var makeSubLi = document.createElement("li"),
						optSubText = newObj[n][0] + " " + newObj[n][1];
						
						makeSubList.appendChild(makeSubLi);
						makeSubLi.innerHTML = optSubText;
						makeSubList.appendChild(linksLi);
				};
			makeRoutineLinks(localStorage.key(k), linksLi); // Creates the edit and delete links for each routine in local storage.
		};
	};

	// Get the appropriate image for the exercise category
	function getImage(imgName, makeSubList) {
		// Get image file names by returning the substring from index 0 to the first space
		var endMark = imgName.indexOf(" ");
		
		if (endMark === -1) {
			imgName = imgName.substring(0,imgName.length);
		}
			else {
				imgName = imgName.substring(0, endMark);
			};
		
		var imageLi = document.createElement("li"),
			newImg = document.createElement("img"),
			setSrc = newImg.setAttribute("src", "images/" + imgName + ".png");
		
		makeSubList.appendChild(imageLi);
		imageLi.appendChild(newImg);
		
	};

	// JSON Object which will auto populate local storage.
	function autoFillData() {
		var json = {
				"routine1": {
					"name": ["Routine:", "Free Weights"],
					"routine": ["Exercise:", "Dumbbell Curls"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", "&times"],
					"tue": ["Tue:", ""],
					"wed": ["Wed:", "&times"],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", "&times"],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 20],
					"notes": ["Comments:", "25lb weights"],
					"date": ["Start:", "2011-10-15"]
				},
				"routine2": {
					"name": ["Routine:", "Free Run"],
					"routine": ["Exercise:", "Running"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", "&times"],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", "&times"],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", "&times"],
					"reDu": ["Reps/Duration:", 5],
					"notes": ["Comments:", "Mile duration"],
					"date": ["Start:", "2011-10-15"]
				}
		};
		
		// Store the JSON object into local storage
		for (var n in json) {
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};


	/* Make Routine Links
	   Create the edit and delete links for reach stored item when displayed. */
	function makeRoutineLinks(key, linksLi) {
		
			// Define edit delete link variables
		var editLink = document.createElement("a"),
			editText = "Edit Routine",
			deleteLink = document.createElement("a"),
			deleteText = "Delete Routine";
			
			// Add edit single routine link
			editLink.href = "#";
			editLink.key = key;
			editLink.addEventListener("click", editRoutine);
			editLink.innerHTML = editText;
			linksLi.appendChild(editLink);
			
			// Add line break
		var breakTag = document.createElement("br");
			linksLi.appendChild(breakTag);	
			
			// Add delete single routine link
			deleteLink.href = "#";
			deleteLink.key = key;
			deleteLink.addEventListener("click", deleteRoutine);
			deleteLink.innerHTML = deleteText;
			linksLi.appendChild(deleteLink);
	};

	function deleteRoutine() {
		var ask = confirm("Are you sure you want to delete this routine?");
		
		if (ask) {
			localStorage.removeItem(this.key);
			alert("Routine has been successfully removed!");
			window.location.reload();
		}
			else {
				alert("The routine was not deleted.");
			};
	};

	function editRoutine() {
		// Reset error messages just incase the user inputs invalid info and then chooses 
		// to edit another routine. Which would not reset them because they reset in the validator function.
		resetErrMsg();
		
		// The routine is being edited so a true value is assigned to the isOld variable to 
		// prevent the validator from forcing a new updated start date and to prevent backdating the field is disabled.
		if (this.key) {
			isOld = true;
			getId("startDate").setAttribute("disabled", "disabled");
		};
		
		// Grab the data from the Local Storage item
		var value = localStorage.getItem(this.key),
			item = JSON.parse(value);
			
			// Shows the form
			toggleControls("off");
	
			// Populate the form fields with current lcoalStorage values.
			getId("routineName").value = item.name[1];
			getId("exercise").value = item.routine[1];
			getId("workout").value = item.reDu[1];
			getId("comments").value = item.notes[1];
			getId("startDate").value = item.date[1];
			
			// Function that populates the checkbox fields.
			setCheckBoxValue(item);
			
			// Remove the initial listener from the input button
			save.removeEventListener("click", storeData);
			// Change submit button value to edit button
			getId("submit").value = "Edit Routine";
			
		var	editSubmit = getId("submit");
			// Save the key value in this function as a property of the edit submit event
			// So the value may be reused when the edited data is saved.
			editSubmit.addEventListener("click", validate);
			editSubmit.key = this.key;
	};

	
	function resetErrMsg() {
		var	getRoutine = getId("routineName"),
			getExercise = getId("exercise"),
			getWorkout = getId("workout"),
			getStartDate = getId("startDate");
			
		//Reset error messages
			errMsg.innerHTML = "";
			errMsg.style.color = "#CC9B73";
			getRoutine.style.border = "1px solid black";
			getExercise.style.border = "1px solid black";
			getWorkout.style.border = "1px solid black";
			getStartDate.style.border = "1px solid black";
			getId("routineDays").style.border = "none";
	
	};
	
	function validate(e) {
		// Define the elements we want to check
		var	getRoutine = getId("routineName"),
			getExercise = getId("exercise"),
			getWorkout = getId("workout"),
			getStartDate = getId("startDate"),
			dayValidator = [
				[getId("sunday")],
				[getId("monday")],
				[getId("tuesday")],
				[getId("wednesday")],
				[getId("thursday")],
				[getId("friday")],
				[getId("saturday")]
			];
			
			// Call function to reset error messages
			resetErrMsg();
			
			
			// Get error messages
		var	messageArr = [],
			err = "";
			
			// Routine validation
			if (getRoutine.value === "") {
				err = "Please input a name for this routine.";
			
				getRoutine.style.border = "2px solid #990000";
				messageArr.push(err);
			};
			
			// Exercise validation
			if (getExercise.value === "--Choose An Exercise--") {
				err = "Please choose an exercise."
				
				getExercise.style.border = "2px solid #990000";
				messageArr.push(err);
			};
			
			// Workout validation
			if (getWorkout.value <= 0) {
				err = "Please choose a value greater than 0.";
				
				getWorkout.style.border = "2px solid #990000";
				messageArr.push(err);
			};
			
			
			// Checkbox validation
			for (var z=0, err=""; z < dayValidator.length; z++) {
				if (dayValidator[z][0].checked) {
					err += "chk";
				}
					else {
						err += "";
					};
			};
			
			if (err === "") {
				err = "Please choose atleast 1 day for this routine.";
				
				getId("routineDays").style.border = "1px solid #990000";
				messageArr.push(err);
			};
			
			
			// StartDate validation
			var re = /\d{4}-{1}\d{2}-{1}\d{2}/;
			if (re.test(getStartDate.value) === false) {
				err = "Please enter a date in valid format.";
				
				getStartDate.style.border = "2px solid #990000";
				messageArr.push(err);
			}
				else {	
					if (isOld === false) {
						var startVal = getStartDate.value,
							year = startVal.substring(0, 4),
							month = startVal.substring(5, 7),
							day = startVal.substring(8, 10),
							today = new Date(),
							inDate = new Date();
							inDate.setFullYear(year);
							inDate.setDate(day);
							inDate.setMonth(month-1);
												
						if (Date.parse(inDate) < Date.parse(today)) {
							err = "Please enter the current date or a future date.";
						
							getStartDate.style.border = "2px solid #990000";
							messageArr.push(err);
						};
					};
				};
				
			
						
			// If there are errors, display them on the screen
			if (messageArr.length >= 1 ) {
				for (var u=0; u < messageArr.length; u++) {
					var txt = document.createElement("li");
					
					txt.innerHTML = messageArr[u];
					errMsg.appendChild(txt);
				};
				errMsg.style.color = "#990000";
				e.preventDefault();
				return false;
			}
				else {
					// If everything is ok save the data. Send the key value from the edit data function
					// This key value was passed through the editSubmit event listener as a property.
					storeData(this.key);
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
	
	function getRangeValue() {
		var value = getId("rangeVal");
		
		
		// Input the value of the range into the span tag following it
		value.innerHTML = "";
		value.innerHTML =  " " + updateRange.value;
	};
	
	

	// Variables
	var physicalList = ["Dumbbell Curls", "Bench Press", "Squats", "Pull-Ups", "Leg Curls", "Sit-Ups"],
		cardioList = ["Running", "Jump Rope", "Swimming", "Bicycling", "Rowing", "Kickboxing"],
		day = [],
		errMsg = getId("errors"),
		isOld = false;
			
		makeOpts();							
					
					
	// Set the Link & Submit click events						
	var save = getId("submit"),
		showLink = getId("showData"),
		clearLink = getId("clearLists"),
		updateRange = getId("workout");
		
		
	showLink.addEventListener("click", getData);
	clearLink.addEventListener("click", clearData);
	save.addEventListener("click", validate);
	updateRange.addEventListener("mousemove", getRangeValue);

});