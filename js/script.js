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
			data.addColumn('string', 'Cause of Death');
			data.addColumn('number', 'Number of Deaths');

		for(var t=0; t<deathData.length; t++){
			if(deathData[t].count>2000){
				var countInt = parseInt(deathData[t].count);
	        	var cause = deathData[t].cause_of_death;
	//			console.log(deathData[t]);
				data.addRows([
					[cause, countInt]
				]);
			}

		}
        var options = {'title':'Most Common NYC Deaths, 2007',
                       'width':800,
                       'height':800};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);

      };

  }
};



ko.applyBindings(viewModel.init());

