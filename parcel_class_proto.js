/*************************************************************************/
/* FUNCTIONS *************************************************************/
/*************************************************************************/

/* setMap()
 * This function sets the Google map given an index for the data frame.
 */
function setMap(num) {
	var centerlatlng = parcels[num].map_center;
	var myOptions = {
		zoom: 18,
		center: centerlatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	//document.getElementById("duns_number").innerHTML = 'DUNS Number: ' + dunsNos[num];
	document.getElementById("address1").innerHTML = parcels[num].addr1;
	document.getElementById('address2').innerHTML = parcels[num].addr2;
	//document.getElementById('map_number').innerHTML = num;

	var Path = new google.maps.Polyline({
		clickable: false,
		geodesic: true,
		path: parcels[num].perimeter,
		strokeColor: "#FF0000",
		strokeOpacity: 1.000000,
		strokeWeight: 5
	});


	Path.setMap(map);

};

/* initialize()
 * This is where any pre-map processing ought to go. 
 */
function initialize() {

	// Here is pre-processing...

	// Then load the first unclassified map.
	setMap(num);
};

/* nextMap()
 * this moves down the data frame to the next map.
 */
function submit() {


	var verdict = classifyParcel();
	if (verdict == null) {
		return;
	} else {
		parcels[num].classification = verdict;
		parcels[num].chk = true;
	}
	clearForm();
	num = (num + 1) % parcels.length;
	setMap(num);

};

function collectAnswers() {

	var elements = document.getElementsByTagName('input');
	var answers = [];

	for(i = 0; i < elements.length; i = i+2) {

		if ( !( elements[i].checked || elements[i+1].checked ) ) {
			alert('Please answer all questions.');
			return [];
		}
	
		answers.push(elements[i].checked);

	}

	return answers;
};

function clearForm() {

	var elements = document.getElementsByTagName('input');

	for(i = 0; i < elements.length; i++) {
		elements[i].checked = false;
	}

};

function classifyParcel() {

	var classification;

	var answers = collectAnswers();
	console.log(answers.length);
	if (answers.length < 1) {
		return null;
	}

	if (answers[0] == false) {
		classification = 'NOT VISIBLE';
	} else if (answers[1] == true) {
		classification = 'RESIDENTIAL';
	} else {
		if (!(answers[2])) {
			if (!(answers[3])) {
				classification = 'SINGLE NONSUITE';
			} else {
				classification = 'SUITE';
			}
		} else {
			if (!(answers[3])) {
				classification = 'CAMPUS';
			} else {
				classification = 'COMPLEX LOCATION';
			}
		}
	}

	return classification;

};

function exportCSV() {
	let csvContent = "data:text/csv;charset=utf-8,";
	for(i = 0; i < parcels.length; i++) {
		csvContent += parcels[i].duns_number + ', '
		csvContent += parcels[i].addr1.replace(/,/g, "") + ', ' + parcels[i].addr2 + ', ' + parcels[i].classification + '\r\n';
	}

	var encodedUri = encodeURI(csvContent);
	if (document.getElementById('export_link')) {
		document.getElementById('export_link').href = encodedUri;
	} else {
	var link = document.createElement('a');
	link.setAttribute('href', encodedUri);
	link.setAttribute('id', 'export_link');
	link.setAttribute('download', 'parcel_classifications.csv');
	link.innerHTML='Click Here to Download';
		document.getElementById('form_canvas').appendChild(link);
	}
};
/*************************************************************************/
/*************************************************************************/
