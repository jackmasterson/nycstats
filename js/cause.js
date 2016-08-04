var ajaxCause = {

	init: function(){

		if(model.firstDataInfo()[0] !== undefined){
			model.firstDataInfo.removeAll();
		}
		ajaxCause.yearSearch = document.getElementsByClassName('year-search')[0];

		ajaxCause.yearVal = ajaxCause.yearSearch.value;
		ajaxCause.url = "https://data.cityofnewyork.us/resource/"+
			"uvxr-2jwn.json?year="+ajaxCause.yearVal;
		ajaxCause.render();
	},
 
	render: function() {

		var that = this;
		$.ajax({
			url: ajaxCause.url,
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
		filter.gender = document.getElementsByClassName('gender-filter')[0];
		filter.causeFilt = document.getElementsByClassName('cause-filter')[0];
		filter.chartFilt = document.getElementsByClassName('chart-filter')[0];
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
				var cause = data.cause_of_death;
				model.causeDataInfo.push(cause);
			}
		
		});
		$('.hidden-cause').show();
	},

	female: function() {

		filter.genArr = [];
		
		this.info.forEach(function(data){
			filter.sex = data.sex;
			if(filter.sex === "FEMALE"){

				filter.genArr.push(data);			
				var cause = data.cause_of_death;

				model.causeDataInfo.push(cause);
			}
		});
		$('.hidden-cause').show();
		
	},

	chartDisease: function() {
	//	filter.val = ko.observableArray();
	//	filter.causeData = ko.observableArray();

	/*	$(filter.causeFilt).children('option').each(function(){
			var val = this.value;
			filter.val().push(val);

		});*/
	//	filter.children = $(filter.causeFilt).children();
	//	console.log(filter.children[0].value);
		filter.using = [];
		model.firstDataInfo().forEach(function(info){

			info.forEach(function(data){

				var cause = data.cause_of_death;
				if(cause === model.selectedCause()){
					filter.using.push(data);
				}
			})
		//	console.log(model.selectedCause());
		//	if(info === model.selectedCause()){
		//		filter.using.push(info);
		//	}
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

  		var barId = model.selectedCause()+"_chart_"+filter.genVal+"_bar";
  		var pieId = model.selectedCause()+"_chart_"+filter.genVal+"_pie";
  		var barEl = "<div class='chart "+filter.genVal+"' id='"+barId+"'></div>";
		var pieEl = "<div class='chart "+filter.genVal+"' id='"+pieId+"'></div>";
		var countEl = "<div class='count-div'>Total Number of Deaths: "+
			"<span class='count-span'></span></div>";
		$('.cause-first').prepend(countEl);
  		$('.cause-first').prepend(pieEl);
  		$('.cause-first').prepend(barEl);
  		
  		var counter = document.getElementsByClassName('count-span')[0];

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

      		var options = {"title": ajaxCause.yearVal+" "+model.selectedCause()+" Deaths in NYC, "+filter.gender.value,
      					   "width": 300,
      					   "height": 300};

      		var pie = document.getElementById(model.selectedCause()+
      			'_chart_'+filter.genVal+'_pie');

      		var bar = document.getElementById(model.selectedCause()+
      			'_chart_'+filter.genVal+'_bar');
      		var pieChart = new google.visualization.PieChart(pie);
      		var barChart = new google.visualization.BarChart(bar);

      		pieChart.draw(data, options);
      		barChart.draw(data, options);
      };
	}
};