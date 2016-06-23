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


/*var charted = {
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

		var hispArrM = [];
		var hispArrF = [];

		var whiteArrM = [];
		var whiteArrF = [];

		var blackArrM = [];
		var blackArrF = [];

		var aapiArr = [];

		var resultsMale = [];
		var resultsFemale = [];

		var heartMale = [];
		var heartFemale = [];


		stat.forEach(function(info){
				var cause = info.cause_of_death;
				var sex = info.sex;
				var ethnicity = info.ethnicity;
				var HIV = cause === "HUMAN IMMUNODEFICIENCY VIRUS DISEASE";
				var hep = cause === "VIRAL HEPATITIS";
				var count = parseInt(info.count);
				var greater = count>4000;
		/*		if(greater && male){
					heartMale.push(info)
				}
				if(greater && female){
					heartFemale.push(info)
				}*/
				//console.log(cause);
	//			if(hep){
	//				console.log(info);
	//			}
		/*		var male = sex === "MALE";
				var female = sex === "FEMALE";
				var hispanic = ethnicity === "HISPANIC";
				var white = ethnicity === "NON-HISPANIC WHITE";
				var aapi = ethnicity === "ASIAN & PACIFIC ISLANDER";
				var black = ethnicity === "NON-HISPANIC BLACK";

				if(HIV && male){
					if(hispanic){
						hispArrM.push(info)
					}
					if(white){
						whiteArrM.push(info)
					}
					if(black){
						blackArrM.push(info);
					}
				}
				if(HIV && female){
					if(hispanic){
						hispArrF.push(info)
					}
					if(white){
						whiteArrF.push(info)
					}
					if(black){
						blackArrF.push(info);
					}
				}

			
		});
		var hispInfoMale = [hispArrM[0].ethnicity, parseInt(hispArrM[0].count)];
		var hispInfoFemale = [hispArrF[0].ethnicity, parseInt(hispArrF[0].count)];

		var whiteInfoMale = [whiteArrM[0].ethnicity, parseInt(whiteArrM[0].count)];
		var whiteInfoFemale = [whiteArrF[0].ethnicity, parseInt(whiteArrF[0].count)];

		var blackInfoMale = [blackArrM[0].ethnicity, parseInt(blackArrM[0].count)];
		var blackInfoFemale = [blackArrF[0].ethnicity, parseInt(blackArrF[0].count)];

	//	var greaterMale = [heartMale[0].cause_of_death, parseInt(heartMale[0].count)];
	//	var greaterFemale = [heartFemale[0].cause_of_death, parseInt(heartFemale[0].count)];
		

		resultsMale.push(hispInfoMale, whiteInfoMale, blackInfoMale);
		resultsFemale.push(hispInfoFemale, whiteInfoFemale, blackInfoFemale);

			var dataM = new google.visualization.DataTable();
				dataM.addColumn("string", "Ethnicity", "ethnicity");
				dataM.addColumn("number", "Number of Deaths", "number");
				dataM.addRows(resultsMale);

	    	var optionsM = {'title':'HIV Male Deaths, New York City 2007',
	                       'width':600,
	                       'height':600};

	        // Instantiate and draw our chart, passing in some options.
	        var chartM = new google.visualization.PieChart(document.getElementById('chart_div'));
	        chartM.draw(dataM, optionsM);

			var dataF = new google.visualization.DataTable();
				dataF.addColumn("string", "Ethnicity", "ethnicity");
				dataF.addColumn("number", "Number of Deaths", "number");
				dataF.addRows(resultsFemale);

	    	var optionsF = {'title':'HIV Female Deaths, New York City 2007',
	                       'width':600,
	                       'height':600};

	        // Instantiate and draw our chart, passing in some options.
	        var chartF = new google.visualization.PieChart(document.getElementById('chart_div_two'));
	        chartF.draw(dataF, optionsF);

      };
  	}
};*/

var filter = {
	
	init: function() {
		var that = this;
		filter.info = model.firstDataInfo()[0];

		var ethnicFilter = document.getElementsByClassName('ethnicity-filter')[0];
		var gender = document.getElementsByClassName('gender-filter')[0];
		var genVal = gender.value;

		if(genVal === "male"){
			filter.male();
		}
		if(genVal === "female"){
			filter.female();
		}
	},

	male: function() {
		console.log('male!!');
		filter.using = [];
		this.info.forEach(function(data){
			filter.sex = data.sex;
			if(filter.sex === "MALE"){
				//console.log(data);
				filter.using.push(data);
			}
		
		});
		filter.chartData();
	},

	female: function() {
		console.log('female!!');
		filter.using = [];
		this.info.forEach(function(data){
			filter.sex = data.sex;
			if(filter.sex === "FEMALE"){
				//console.log(data);
				filter.using.push(data);
			}
		});
		filter.chartData()
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
			var HIV = cause === "HUMAN IMMUNODEFICIENCY VIRUS DISEASE";
			if(HIV && white){
				filter.chartWhite.push(more);
			}
			if(HIV && black){
				filter.chartBlack.push(more);
			}
			if(HIV && hispanic){
				filter.chartHispanic.push(more);
			}
		});
		filter.chartIt();

	},

	chartIt: function() {
		console.log('time to get to work');
		google.load('visualization', '1.0', {'packages':['corechart'], 'callback': drawChart});

      // Set a callback to run when the Google Visualization API is loaded.
      	
		var chartWhite = [filter.chartWhite[0].ethnicity, 
			parseInt(filter.chartWhite[0].count)];
		var chartBlack = [filter.chartBlack[0].ethnicity, 
			parseInt(filter.chartBlack[0].count)];
		var chartHispanic = [filter.chartHispanic[0].ethnicity,
			parseInt(filter.chartHispanic[0].count)];


		filter.charted = [chartWhite, chartBlack, chartHispanic];
		console.log(filter.charted);
      	

    //  google.setOnLoadCallback(drawComp);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
     // console.log('hey');
      function drawChart() {
      	console.log('drawn!');
      	var data = new google.visualization.DataTable();
      		data.addColumn("string", "Ethnicity", "ethnicity");
      		data.addColumn("number", "Number of Deaths", "number");
      		data.addRows(filter.charted);

      		var options = {"title": "2007 HIV Deaths in NYC ",
      					   "width": 600,
      					   "height": 600};

      		var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      		chart.draw(data, options);
      };
      

	}/*,

	white: function() {
		filter.using = [];
		this.info.forEach(function(data){
			var ethnicity = data.ethnicity
			var white = ethnicity === "NON-HISPANIC WHITE";
			if(white){
				filter.using.push(data);
				console.log(filter.using);
			}
		})
	},

	black: function() {
		filter.using = [];
		this.info.forEach(function(data){
			var ethnicity = data.ethnicity
			var black = ethnicity === "NON-HISPANIC BLACK";
			if(black){

				filter.using.push(data);
				console.log(filter.using);
			}
		})
	},

	asian: function() {
		console.log('asianified');
	},

	hispanic: function() {
		filter.using = [];
		this.info.forEach(function(data){
			var ethnicity = data.ethnicity
			var hispanic = ethnicity === "HISPANIC";
			if(hispanic){

				filter.using.push(data);
				console.log(filter.using);
			}
		})
		//console.log('his-wahhhht');
	}*/
}



ko.applyBindings(viewModel.init());

