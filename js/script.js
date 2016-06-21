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
		var stat = model.firstDataInfo()[0];
		
		//	data.addColumn('string', 'Ethnicity');
		//	data.addColumn('number', 'Number of Deaths');

		var hispArr = [];
		var whiteArr = [];
		var filterArr = [];

		//console.log(info);
		stat.forEach(function(info){

		//	for(var b=0; b<info.length;b++){
			//console.log(info);
				var cause = info.cause_of_death;
				var sex = info.sex;
				var ethnicity = info.ethnicity;
				var count = parseInt(info.count);
				var counted = info.count;
				var HIV = cause === "HUMAN IMMUNODEFICIENCY VIRUS DISEASE";
			//	console.log(HIV);
				var male = sex === "MALE";
				var hispanic = ethnicity === "HISPANIC";
				var white = ethnicity === "NON-HISPANIC WHITE";
			//	console.log(male);

				if(HIV && male){
					if(hispanic){
						hispArr.push(info)
					}
					if(white){
						whiteArr.push(info)
					}
				//	console.log(info);
				}
			//}
		//	console.log(usingArr);

			
		});
	//	console.log(hispArr[0].number);
	//	console.log(whiteArr);
		var count = parseInt(info.count);
		var hispInfo = [hispArr[0].ethnicity, parseInt(hispArr[0].count)];
		var whiteInfo = [whiteArr[0].ethnicity, parseInt(whiteArr[0].count)];

		var results = [];

		results.push(hispInfo, whiteInfo);
		console.log(results);
/*		for (var g = 0; g < usingArr.length - 1; g++) {
		//	console.log(usingArr[g]);
			var first = usingArr[g];
			var second = usingArr[g+1];
			var equalCause = first.cause === second.cause;
			var equalCount = first.count === second.count;
			var equalEth = first.ethnicity === second.ethnicity;
			var equalSex = first.sex === second.sex;
			console.log(equalCause, equalCount, equalEth, equalSex);
			//console.log(first, 'HEY', second);
		//	console.log(usingArr[g+1]);
		    if (equalCause && equalCount && equalEth && equalSex) {
		//    	console.log(first);
		        results.push(usingArr[g]);
		    }
		}*/
	//	console.log(results);


//console.log(eliminateDuplicates(usingArr[0]));
	//console.log(usingArr.filter());
		//console.log(usingArr.filter());
	//	var use = usingArr;
			var data = new google.visualization.DataTable();
				data.addColumn("string", "Ethnicity", "ethnicity");
				data.addColumn("number", "Number of Deaths", "number");
		//console.log(use);
		//console.log(data);
		data.addRows(results);
		//console.log(data);
		
		
		console.log(data);

	    	var options = {'title':'Deaths, New York City 2007',
	                       'width':800,
	                       'height':800};

	        // Instantiate and draw our chart, passing in some options.
	        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
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
      chart.draw(data, null);*/
 //   }

  }
};



ko.applyBindings(viewModel.init());

