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

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
       /* var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'Pizza from Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);*/

       

        //console.log(data);
   
        var deathData = model.firstDataInfo()[0];
        console.log(deathData);
       /* var dataArr = []
       // console.log(deathData);
       	//	console.log(info);
       	var options = {'title': 'New York City Deateh Rates, 2007',
					   'width': 400,
					   'height': 300};

       	for(var i=0; i<10; i++){
       		var count = deathData[i].count;
       	    var countInt = parseInt(deathData[i].count);
       		var cause = deathData[i].cause_of_death;
	        var data = [
	        	['Cause', 'Count'],
	        	[cause, countInt]
	        ];
	   //     console.log(data);

	        dataArr.push(data);
	      //  console.log(data);
	      
 		//	console.log(data, 'INNNNN');

       	}
       //	console.log(data, 'OUTTTWWTT');
       console.log(dataArr);
       		var data = new google.visualization.arrayToDataTable([
	        	dataArr
	        ],
	        false);
	        
	       // var data = new google.visualization.arrayToDataTable([dataArr], false);
	        var charted = new google.visualization.PieChart(document.getElementById('chart_div_two'));
        	charted.draw(data, options);
*/

    	//var count = deathData[0].count;
 
		var data = new google.visualization.DataTable();
			data.addColumn('string', 'Cause of Death');
			data.addColumn('number', 'Number of Deaths');
		for(var t=0; t<10; t++){
			var countInt = parseInt(deathData[t].count);
        	var cause = deathData[t].cause_of_death;
			
			data.addRows([
				[cause, countInt]
			]);
		}

		        // Set chart options
        var options = {'title':'Pizza from Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);

      }
  }
};



ko.applyBindings(viewModel.init());

