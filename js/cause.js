var drawSVG = {

	init: function() {
		var w = '100vw';
		var h = '80vh';
		var circlePadding = 1;
		var body = d3.select('.cause-charts')
			.append('svg')
			.attr('width', w)
			.attr('height', h);
		function startMeUpAgain() {
			filter.init();
			setTimeout(startMeUpAgain, 2000);
		};
		setTimeout(startMeUpAgain, 1500);
	}
};

var ajaxCause = {

	init: function(){

		//if(model.firstDataInfo()[0] !== undefined){
			model.firstDataInfo.removeAll();
		//}
	//	ajaxCause.yearSearch = document.getElementsByClassName('year-search')[0];

	//	ajaxCause.yearVal = ajaxCause.yearSearch.value;
		ajaxCause.url = "https://data.cityofnewyork.us/resource/"+
			"uvxr-2jwn.json?year=2007"//+ajaxCause.yearVal;
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
		//	console.log(model.firstDataInfo()[0]);
			filter.init();

		});

	}
}

var filter = {
	
	init: function() {
		console.log('woo!');
		var that = this;
		var years = [2007, 2008, 2009, 2010, 2011, 2012];

	//	console.log(years[model.newSearch + 1]);
		
		if(model.newSearch < 5){
			model.newSearch = model.newSearch + 1;

		}
		if(model.selectedCause().length !== undefined){
			model.selectedCause.removeAll();
		}
		

		filter.info = model.firstDataInfo()[0];
		//console.log(filter.info);
		filter.info.forEach(function(data){
			var cause = data.cause_of_death;
			var year = data.year;
			var eth = data.ethnicity;
			var count = data.count;
			var sex = data.sex;
			if(count > 2000){
	//			console.log(data);
				model.selectedCause.push(data);
			}
		//	console.log(eth);

			
		});
		model.newSearch = model.newSearch + 1;
		//console.log(model.selectedCause()[model.newSearch].cause_of_death);
		var currentCause = model.selectedCause()[model.newSearch].cause_of_death;
		//model.selectedCause().forEach(function(data){
		//	console.log(model.selectedCause());
		model.selectedCause().forEach(function(each){

			var cause = each.cause_of_death;
			var sex = each.sex;
			//console.log(cause);
			console.log(currentCause);

			if((cause = currentCause) &&
				
				(sex === "MALE")) {
				//model.causeDataInfo.removeAll();
				model.causeDataInfo.push(each);
				model.head(each.cause_of_death);
				model.year(each.year);
				model.sex(each.sex);
			}
		})
		//})
		filter.cause();

	},

	cause: function() {
	//	console.log(model.causeDataInfo());
		var blackArray = [];
		var whiteArray = [];
		var hispArray = [];
		var asianArray = [];

		var info = model.causeDataInfo();
		info.forEach(function(data){
		//	console.log(data);
		//	console.log(data.ethnicity);
		//	console.log(data);
			if(data.ethnicity === "NON-HISPANIC BLACK"){
				blackArray.push(data);
			//	console.log(data);
			}
			if(data.ethnicity === "NON-HISPANIC WHITE"){
				whiteArray.push(data);
				//console.log(data);
			}
			if(data.ethnicity === "HISPANIC"){
				hispArray.push(data);
			}
			if(data.ethnicity === "ASIAN & PACIFIC ISLANDER"){
				asianArray.push(data);
			}
		})
		var useInfo = [];
		var black = blackArray[0];
		var white = whiteArray[0];
		var hispanic = hispArray[0];
		var asian = asianArray[0];


		if(black){
			useInfo.push(black.count)
		}
		if(white){
			useInfo.push(white.count)
		}
		if(hispanic){
			useInfo.push(hispanic.count)
		}
		if(asian){
			useInfo.push(asian.count)
		}

		//console.log(useInfo);
		var w = '100vw';
		var h = '80vh';
		var svg = d3.select('svg');
		var transition = d3.transition();

		svg.selectAll('circle')
			.data(useInfo)
			.enter()
			.append('circle')
			.attr('cx', function(d, i){
				return d/40 + 325;
			})
			.attr('cy', function(d){
				return d/100 + 325; 
			})
			.attr('r', function(d, i){
				return d/100;
			})
			.attr('fill', function(d){
				d = d - 1900;
				return "rgb(0,0, " + (d) + ")";
			})

		/*svg.selectAll('text')
			.data(useInfo)
			.enter()
			.append('text')
			.text(function(d){
				return d;
			})
			.attr('x', function(d, i){
				return i * (w/useInfo.length) + 40;
			})
			.attr('y', function(d){
				return h - d + 30;
			})
			.attr('fill', 'white')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '11px')
			.attr('text-anchor', 'middle');
*/
		svg.selectAll('circle')
			.transition()
			.attr('fill', 'green')
			.attr('cx', function(d, i){
				return d/40 + 325;
			})
			.attr('cy', function(d){
				return d/100 + 325; 
			})
			.attr('r', function(d, i){
				return d/100;
			})
			.attr('fill', function(d){
				d = d - 1900;
				return "rgb(0,0, " + (d) + ")";
			})
			.duration(650);
		/*
		svg.selectAll('text')
			.transition()		
			.text(function(d){
				return d;
			})
			.attr('x', function(d, i){
				return i * (w/useInfo.length) + 40;
			})
			.attr('y', function(d){
				return h - d + 30;
			})
			.duration(650);

*/


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

drawSVG.init();

ajaxCause.init();