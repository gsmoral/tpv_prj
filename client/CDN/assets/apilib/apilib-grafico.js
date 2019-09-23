apilib_v1.prototype.grafico = {
	
	render_lineal: function(id_div, title, data_array){
		console.log("apilib.grafico.render");

		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);


		function drawChart() {
			var data = google.visualization.arrayToDataTable(data_array);

			var options = {
				title: title,
				legend: { position: 'bottom' }
			};

			var chart = new google.visualization.LineChart(document.getElementById(id_div));

			chart.draw(data, options);
		}

	},

	render_barras: function(id_div, title, data_array){


		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);


		function drawChart() {

			/*var barsVisualization;

			var data = new google.visualization.DataTable();
			data.addColumn('string', col1);
			data.addColumn('number', col2);
			data.addRows(data_array);
		
			barsVisualization = new google.visualization.ColumnChart(document.getElementById('grafico'));
			barsVisualization.draw(data, null);*/

			var data = google.visualization.arrayToDataTable(data_array);

			var options = {
				title: title,
				legend: { position: 'bottom' },
				chartArea: {width: '50%'},
		        
			};

			var chart = new google.visualization.BarChart(document.getElementById(id_div));

			chart.draw(data, options);
		
		}
	  
	}

}
