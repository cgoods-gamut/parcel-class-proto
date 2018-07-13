/*************************************************************************/
/* GLOBALS (Placeholders for a real back-end.) ***************************/
/*************************************************************************/
var coords = [[
	new google.maps.LatLng(39.921897, -82.962416),
	new google.maps.LatLng(39.922391, -82.962373),
	new google.maps.LatLng(39.922439, -82.963370),
	new google.maps.LatLng(39.921948, -82.963413),
	new google.maps.LatLng(39.921897, -82.962416),
	],[
	new google.maps.LatLng(47.803279, -122.326666),
	new google.maps.LatLng(47.804580, -122.326658),
	new google.maps.LatLng(47.804587, -122.327353),
	new google.maps.LatLng(47.803286, -122.327359),
	new google.maps.LatLng(47.803279, -122.326666),
	],[
	new google.maps.LatLng(42.212959, -88.066620),
	new google.maps.LatLng(42.213960, -88.066607),
	new google.maps.LatLng(42.213436, -88.067713),
	new google.maps.LatLng(42.212961, -88.067096),
	new google.maps.LatLng(42.212959, -88.066620),
	],[
	new google.maps.LatLng(34.243214, -81.611637),
	new google.maps.LatLng(34.243998, -81.611462),
	new google.maps.LatLng(34.244058, -81.614461),
	new google.maps.LatLng(34.243268, -81.614586),
	new google.maps.LatLng(34.243214, -81.611637),
	],[
	new google.maps.LatLng(45.785694, -108.509095),
	new google.maps.LatLng(45.785908, -108.508644),
	new google.maps.LatLng(45.785961, -108.508700),
	new google.maps.LatLng(45.786132, -108.508872),
	new google.maps.LatLng(45.785917, -108.509314),
	new google.maps.LatLng(45.785694, -108.509095),
	]];

var centers = [[39.921897, -82.962416],
			   [47.803279, -122.326666],
			   [42.212959, -88.066620],
			   [34.243214, -81.611637],
			   [45.785694, -108.509095]];

var num = 0;

var dunsNos = ['109506258', 
			   '010211449',
			   '007180253',
			   '602642647',
			   '048539977'];

var addr1 = ['1221 MARION RD', 
			   '6825 216TH ST SW STE E9',
			   '885 TELSER RD',
			   '7843 SC HIGHWAY 395',
			   '501 N 28TH ST'];

var addr2 = ['COLUMBUS, OH', 
			   'LYNNWOOD, WA',
			   'LAKE ZURICH, IL	',
			   'NEWBERRY, SC',
			   'BILLINGS, MT'];

var classifications = ['NOT CLASSIFIED', 'NOT CLASSIFIED', 'NOT CLASSIFIED', 'NOT CLASSIFIED', 'NOT CLASSIFIED'];

/*************************************************************************/
/*************************************************************************/


/*************************************************************************/
/* FUNCTIONS *************************************************************/
/*************************************************************************/

/* setMap()
 * This function sets the Google map given an index for the data frame.
 */
function setMap(num) {
	var centerlatlng = new google.maps.LatLng(centers[num][0], centers[num][1]);
	var myOptions = {
		zoom: 18,
		center: centerlatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	//document.getElementById("duns_number").innerHTML = 'DUNS Number: ' + dunsNos[num];
	document.getElementById("address1").innerHTML = addr1[num];
	document.getElementById('address2').innerHTML = addr2[num];

	var Path = new google.maps.Polyline({
		clickable: false,
		geodesic: true,
		path: coords[num],
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

	// Then load the first map.
	setMap(0);
};

/* nextMap()
 * this moves down the data frame to the next map.
 */
function submit() {


	var verdict = classifyParcel();
	if (verdict == null) {
		return;
	} else {
		classifications[num] = verdict;
	}
	clearForm();
	num = (num + 1) % centers.length;
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
	for(i = 0; i < coords.length; i++) {
		csvContent += dunsNos[i] + ', ' + addr1[i] + ', ' + addr2[i] + ', ' + classifications[i] + '\r\n';
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

