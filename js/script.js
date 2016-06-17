var model = {
	firstDataInfo: ko.observableArray(),
	lastDataInfo: ko.observableArray()
};





var viewModel = {
	init: function() {
	//	using.init();
		charted.init();
	}
}

$.ajax({
	url: "https://data.cityofnewyork.us/resource/uvxr-2jwn.json?year=2007",
	dataType: "json"
})
.done(function(data){
	//console.log(data);
	model.firstDataInfo().push(data);
	firstData.init();

});

var firstData = {

	init: function() {
		model.firstDataInfo()[0].forEach(function(info){
			//console.log(info);
			
		});
	}
};


$.ajax({
	url: "https://data.cityofnewyork.us/resource/uvxr-2jwn.json?year=2010",
	dataType: "json"
})
.done(function(data){
	//console.log(data);
	model.lastDataInfo().push(data);
	lastData.init();

});

var lastData = {

	init: function() {
		model.lastDataInfo()[0].forEach(function(info){
		//	console.log(info);
		});
	}
};

var charted = {
	// Load the Visualization API and the corechart package.
      init: function() {
      	google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(drawChart);
    //  google.setOnLoadCallback(drawComp);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {
		
		var deathData = model.firstDataInfo()[0];
		var data = new google.visualization.DataTable();
			data.addColumn('string', 'Ethnicity');
			data.addColumn('number', 'Number of Deaths');

		var usingArr = [];


		for(var t=0; t<deathData.length; t++){
	//		console.log(deathData[t]);
			var info = deathData;
			var unInfo = jQuery.unique(info);
			console.log(unInfo);
			var cause = unInfo[t].cause_of_death;
			var ethnicity = ethnicity = deathData[t].ethnicity;
			var AIDS = cause === "HUMAN IMMUNODEFICIENCY VIRUS DISEASE";
			var hispanic = ethnicity === "HISPANIC";
			var white = ethnicity ==="NON-HISPANICE WHITE";
			var male = unInfo[t].sex === "MALE";
			
			
	
				var countInt = parseInt(unInfo[t].count);
				var greater = countInt>1000;
				var cause = unInfo[t].cause_of_death;
				var ethnicity = ethnicity = deathData[t].ethnicity;
				var AIDS = cause === "HUMAN IMMUNODEFICIENCY VIRUS DISEASE";
				var hispanic = ethnicity === "HISPANIC";
				var white = ethnicity ==="NON-HISPANICE WHITE";
				
				if(hispanic && male && greater){
					//console.log(unInfo[t]);

						data.addRows([
							[cause, countInt]
						]);
				//	var equal = deathData[t].cause_of_death !==
		
				}

	    }
	    	var options = {'title':'HIV Deaths, New York City 2007',
	                       'width':800,
	                       'height':800};

	        // Instantiate and draw our chart, passing in some options.
	        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
	        chart.draw(data, options);

      };

  }
};



ko.applyBindings(viewModel.init());

