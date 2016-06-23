var model = {
	firstDataInfo: ko.observableArray(),
	lastDataInfo: ko.observableArray()
};





var viewModel = {
	init: function() {
	//	using.init();
	//	charted.init();
	//	filter.init();
	//filter.chartIt();

	}
}

$.ajax({
	url: "https://data.cityofnewyork.us/resource/uvxr-2jwn.json?year=2007",
	dataType: "json"
})
.done(function(data){

	model.firstDataInfo().push(data);

	//firstData.init();
	//filter.init();

});

var firstData = {

	init: function() {

	}
};

var filter = {
	
	init: function() {
		var that = this;
		filter.info = model.firstDataInfo()[0];
		filter.gender = document.getElementsByClassName('gender-filter')[0];
		filter.causeFilt = document.getElementsByClassName('cause-filter')[0];
		filter.genVal = filter.gender.value;
		filter.causeVal = filter.causeFilt.value;

		if(filter.genVal === "male"){
			filter.male();
		}
		if(filter.genVal === "female"){
			filter.female();
		}
		if(filter.genVal === "compare"){
			filter.compare();
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

	compare: function() {
		console.log('shall be compared!');
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

      	
		var chartWhite = [filter.chartWhite[0].ethnicity, 
			parseInt(filter.chartWhite[0].count)];
		var chartBlack = [filter.chartBlack[0].ethnicity, 
			parseInt(filter.chartBlack[0].count)];
		var chartHispanic = [filter.chartHispanic[0].ethnicity,
			parseInt(filter.chartHispanic[0].count)];
			
	//	var pieId = "chart_div_"+filter.causeVal;
  	//	var pieEl = "<div class='chart' id='"+pieId+"'></div>";
  	//	$('body').append(pieEl);

  	//	var barId = "chart_div_two_"+filter.causeVal;
  	//	var barEl = "<div class='chart' id='"+barId+"'></div>";

  		var genderId = filter.causeVal+"_chart_"+filter.genVal;
  		var genderEl = "<div class='chart' id='"+genderId+"'></div>";
  		//var femaleId = "female_div_"+filter.genVal;
  	//	$('body').append(barEl);

  		$('body').append(genderEl)


		filter.charted = [chartWhite, chartBlack, chartHispanic];

      function drawChart() {

      	var data = new google.visualization.DataTable();
      		data.addColumn("string", "Ethnicity", "ethnicity");
      		data.addColumn("number", "Number of Deaths", "number");
      		data.addRows(filter.charted);

      		var options = {"title": "2007 "+filter.causeVal+" Deaths in NYC, "+filter.gender.value,
      					   "width": 300,
      					   "height": 300};

   //   		var pie = document.getElementById('chart_div_'+filter.causeVal);
     // 		var bar = document.getElementById('chart_div_two_'+filter.causeVal);
      		var gen = document.getElementById(filter.causeVal+'_chart_'+filter.genVal);
      		//var chartPie = new google.visualization.PieChart(pie);
      		//var chartBar = new google.visualization.BarChart(bar);
      		var genderBar = new google.visualization.BarChart(gen);
      		genderBar.draw(data, options);
      		//chartPie.draw(data, options);
      		//chartBar.draw(data, options);
      };
	}
};

var clear = {

	init: function() {

	}
}



ko.applyBindings(viewModel.init());

