/* *******************************************************
   Set Chart Parameters (svg size, margins, chartsize)
******************************************************* */
// svg parameters
let height = window.innerHeight; //this needs to be resized for the boot...strap window
let width = window.innerWidth;

//svg container
let svg = d3.select("#bar").append("svg")
    .attr("height", height).attr("width", width);

// margins
var margin = {
    top: 50, right: 50, bottom: 50, left: 50
};

// chart area parameters: svg size minus margins
var chartHeight = height - margin.top - margin.bottom;
var chartWidth = width - margin.left - margin.right;

//chart container
let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

/* *******************************************************
   Get Data
        Initialize Graph
            Make an Event Listener
******************************************************* */


function optionChanged(val){
    var value = val;
    console.log(value);
}

//event Listener
//d3.selectAll("#selDataset").on("change", updatePlotly);

//will need to be a function like updatePlotly
//get data
d3.json("data/samples.json").then((dataImport) => {
    //get names for dropdown
    //let metadata = dataImport.metadata;
    let names = dataImport.names;
    //console.log(dataImport.names); 
    names.forEach(function (data) {
        // html code to grab and populate code
        d3.select('#selDataset') //.html(`<option>${data}</option>`)
            .append("option")
            .text(`${data}`);
        });
    let subjectID = d3.select("#selDataset option").text();
    console.log(subjectID);
    
    //Get sample data
    let samples = dataImport.samples;
    let sampleValues = [];
    let sampleIndices = [];
    let otuIDs = [];
    let otuLabels = [];
    samples.map((data, index) => {
        if (data.id == subjectID){
            console.log(data);
            sampleValues.push(data.sample_values);
            otuIDs.push(data.otu_ids);
            otuLabels.push(data.otu_labels);
            console.log(index);
            
        }
        
    }); //end of sample data loop
    console.log(sampleValues);
    samples.forEach(function (data){
        var xScale = d3.scaleLinear()
        .domain(sampleValues)
        .range([0, math.max(sampleValues)]);
        var yScale = d3.scaleBand()
            .domain(otuIDs)
            .range([0, svgHeight])
            .padding(0.1);

        var xAxis = d3.axisBottom(xScale).ticks(10);
        var yAxis = d3.axisLeft(yScale);
}); //big function closer


    //get top 10 sample values (and names, etc.) for each participant
    //samples.map((data, index) => {

    //}
// let sampleX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// let id = 940;

// d3.json("data/samples.json").then((data) => {
//     if (data.id == id) {
//         console.log(data.id);
//         let sampleValues = data.sample_values;
//         sampleValues.sort((firstNum, secondNum) => firstNum - secondNum);
//         console.log(sampleValues);
//         let ids = [];
//         ids.push(data.id);
//         console.log(ids);
//     }

//});
//function init() {
    // select dropdown menu
    /*
    var dropdown = d3.select("#selDataset");
    // read the data
    d3.json("samples.json").then((data) => {
        console.log(data)
        // get the id data to the dropdwown menu
        data.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        });
        // call the functions to display the data and the plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
*/

    
    // function updatePlot() {

    // }




    //     // set x to the bottom of the chart
    //     chartGroup.append("g")
    //         .attr("transform", `translate(0, ${chartHeight})`)
    //         .call(xAxis);

    //     // set y to the y axis
    //     chartGroup.append("g")
    //         .call(yAxis);

    //     // Create the rectangles using data binding
    //     var barsGroup = chartGroup.selectAll("rect")
    //         .data(dataArray)
    //         .enter()
    //         .append("rect")
    //         .attr("x", (d, i) => xScale(dataCategories[i]))
    //         .attr("y", d => yScale(d))
    //         .attr("width", xScale.bandwidth())
    //         .attr("height", d => chartHeight - yScale(d))
    //         .attr("fill", "green");

    //     // Create the event listeners with transitions
    //     barsGroup.on("mouseover", function () {
    //         d3.select(this)
    //             .transition()
    //             .duration(500)
    //             .attr("fill", "red")
    //         .on("mouseout", function () {
    //             d3.select(this)
    //                 .transition()
    //                 .duration(500)
    //                 .attr("fill", "green");
    //         });
    //     function init() {
    //         // select dropdown menu
    //         var dropdown = d3.select("#selDataset");
    //         // read the data
    //         d3.json("samples.json").then((data) => {
    //             console.log(data)
    //             // get the id data to the dropdwown menu
    //             data.names.forEach(function (name) {
    //                 dropdown.append("option").text(name).property("value");
    //             })
    //         });
    //         // call the functions to display the data and the plots to the page
    //         getPlot(data.names[0]);
    //         getInfo(data.names[0]);

    //     }});
    // });
            // Load data from hours-of-tv-watched.csv
            /*
            
                // Cast the hours value to a number for each piece of tvData
                tvData.forEach(function (d) {
                    d.hours = +d.hours;
                });
            var trace1 = {
            x: data.map(row => row.greekSearchResults),
            y: data.map(row => row.greekName),
            text: data.map(row => row.greekName),
            name: "Greek",
            type: "bar",
            orientation: "h"
          };
            
                // Create a linear scale for the vertical axis.
                var yLinearScale = d3.scaleLinear()
                    .domain([0, d3.max(tvData, d => d.hours)])
                    .range([chartHeight, 0]);
            
                // Create two new functions passing our scales in as arguments
                // These will be used to create the chart's axes
            
            
                // Append two SVG group elements to the chartGroup area,
                // and create the bottom and left axes inside of them
                chartGroup.append("g")
                    .call(leftAxis);
            
                chartGroup.append("g")
                    .attr("transform", `translate(0, ${chartHeight})`)
                    .call(bottomAxis);
            
                // Create one SVG rectangle per piece of tvData
                // Use the linear and band scales to position each rectangle within the chart
                chartGroup.selectAll(".bar")
                    .data(tvData)
                    .enter()
                    .append("rect")
                    .attr("class", "bar")
                    .attr("x", d => xBandScale(d.name))
                    .attr("y", d => yLinearScale(d.hours))
                    .attr("width", xBandScale.bandwidth())
                    .attr("height", d => chartHeight - yLinearScale(d.hours));
            
            }).catch(function (error) {
                console.log(error);
            });
            //let x = sampleValues[0:9];

            //console.log(sampleValues);
            //})





samples.map(function (x) {
        //console.log(x);
        let sampleValues = x.values;
        let sampleOtuIds = x.otu_ids;
        let sampleOtuLabels = x.otu_labels;
    });
});

function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}




// Part 2
// Binding the SVG to data

var circles = svg.selectAll("circle");

var rValues = [40, 25, 10];

circles.data(rValues)
    .enter()
    .append("circle")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", function (d) {
        return d;
    })
    .attr("stroke", "black")
    .attr("stroke-width", "5")
    .attr("fill", "red");

var booksReadThisYear = [15];

// Append the SVG wrapper to the page, set its height and width, and create a variable which references it
var svg = d3.select("#svg-area")
    .append("svg")
    .attr("height", "600")
    .attr("width", "400");

// Append a rectangle and set its height in relation to the booksReadThisYear value
svg.append("rect")
    .classed("bar", true) // for bonus
    .data(booksReadThisYear)
    .attr("width", 100)
    .attr("height", function (d) {
        return d * 10;
    })
    .attr("x", 0)
    .attr("y", 0);

d3.csv("./hours-of-tv-watched.csv").then(function (tvData) {

    console.log(tvData);

    // log a list of names
    var names = tvData.map(data => data.name);
    console.log("names", names);

    // Cast each hours value in tvData as a number using the unary + operator
    tvData.forEach(function (data) {
        data.hours = +data.hours;
        console.log("Name:", data.name);
        console.log("Hours:", data.hours);
    });
}).catch(function (error) {
    console.log(error);
});



d3.select("#selDataset")
    .data()
    .enter()
    .append("div") // appends a div to placeholder
    .classed("col-md-4 thumbnail", true) // sets the class of the new div
    .html(function (d) {
        return `<img src="${d.url}">`;
    }); // sets the html in the div to an image tag with the link
//data.metadata data.names data.samples


// scale y to chart height
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataArray)])
    .range([chartHeight, 0]);

// scale x to chart width
var xScale = d3.scaleBand()
    .domain(dataCategories)
    .range([0, chartWidth])
    .padding(0.1);

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);


var selection = d3.select("#content").selectAll(".temps")
    .data(austinTemps);

selection.enter()
    .append("div")
    .classed("temps", true)
    .merge(selection)
    .style("height", function (d) {
        return d + "px";
    });

selection.exit().remove();

function update(data) {

    var selection = d3.select("#content").selectAll(".temps")
        .data(data);

    selection.enter()
        .append("div")
        .classed("temps", true)
        .merge(selection)
        .style("height", function (d) {
            return d + "px";
        });

    selection.exit().remove();
}




// Part 1: Max, Min, Extent
var dataArr = [10, 20, 2000];

console.log("min value ", d3.min(dataArr));
console.log("max value ", d3.max(dataArr));
console.log("min and max values ", d3.extent(dataArr));

// Part 2: scaleLinear
// Imagine you have test scores with possible scores from 0 to 100,
// and you want to graph them in an SVG that is 1000 pixels high.

var testScores = [50, 90, 95, 75, 85];

// a. hard-coded

var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 1000]);

console.log(`50 returns ${yScale(50)}`);
console.log(`75 returns ${yScale(75)}`);
console.log(`100 returns ${yScale(100)}`);

// b. max and min
var svgHeight = 1000;

var yScale = d3.scaleLinear()
    .domain([0, d3.max(testScores)])
    .range([0, svgHeight]);


console.log(`50 returns ${yScale(50)}`);
console.log(`75 returns ${yScale(75)}`);
console.log(`95 returns ${yScale(95)}`);


// c. extent
var yScale = d3.scaleLinear()
    .domain(d3.extent(testScores))
    .range([0, svgHeight]);


console.log(`50 returns ${yScale(50)}`);
console.log(`75 returns ${yScale(75)}`);
console.log(`95 returns ${yScale(95)}`);

// Part 3: scaleBand
// Imagine you want to visualize student grade information on a bar chart.
svgHeight = 600;
var svgWidth = 1000;

testScores = [90, 85, 75, 90];
var students = ["Han", "Sarah", "Matt", "Ruchi"];

var xScale = d3.scaleBand()
    .domain(students)
    .range([0, svgWidth]);

console.log(`Han's x-coordinate: ${xScale("Han")}`);
console.log(`Sarah's x-coordinate: ${xScale(students[1])}`);
console.log(`Matt's x-coordinate: ${xScale("Matt")}`);
console.log(`Ruchi's x-coordinate: ${xScale(students[3])}`);

console.log(`Each band is ${xScale.bandwidth()} pixels wide.`);

// The y values are scaled separately.

var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, svgHeight]);

console.log(`The height of Han's bar: ${yScale(testScores[0])}`);


// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("hours-of-tv-watched.csv").then(function (tvData) {

    console.log(tvData);

    // Cast the hours value to a number for each piece of tvData
    tvData.forEach(function (d) {
        d.hours = +d.hours;
    });

    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand()
        .domain(tvData.map(d => d.name))
        .range([0, chartWidth])
        .padding(0.1);

    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(tvData, d => d.hours)])
        .range([chartHeight, 0]);

    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    // Create one SVG rectangle per piece of tvData
    // Use the linear and band scales to position each rectangle within the chart
    chartGroup.selectAll(".bar")
        .data(tvData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xBandScale(d.name))
        .attr("y", d => yLinearScale(d.hours))
        .attr("width", xBandScale.bandwidth())
        .attr("height", d => chartHeight - yLinearScale(d.hours));

}).catch(function (error) {
    console.log(error);
});


// data
var dataArray = [1, 2, 3];
var dataCategories = ["one", "two", "three"];

function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // svg params
    var svgHeight = window.innerHeight;
    var svgWidth = window.innerWidth;

    // margins
    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    // chart area minus margins
    var chartHeight = svgHeight - margin.top - margin.bottom;
    var chartWidth = svgWidth - margin.left - margin.right;

    // create svg container
    var svg = d3.select("body").append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // shift everything over by the margins
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // scale y to chart height
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataArray)])
        .range([chartHeight, 0]);

    // scale x to chart width
    var xScale = d3.scaleBand()
        .domain(dataCategories)
        .range([0, chartWidth])
        .padding(0.1);

    // create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    // set y to the y axis
    chartGroup.append("g")
        .call(yAxis);


    chartGroup.selectAll("rect")
        .data(dataArray)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(dataCategories[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d))
        .attr("fill", "green")
        // event listener for onclick event
        .on("click", function (d, i) {
            alert(`Hey! You clicked bar ${dataCategories[i]}!`);
        })
        // event listener for mouseover
        .on("mouseover", function () {
            d3.select(this)
                .attr("fill", "red");
        })
        // event listener for mouseout
        .on("mouseout", function () {
            d3.select(this)
                .attr("fill", "green");
        });
}

makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

// The code for the chart is wrapped inside a function
// that automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads, remove it
    // and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // SVG wrapper dimensions are determined by the current width
    // and height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // data
    var pizzasEatenByMonth = [15, 5, 25, 18, 12, 22, 0, 4, 15, 10, 21, 2];

    // append svg and group
    var svg = d3.select(".chart")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // scales
    var xScale = d3.scaleLinear()
        .domain([0, pizzasEatenByMonth.length])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(pizzasEatenByMonth)])
        .range([height, 0]);

    // line generator
    var line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d));

    // create path
    chartGroup.append("path")
        .attr("d", line(pizzasEatenByMonth))
        .attr("fill", "none")
        .attr("stroke", "blue");

    // append circles to data points
    var circlesGroup = chartGroup.selectAll("circle")
        .data(pizzasEatenByMonth)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", d => yScale(d))
        .attr("r", "5")
        .attr("fill", "red");

    // Step 1: Append a div to the body to create tooltips, assign it a class
    // =======================================================
    var toolTip = d3.select("body").append("div")
        .attr("class", "tooltip");

    // Step 2: Add an onmouseover event to display a tooltip
    // ========================================================
    circlesGroup.on("mouseover", function (d, i) {
        toolTip.style("display", "block");
        toolTip.html(`Pizzas eaten: <strong>${pizzasEatenByMonth[i]}</strong>`)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px");
    })
        // Step 3: Add an onmouseout event to make the tooltip invisible
        .on("mouseout", function () {
            toolTip.style("display", "none");
        });
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);

// data
var dataArray = [1, 2, 3];
var dataCategories = ["one", "two", "three"];

// svg container
var height = 600;
var width = 1000;

// margins
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

// chart area minus margins
var chartHeight = height - margin.top - margin.bottom;
var chartWidth = width - margin.left - margin.right;

// create svg container
var svg = d3.select("body").append("svg")
    .attr("height", height)
    .attr("width", width);

// shift everything over by the margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// scale y to chart height
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataArray)])
    .range([chartHeight, 0]);

// scale x to chart width
var xScale = d3.scaleBand()
    .domain(dataCategories)
    .range([0, chartWidth])
    .padding(0.1);
    */

