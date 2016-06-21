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
	function unique(list) {
	    var result = [];
	    $.each(list, function(i, e) {
	        if ($.inArray(e, result) == -1) result.push(e);
	    });
	    return result;
	}
	var dupRemove = unique(data);
	model.firstDataInfo().push(dupRemove);
	//console.log(dupRemove);
	firstData.init();

});

var firstData = {

	init: function() {
		model.firstDataInfo()[0].forEach(function(info){
			//console.log(info);
			
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
		//console.log('hey');
		var info = model.firstDataInfo()[0];
		
		//	data.addColumn('string', 'Ethnicity');
		//	data.addColumn('number', 'Number of Deaths');

		var usingArr = [];


		//deathData.forEach(function(info){

			for(var b=0; b<5;b++){
				var cause = info[b].cause_of_death;
				var sex = info[b].sex;
				var ethnicity = info[b].ethnicity;
				var count = parseInt(info[b].count);
				var counted = info[b].count;

			
				usingArr.push([cause, count])
			}
			
	//	});
		console.log(usingArr[0]);
		var use = usingArr;
			var data = new google.visualization.DataTable();
				data.addColumn("string", "Cause", "cause");
				data.addColumn("number", "Number of Deaths", "number");
		console.log(use);
		console.log(data);
		data.addRows(usingArr);
		//console.log(data);
		
		
		console.log(data);

	    	var options = {'title':'Deaths, New York City 2007',
	                       'width':800,
	                       'height':800};

	        // Instantiate and draw our chart, passing in some options.
	        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
	        chart.draw(data, options);

      };
   /*       function drawChart() {
          	var using =  [['Nitrogen', 0.78],
        ['Oxygen', 0.21],
        ['Other', 0.01]];
      // Define the chart to be drawn.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Element');
      data.addColumn('number', 'Percentage');
      data.addRows(
 		using
      );

      // Instantiate and draw the chart.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, null);
    }*/

  }
};



ko.applyBindings(viewModel.init());

