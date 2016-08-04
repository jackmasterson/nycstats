var model = {
	firstDataInfo: ko.observableArray(),
	lastDataInfo: ko.observableArray(),
	causeDataInfo: ko.observableArray(),
	selectedCause: ko.observable(),
	dataset: [],
	dataexp: ko.observableArray()
};

var viewModel = {
	init: function() {
      	var w = 500;
		var h = 500;
		var body = d3.select('.op-charts')
			.append('div')
			.attr('class', 'new-charts')
			.attr('border', '2px solid black')
			.append('svg')
			.attr('width', w)
			.attr('height', h);
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
			model.dataexp.push(data);
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
				console.log(data);
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
				model.dataset.push(more);
			}
			if(eleven){
				filterInfo.elevenArr.push(more);
				model.dataset.push(more);
			//	model.dataset.pu
			}
			if(twelve){
				filterInfo.twelveArr.push(more);
				model.dataset.push(more);
			}
			if(thirteen){
				filterInfo.thirteenArr.push(more);
				model.dataset.push(more);
			}
			if(fourteen){
				filterInfo.fourteenArr.push(more);
			}
			if(fifteen){
				filterInfo.fifteenArr.push(more);
				model.dataset.push(more);
			}
		});
		filterInfo.chartIt();

	},

	chartIt: function() {
	//	google.load('visualization', '1.0', {'packages':['corechart'], 'callback': drawChart});
      	
		var ten = //[filterInfo.tenArr[0].year,
			parseInt(filterInfo.tenArr[0].overall_opioid);//];

		var eleven = parseInt(filterInfo.elevenArr[0].overall_opioid);
		var twelve = parseInt(filterInfo.twelveArr[0].overall_opioid);
		var thirteen = parseInt(filterInfo.thirteenArr[0].overall_opioid);
		var fourteen = parseInt(filterInfo.fourteenArr[0].overall_opioid);
		var fifteen = parseInt(filterInfo.fifteenArr[0].overall_opioid);


		var all = [ten, eleven, twelve, thirteen, fourteen, fifteen];
		
		console.log(Math.max.apply(null, all));
		var highest = Math.max.apply(null, all);
		

		var barPadding = 1; 
		var transition = d3.transition();
		console.log(all);
		//create SVG element


		var update = d3.select('svg').transition();

		var w = 500;
		var h = 500;
		var svg = d3.select('svg');

		svg.selectAll('rect')
			.data(all)
			.enter()
			.append('rect')
			.attr('x', function(d, i){
				return i * (w/all.length);
			})
			.attr('y', function(d){
				return h - d; //height minus data value
			})
			.attr('width', w/all.length- barPadding)
			.attr('height', function(d){
				return d;
			})
			.attr('fill', function(d){
				return "rgb(0,0, " + (d) + ")";
			})

		svg.selectAll('rect')
			.transition()
    		.style('fill', function(d){
    			if(d > highest - 1){
    				return 'red'
    			}
    		})
    		.duration(650)


		svg.selectAll('text')
			.data(all)
			.enter()
			.append('text')
			.text(function(d){
				return d;
			})
			.attr('x', function(d, i){
				return i * (w/all.length) + 40;
			})
			.attr('y', function(d){
				return h - d + 30;
			})
			.attr('fill', 'white')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '11px')
			.attr('text-anchor', 'middle')
			.transition()
			.style('font-size', function(d){
				if(d > highest -1 ){
					return '15px'
				}
				else {
					return '9px'
				}
			})
			.delay(1000)
			.duration(650)



			$('.update').click(function(){
				svg.selectAll('rect')
					.transition()
					.attr('x', function(d, i){
						return i * (w/all.length);
					})
					.attr('y', function(d){
						return h - d; //height minus data value
					})
					.attr('width', w/all.length- barPadding)
					.attr('height', function(d){
						return d;
					})
					.attr('fill', function(d){
						return "rgb(0,0, " + (d) + ")";
					})
				svg.selectAll('text')		
					.text(function(d){
						return d;
					})
					.attr('x', function(d, i){
						return i * (w/all.length) + 40;
					})
					.attr('y', function(d){
						return h - d + 30;
					})
					.attr('fill', 'white')
					.attr('font-family', 'sans-serif')
					.attr('font-size', '11px')
					.attr('text-anchor', 'middle')
					.transition()
					.style('font-size', function(d){
						if(d > highest -1 ){
							return '15px'
						}
						else {
							return '9px'
						}
					})
					.delay(1000)
					.duration(650)
					});


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
};







ko.applyBindings(viewModel.init());

