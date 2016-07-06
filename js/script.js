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

var ajaxOp = {

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
		ajaxOp.render();
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
			console.log(data.payer, data.overall_opioid, data.year);
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
			console.log(more);
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
  	//	console.log(counter);

  	/*	function counted() {

  			counter.innerHTML = whiteCount + blackCount + hispanicCount +
  				asianCount;

  		};
  		counted();*/

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

var ajaxCause = {

	init: function(){

		if(model.firstDataInfo()[0] !== undefined){
			model.firstDataInfo.removeAll();
		}
		ajaxCause.yearSearch = document.getElementsByClassName('year-search')[0];
		//ajax.yearVal = yearSearch.value;
		//console.log(ajax.yearVal);
	//	console.log(yearSearch.value);
		ajaxCause.yearVal = ajaxCause.yearSearch.value;
		ajaxCause.url = "https://data.cityofnewyork.us/resource/uvxr-2jwn.json?year="+ajaxCause.yearVal;
		ajaxCause.render();
	},

	render: function() {

		var that = this;
	//	console.log(ajax.url);
	//	console.log(ajax.url);
		$.ajax({
			url: ajaxCause.url,
			dataType: "json"
		})
		.done(function(data){
			//console.log(data);
			model.firstDataInfo().push(data);

			//firstData.init();
			//filter.init();
			filter.init();
		});

	}
}

var filter = {
	
	init: function() {
		var that = this;

		//console.log(model.firstDataInfo()[0]);
		filter.info = model.firstDataInfo()[0];
		filter.gender = document.getElementsByClassName('gender-filter')[0];
		filter.causeFilt = document.getElementsByClassName('cause-filter')[0];
		filter.chartFilt = document.getElementsByClassName('chart-filter')[0];
		//filter.chartVal = filter.chartFilt.value;
		filter.genVal = filter.gender.value;
		filter.causeVal = filter.causeFilt.value;

		if(filter.genVal === "male"){
			filter.male();
		}
		if(filter.genVal === "female"){
			filter.female();
		}

	},

	male: function() {

		filter.genArr = [];

		this.info.forEach(function(data){
			filter.sex = data.sex;
			if(filter.sex === "MALE"){

				filter.genArr.push(data);
			}
		
		});
		filter.chartDisease();
	},

	female: function() {

		filter.genArr = [];
		
		this.info.forEach(function(data){
			filter.sex = data.sex;
			if(filter.sex === "FEMALE"){

				filter.genArr.push(data);
			}
		});
		filter.chartDisease();
	},

	chartDisease: function() {

		filter.using = [];
		filter.genArr.forEach(function(data){

			var cause = data.cause_of_death;

			if(cause === filter.causeVal){
	
				filter.using.push(data);
			}
		});
		filter.chartData();
	},

	chartData: function() {
		filter.chartWhite = [];
		filter.chartBlack = [];
		filter.chartAsian = [];
		filter.chartHispanic = [];

		filter.using.forEach(function(more){
			//console.log(more);
			var ethnicity = more.ethnicity;
			var cause = more.cause_of_death;
			var white = ethnicity === "NON-HISPANIC WHITE";
			var black = ethnicity === "NON-HISPANIC BLACK";
			var hispanic = ethnicity === "HISPANIC";
			var asian = ethnicity === "ASIAN & PACIFIC ISLANDER";
			var HIV = cause === "HUMAN IMMUNODEFICIENCY VIRUS DISEASE";
			if(white){
				filter.chartWhite.push(more);
			}
			if(black){
				filter.chartBlack.push(more);
			}
			if(hispanic){
				filter.chartHispanic.push(more);
			}
			if(asian){
				filter.chartAsian.push(more);
			}
		});
		filter.chartIt();

	},

	chartIt: function() {
		google.load('visualization', '1.0', {'packages':['corechart'], 'callback': drawChart});
		var whiteCount = parseInt(filter.chartWhite[0].count);
		var blackCount = parseInt(filter.chartBlack[0].count);
		var hispanicCount = parseInt(filter.chartHispanic[0].count);
		var asianCount = parseInt(filter.chartAsian[0].count);
      	
		var chartWhite = [filter.chartWhite[0].ethnicity, 
			whiteCount];
		var chartBlack = [filter.chartBlack[0].ethnicity, 
			blackCount];
		var chartHispanic = [filter.chartHispanic[0].ethnicity,
			hispanicCount];
		var chartAsian = [filter.chartAsian[0].ethnicity, asianCount];

  		var barId = filter.causeVal+"_chart_"+filter.genVal+"_bar";
  		var pieId = filter.causeVal+"_chart_"+filter.genVal+"_pie";
  		var barEl = "<div class='chart "+filter.genVal+"' id='"+barId+"'></div>";
		var pieEl = "<div class='chart "+filter.genVal+"' id='"+pieId+"'></div>";
		var countEl = "<div class='count-div'>Total Number of Deaths: <span class='count-span'></span></div>";
	//	console.log(barEl);
		$('.cause-first').prepend(countEl);
  		$('.cause-first').prepend(pieEl);
  		//console.log(document.getElementsByClassName('first')[0]);
  		$('.cause-first').prepend(barEl);
  		
  		var counter = document.getElementsByClassName('count-span')[0];
  		//console.log(counter);

  		function counted() {

  			counter.innerHTML = whiteCount + blackCount + hispanicCount +
  				asianCount;
  			//	console.log(counter.innerHTML);

  		};
  		counted();

		filter.charted = [chartWhite, chartBlack, chartHispanic, chartAsian];

        function drawChart() {

      	 var data = new google.visualization.DataTable();
      		data.addColumn("string", "Ethnicity", "ethnicity");
      		data.addColumn("number", "Number of Deaths", "number");
      		data.addRows(filter.charted);

      		var options = {"title": ajaxCause.yearVal+" "+filter.causeVal+" Deaths in NYC, "+filter.gender.value,
      					   "width": 300,
      					   "height": 300};


      		var pie = document.getElementById(filter.causeVal+'_chart_'+filter.genVal+'_pie');
      	//	console.log(pie);

      		var bar = document.getElementById(filter.causeVal+'_chart_'+filter.genVal+'_bar');
     	//	if(filter.chartVal === "PieChart"){
	      		var pieChart = new google.visualization.PieChart(pie);
	      //	}
	      	//if(filter.chartVal === "BarChart"){
	      		var barChart = new google.visualization.BarChart(bar);
	      	//}

      		pieChart.draw(data, options);
      		barChart.draw(data, options);
      		console.log(data);
      		console.log(options);
      };
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
	}
}





ko.applyBindings(viewModel.init());

