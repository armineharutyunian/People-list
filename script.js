var names = [];
var sevenNamesEntered = false;
var sortableNames = [];

var addInput = () => {
	var inputName = document.getElementById("name-input").value;
	var nameObj = {
		name: inputName,
		color: pickRandomColor()
	}
	names.push(nameObj);
	var count = document.getElementById("input-counter").innerHTML;
	if (inputName !== "") count++;
	document.getElementById("input-counter").innerHTML = count;
	allowSubmit();
	document.getElementById("myForm").reset();
	var namebtn = document.getElementById("name-button");
	if (namebtn !== null)
		namebtn.onclick = showNames();
}

var showNames = () => {
	for (var i = 0; i < names.length; i++)
		{		
			var para = document.createElement("P");
			var node = document.createTextNode(names[i].name);
			para.appendChild(node);
			para.style.color = names[i].color;
			sortableNames.push(para);
			para.className = "sortable";
			para.id = i;
			para.setAttribute("draggable", true);				
			document.getElementById("myForm").style.display = "none";
			document.getElementById("name-button").style.display = "none";
			document.getElementById("caption").innerHTML = "Now you can sort the names by dragging and dropping";
		}
		for (var i = 0; i < sortableNames.length; i++)
			document.body.appendChild(sortableNames[i]);
}

var allowSubmit = () => {
	if (this.sevenNamesEntered === false)
		{
			if (Number(document.getElementById("input-counter").innerHTML) >= 7)
				{					
					this.sevenNamesEntered = true;
					var newbtn = document.createElement("BUTTON");				
					newbtn.innerHTML = "Show names";
					document.getElementById("myForm").appendChild(newbtn);					
					newbtn.setAttribute("id","name-button");
				}
		}
}

var pickRandomColor = () => {
	var color = '#';
	var symbols = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
	for (var i = 0; i < 6; i++)
		color += symbols[Math.floor(Math.random() * symbols.length)];
	return color;
}

document.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("Text", event.target.id);
});

document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

document.addEventListener("dragleave", function(event) {
    if ( event.target.className === "sortable" ) {
        event.target.style.border = "";
    }
});

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

document.addEventListener("drop", function(event) {
    event.preventDefault();
    if ( event.target.className === "sortable" ) {
        var data = event.dataTransfer.getData("Text");		
		var dragged = document.getElementById(data);
		var pos1 = sortableNames.indexOf(dragged);
		var pos2 = sortableNames.indexOf(event.target);
		sortableNames.move(pos1,pos2);
		for (var i = 0; i < sortableNames.length; i++)
			document.body.appendChild(sortableNames[i]);
    }
});

