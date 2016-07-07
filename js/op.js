var model = {
	firstDataInfo: ko.observableArray(),
	lastDataInfo: ko.observableArray(),
	causeDataInfo: ko.observableArray(),
	selectedCause: ko.observable()
};

var viewModel = {
	init: function() {

	}
}

var ajaxOp = {

	init: function(){

		if(model.firstDataInfo()[0] !== undefined){
			model.firstDataInfo.removeAll();
		}
		ajaxOp.render();
	},

	render: function() {

		var that = this;
		$.ajax({
			url: "https://health.data.ny.gov/resource/9p95-5ez3.json?patient_county_code=60",
			dataType: "json"
		})
		.done(function(data){

			model.firstDataInfo().push(data);
			filterInfo.init();
		});

	}
}

var filterInfo = {
	
	init: function() {
		var that = this;

		filterInfo.info = model.firstDataInfo()[0];
		filterInfo.genArr = [];

		filterInfo.payer = document.getElementsByClassName('payer-filter')[0];
		filterInfo.payerVal = filterInfo.payer.value;

		filterInfo.info.forEach(function(data){
		//	console.log(data);
		//	console.log(data.payer, data.overall_opioid, data.year);
			var both = filterInfo.payerVal === data.payer;
			if(both){
				filterInfo.genArr.push(data);
			}
		});

		filterInfo.chartData();
		

	},

	chartData: function() {
		filterInfo.tenArr = [];
		filterInfo.elevenArr = [];
		filterInfo.twelveArr = [];
		filterInfo.thirteenArr = [];
		filterInfo.fourteenArr = [];
		filterInfo.fifteenArr = [];

		filterInfo.genArr.forEach(function(more){
		//	console.log(more);
			var year = more.year;
			var ten = year === "2010";
			var eleven = year === "2011";
			var twelve = year === "2012";
			var thirteen = year === "2013";
			var fourteen = year === "2014";
			var fifteen = year === "2015";
			
			if(ten){
				filterInfo.tenArr.push(more);
			}
			if(eleven){
				filterInfo.elevenArr.push(more);
			}
			if(twelve){
				filterInfo.twelveArr.push(more);
			}
			if(thirteen){
				filterInfo.thirteenArr.push(more);
			}
			if(fourteen){
				filterInfo.fourteenArr.push(more);
			}
			if(fifteen){
				filterInfo.fifteenArr.push(more);
			}
		});
		filterInfo.chartIt();

	},

	chartIt: function() {
		google.load('visualization', '1.0', {'packages':['corechart'], 'callback': drawChart});
      	
		var ten = [filterInfo.tenArr[0].year,
			parseInt(filterInfo.tenArr[0].overall_opioid)];
		var eleven = [filterInfo.elevenArr[0].year,
			parseInt(filterInfo.elevenArr[0].overall_opioid)];
		var twelve = [filterInfo.twelveArr[0].year,
			parseInt(filterInfo.twelveArr[0].overall_opioid)];
		var thirteen = [filterInfo.thirteenArr[0].year,
			parseInt(filterInfo.thirteenArr[0].overall_opioid)];
		var fourteen = [filterInfo.fourteenArr[0].year,
			parseInt(filterInfo.fourteenArr[0].overall_opioid)];
		var fifteen = [filterInfo.fifteenArr[0].year,
			parseInt(filterInfo.fifteenArr[0].overall_opioid)];

  		var barId = filterInfo.causeVal+"_chart_"+filterInfo.genVal+"_bar";
  		var pieId = filterInfo.causeVal+"_chart_"+filterInfo.genVal+"_pie";
  		var barEl = "<div class='chart "+filterInfo.genVal+"' id='"+barId+"'></div>";
		var pieEl = "<div class='chart "+filterInfo.genVal+"' id='"+pieId+"'></div>";
		//	console.log(barEl);
		//$('.first').prepend(countEl);
  		$('.op-first').prepend(pieEl);
  		//console.log(document.getElementsByClassName('first')[0]);
  		$('.op-first').prepend(barEl);
  		
  		var counter = document.getElementsByClassName('count-span')[0];


		filterInfo.charted = [ten, eleven, twelve, thirteen, fourteen, fifteen];

        function drawChart() {

      	 var data = new google.visualization.DataTable();
      		data.addColumn("string", "Year", "year");
      		data.addColumn("number", "Number of Visits", "number");
      		data.addRows(filterInfo.charted);

      		var options = {"title": "Opioid Hospital Visits in NYC paid by "+filterInfo.payerVal,
      					   "width": 350,
      					   "height": 400};

      		var pie = document.getElementById(filterInfo.causeVal+'_chart_'+filterInfo.genVal+'_pie');
      	//	console.log(pie);
      		var bar = document.getElementById(filterInfo.causeVal+'_chart_'+filterInfo.genVal+'_bar');
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
};



var clear = {

	init: function() {

	}
};



var toggle = {

	opInfo: function() {

		$('.landing').fadeOut(function(){
			$('.op-charts').fadeIn();
		});
		
	},

	causeInfo: function() {

		$('.landing').fadeOut(function(){
			$('.cause-charts').fadeIn();
		});
	},

	back: function() {

		$('.background').fadeOut(function(){
			$('.landing').fadeIn();
		});
	},

	getChart: function() {
		console.log("inch by inch");
	}
}





ko.applyBindings(viewModel.init());

