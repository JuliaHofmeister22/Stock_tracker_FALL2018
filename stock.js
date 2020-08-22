//var chart = "<input type='button' value='chart this' id='chartButton' onclick='drawChart(this);'>";
 google.charts.load('current', {'packages':['corechart']});
 
function getData(){
	console.log("getData: ticker="+tickerSymbol.value
	             + ", earliest=" + earliestDate.value 
				 + ", latest=" + latestDate.value);
	
	var ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	ajax.addEventListener("load",function(){
	console.log(this.response);
		if (this.status!=200) {
			alert("Stock Lookup Failed!");
		} else {
			var row = stockTable.insertRow(-1);
			// 9 cells
			var cell = row.insertCell(-1);
			cell.innerHTML = this.response.dataset.dataset_code;
	
			var symbolCell=cell;
			
			cell = row.insertCell(-1);
			cell.innerHTML = /^([^(]+)/.exec(this.response.dataset.name)[1].trim();
			
			cell = row.insertCell(-1);
			cell.innerHTML = this.response.dataset.data[0][1];
			
			cell = row.insertCell(-1);
			cell.innerHTML = this.response.dataset.data[0][4];
			
			cell = row.insertCell(-1);
			cell.innerHTML = this.response.dataset.data[0][2];
			
			cell = row.insertCell(-1);
			cell.innerHTML = this.response.dataset.data[0][3];
			
			cell = row.insertCell(-1);
			cell.innerHTML =  this.response.dataset.data[0][5];
			
			cell = row.insertCell(-1);
			cell.innerHTML =  "<input type='button' value='Chart This' class='chartButton' onclick='alert(\"Data has been drawn on the chart!\")'>";
			var chartThis=document.getElementsByClassName("chartButton");
			chartThis[(chartThis.length)-1].addEventListener("click", function(){
												var ajax = new XMLHttpRequest();
												ajax.responseType = "json";
												ajax.addEventListener("load",chart)
												var parameters = "https://www.quandl.com/api/v3/datasets/WIKI/"
												+ tickerSymbol.value + ".json?"
												+ "api_key=a9MjDioMHbzebuLanbcy" + "&"
												+ "start_date=" + earliestDate.value + "&" 
												+ "end_date=" + latestDate.value;
												console.log(parameters);
												ajax.open("GET", parameters);
												ajax.send();});

			cell = row.insertCell(-1);
			cell.innerHTML = "<input type='button' value='Add' class='addButton' onclick='alert(\"Data has been added to portfolio!\")'>";
			var addThis=document.getElementsByClassName("addButton");
			addThis[(addThis.length)-1].addEventListener("click", function(){
												var ajax = new XMLHttpRequest();
												ajax.responseType = "json";
												ajax.addEventListener("load",getPortfolioData)
												var parameters = "https://www.quandl.com/api/v3/datasets/WIKI/"
												+ tickerSymbol.value + ".json?"
												+ "api_key=a9MjDioMHbzebuLanbcy" + "&"
												+ "start_date=" + earliestDate.value + "&" 
												+ "end_date=" + latestDate.value;
												console.log(parameters);
												ajax.open("GET", parameters);
												ajax.send();});
			
			if (this.response.dataset.data[0][1]>this.response.dataset.data[0][4]){
				symbolCell.style.backgroundColor="#efbbb6";
			}if (this.response.dataset.data[0][1]<this.response.dataset.data[0][4]){
				symbolCell.style.backgroundColor="lightgreen";
			}
		}
		
		
	});
	var parameters = "https://www.quandl.com/api/v3/datasets/WIKI/"
	                 + tickerSymbol.value + ".json?"
					 + "api_key=a9MjDioMHbzebuLanbcy" + "&"
					 + "start_date=" + earliestDate.value + "&" 
					 + "end_date=" + latestDate.value;
	
	ajax.open("GET", parameters);
	ajax.send();
	
	
}

function chart(){
	console.log("it's working",this.response);
	var date=this.response.dataset.data[0][0];
	var Dataset=this.response.dataset;
	var tickerSymbol= this.response.dataset.dataset_code
// Load the Visualization API and the corechart package.
		 

		  // Set a callback to run when the Google Visualization API is loaded.
		  //google.charts.setOnLoadCallback(drawChart);

		  // Callback that creates and populates a data table,
		  // instantiates the pie chart, passes in the data and
		  // draws it.
	drawChart(Dataset)
}
	 
function drawChart(Dataset){
	var data = new google.visualization.DataTable();
	
	// Create the data table.
	data.addColumn('date', 'Date');
	data.addColumn('number', 'High');
	data.addColumn('number', 'Low');
	data.addColumn('number', 'Close');
	data.addColumn('number', 'Volume');
	if (Dataset){
		for (var i=Dataset.data.length-1; i>=0; i--){
			data.addRows([[
			new Date(Dataset.data[i][0]),(Dataset.data[i][2]),(Dataset.data[i][3]),(Dataset.data[i][4]),(Dataset.data[i][5])]])
		};
	}

	// Set chart options
	var options = {'title':'Stock Prices ',
		'legend': {'position':'top'},
		'width':800,
		'height':300,
		
		series:{
			0: {targetAxisIndex:0},
			1: {targetAxisIndex:0},
			2: {targetAxisIndex:0},
			3: {targetAxisIndex:1}
		},
		vAxes:{
			0: {title:"Prices"},
			1: {title:"Volume"}
		},
		hAxes:{
			0:{title:"Date"}
		}
		};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}
		  

getDataButton.addEventListener("click", getData);
google.charts.setOnLoadCallback(drawChart);


function getPortfolioData(){
	console.log("getData: ticker="+tickerSymbol.value
	             + ", earliest=" + earliestDate.value 
				 + ", latest=" + latestDate.value);
	
	var ajax = new XMLHttpRequest();
	var tableVis = document.getElementById("portfolioTable")
	tableVis.style.visibility="visible";
	ajax.responseType = "json";
	ajax.addEventListener("load",function(){
	console.log(this.response);
		if (this.status!=200) {
			alert("Stock Lookup Failed!");
		} else {
			var row = portfolioTable.insertRow(-1);
			// 9 cells
			var cell = row.insertCell(-1);
			cell.innerHTML = this.response.dataset.dataset_code;
	
			var symbolCell=cell;
			
			cell = row.insertCell(-1);
			cell.innerHTML = /^([^(]+)/.exec(this.response.dataset.name)[1].trim();
			
			cell = row.insertCell(-1);
			cell.innerHTML = "100"
			
			cell = row.insertCell(-1);
			cell.innerHTML = formatNumber(this.response.dataset.data[1][4]*100);
			
			cell = row.insertCell(-1);
			cell.innerHTML = formatNumber(this.response.dataset.data[0][4]*100);
			
			
			cell = row.insertCell(-1);
			cell.innerHTML = decimal(((this.response.dataset.data[1][4]*100-this.response.dataset.data[0][4]*100)/(this.response.dataset.data[1][4]*100))*100);
		
			var changeCell=cell;
			
			if (((this.response.dataset.data[1][4]*100-this.response.dataset.data[0][4]*100)/(this.response.dataset.data[1][4]*100))*100>0){
				changeCell.style.backgroundColor="lightgreen";
			}if (((this.response.dataset.data[1][4]*100-this.response.dataset.data[0][4]*100)/(this.response.dataset.data[1][4]*100))*100<0){
				changeCell.style.backgroundColor="#efbbb6";
			}

}})
var parameters = "https://www.quandl.com/api/v3/datasets/WIKI/"
	                 + tickerSymbol.value + ".json?"
					 + "api_key=a9MjDioMHbzebuLanbcy" + "&"
					 + "start_date=" + earliestDate.value + "&" 
					 + "end_date=" + latestDate.value;
	
	ajax.open("GET", parameters);
	ajax.send();
	}

function formatNumber(num) {
	num="$"+num;
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
function decimal(num){
	var rounded = Math.round( num * 10 ) / 10;
	rounded=rounded+"%";
	return rounded
}
//tickerSymbol.value="JNJ"; getData();
//tickerSymbol.value="F"; getData();
//tickerSymbol.value="FB"; getData();

