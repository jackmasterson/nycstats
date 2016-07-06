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
		ajax.yearSearch = document.getElementsByClassName('year-search')[0];
		//ajax.yearVal = yearSearch.value;
		//console.log(ajax.yearVal);
	//	console.log(yearSearch.value);
		ajax.yearVal = ajax.yearSearch.value;
		ajax.url = "https://data.cityofnewyork.us/resource/uvxr-2jwn.json?year="+ajax.yearVal;
		ajax.render();
	},

	render: function() {

		var that = this;
	//	console.log(ajax.url);
	//	console.log(ajax.url);
		$.ajax({
			url: ajax.url,
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
		$('.first').prepend(countEl);
  		$('.first').prepend(pieEl);
  		//console.log(document.getElementsByClassName('first')[0]);
  		$('.first').prepend(barEl);
  		
  		var counter = document.getElementsByClassName('count-span')[0];
  		console.log(counter);

  		function counted() {

  			counter.innerHTML = whiteCount + blackCount + hispanicCount +
  				asianCount;

  		};
  		counted();

		filter.charted = [chartWhite, chartBlack, chartHispanic, chartAsian];

        function drawChart() {

      	 var data = new google.visualization.DataTable();
      		data.addColumn("string", "Ethnicity", "ethnicity");
      		data.addColumn("number", "Number of Deaths", "number");
      		data.addRows(filter.charted);

      		var options = {"title": ajax.yearVal+" "+filter.causeVal+" Deaths in NYC, "+filter.gender.value,
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
}



ko.applyBindings(viewModel.init());

