var model = {
	firstDataInfo: ko.observableArray(),
	lastDataInfo: ko.observableArray()
};





var viewModel = {
	init: function() {
	//	ajax.init();
	//	using.init();
	//	charted.init();
	//	filter.init();
	//filter.chartIt();

	}
}

var ajax = {

	init: function(){

		if(model.firstDataInfo()[0] !== undefined){
			model.firstDataInfo.removeAll();
		}
		//ajax.yearSearch = document.getElementsByClassName('year-search')[0];
		//ajax.yearVal = yearSearch.value;
		//console.log(ajax.yearVal);
	//	console.log(yearSearch.value);
		//ajax.yearVal = ajax.yearSearch.value;
		//ajax.url = "https://health.data.ny.gov/resource/9p95-5ez3.json?patient_county_name=Duchess";
		ajax.render();
	},

	render: function() {

		var that = this;
	//	console.log(ajax.url);
	//	console.log(ajax.url);
		$.ajax({
			url: "https://health.data.ny.gov/resource/9p95-5ez3.json?patient_county_code=60",
			dataType: "json"
		})
		.done(function(data){

			model.firstDataInfo().push(data);
			filter.init();
		});

	}
}

var filter = {
	
	init: function() {
		var that = this;

		filter.info = model.firstDataInfo()[0];
		filter.genArr = [];

		filter.payer = document.getElementsByClassName('payer-filter')[0];
		filter.payerVal = filter.payer.value;

		filter.info.forEach(function(data){
		//	console.log(data);
			console.log(data.payer, data.overall_opioid, data.year);
			var both = filter.payerVal === data.payer;
			if(both){
				filter.genArr.push(data);
			}
		});

		filter.chartData();
		

	},

	chartData: function() {
		filter.tenArr = [];
		filter.elevenArr = [];
		filter.twelveArr = [];
		filter.thirteenArr = [];
		filter.fourteenArr = [];
		filter.fifteenArr = [];

		filter.genArr.forEach(function(more){
			var year = more.year;
			var ten = year === "2010";
			var eleven = year === "2011";
			var twelve = year === "2012";
			var thirteen = year === "2013";
			var fourteen = year === "2014";
			var fifteen = year === "2015";
			
			if(ten){
				filter.tenArr.push(more);
			}
			if(eleven){
				filter.elevenArr.push(more);
			}
			if(twelve){
				filter.twelveArr.push(more);
			}
			if(thirteen){
				filter.thirteenArr.push(more);
			}
			if(fourteen){
				filter.fourteenArr.push(more);
			}
			if(fifteen){
				filter.fifteenArr.push(more);
			}
		});
		filter.chartIt();

	},

	chartIt: function() {
		google.load('visualization', '1.0', {'packages':['corechart'], 'callback': drawChart});
      	
		var ten = [filter.tenArr[0].year,
			parseInt(filter.tenArr[0].overall_opioid)];
		var eleven = [filter.elevenArr[0].year,
			parseInt(filter.elevenArr[0].overall_opioid)];
		var twelve = [filter.twelveArr[0].year,
			parseInt(filter.twelveArr[0].overall_opioid)];
		var thirteen = [filter.thirteenArr[0].year,
			parseInt(filter.thirteenArr[0].overall_opioid)];
		var fourteen = [filter.fourteenArr[0].year,
			parseInt(filter.fourteenArr[0].overall_opioid)];
		var fifteen = [filter.fifteenArr[0].year,
			parseInt(filter.fifteenArr[0].overall_opioid)];

  		var barId = filter.causeVal+"_chart_"+filter.genVal+"_bar";
  		var pieId = filter.causeVal+"_chart_"+filter.genVal+"_pie";
  		var barEl = "<div class='chart "+filter.genVal+"' id='"+barId+"'></div>";
		var pieEl = "<div class='chart "+filter.genVal+"' id='"+pieId+"'></div>";
		//	console.log(barEl);
		//$('.first').prepend(countEl);
  		$('.first').prepend(pieEl);
  		//console.log(document.getElementsByClassName('first')[0]);
  		$('.first').prepend(barEl);
  		
  		var counter = document.getElementsByClassName('count-span')[0];
  	//	console.log(counter);

  	/*	function counted() {

  			counter.innerHTML = whiteCount + blackCount + hispanicCount +
  				asianCount;

  		};
  		counted();*/

		filter.charted = [ten, eleven, twelve, thirteen, fourteen, fifteen];

        function drawChart() {

      	 var data = new google.visualization.DataTable();
      		data.addColumn("string", "Year", "year");
      		data.addColumn("number", "Number of Visits", "number");
      		data.addRows(filter.charted);

      		var options = {"title": "Opioid Hospital Visits in NYC paid by "+filter.payerVal,
      					   "width": 350,
      					   "height": 400};

      		var pie = document.getElementById(filter.causeVal+'_chart_'+filter.genVal+'_pie');
      	//	console.log(pie);
      		var bar = document.getElementById(filter.causeVal+'_chart_'+filter.genVal+'_bar');
     	//	if(filter.chartVal === "PieChart"){
	      		var lineChart = new google.visualization.LineChart(pie);
	      //	}
	      	//if(filter.chartVal === "BarChart"){
	      		var barChart = new google.visualization.BarChart(bar);
	      	//}
      		lineChart.draw(data, options);
      		barChart.draw(data, options);
      };
	}
};

var clear = {

	init: function() {

	}
}



ko.applyBindings(viewModel.init());

