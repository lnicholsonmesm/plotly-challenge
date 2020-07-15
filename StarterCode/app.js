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


function optionChanged(val) {
    var value = val;
    console.log(value);
};

//event Listener
//d3.selectAll("#selDataset").on("change", updatePlotly);

//will need to be a function like updatePlotly
//get data
/* =======================================================
    Make a Promise
======================================================= */
d3.json("data/samples.json").then((dataImport) => {
    //run Function 1
    getIDs(dataImport);
});

/* =======================================================
    Get Patient IDs / Populate the Dropdown
======================================================= */

var getIDs = function (dataImport) {
    //Populate Drop-down with Patient ID
    // Call the selectData function
    dataImport.names.forEach(function (data) {
        // html code to grab and populate code
        d3.select('#selDataset') //.html(`<option>${data}</option>`)
            .append("option")
            .text(`${data}`);
        console.log(dataImport);

    });
    selectData(dataImport);    // call the stuff that will call the    function
};
/* =======================================================
    Get the dropdown value and get corresponding data
======================================================= */

var selectData = function (dataImport) {
    // ____________________________________________________
    /* GET dropdown value */
    let subjectID = d3.select("#selDataset option").text();
    console.log(subjectID);
    console.log(dataImport);

    // ____________________________________________________
    /* FILTER data for x and y values */
    let samples = dataImport.samples;
    let sampleValues = [];
    let sampleIndices = [];
    let otuIDs = [];
    let otuLabels = [];
    samples.map((data, index) => {
        if (data.id == subjectID) {
            console.log(data);
            sampleValues.push(data.sample_values);
            otuIDs.push(data.otu_ids);
            otuLabels.push(data.otu_labels);
            console.log(index);
        };
        let x = sampleValues;
        let y = otuIDs;
        let labels = otuLabels;
        plotGraph(x, y, labels);

    }); //end of sample data loop

    var trace1 = {
        x: data.map(row => row.greekSearchResults),
        y: data.map(row => row.greekName),
        text: data.map(row => row.greekName),
        name: "Greek",
        type: "bar",
        orientation: "h"
    };
    //create scales
    var plotGraph(x, y, labels) {
        samples.forEach(function (data) {
            var xScale = d3.scaleLinear()
                .domain(x)
                .range([0, Math.max(...x)]);
            var yScale = d3.scaleBand()
                .domain(y)
                .range([0, svgHeight])
                .padding(0.1);
            //create axes    
            var xAxis = d3.axisBottom(xScale).ticks(10);
            var yAxis = d3.axisLeft(yScale);
        });
    }
    // append axes
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    chartGroup.selectAll(".bar")
        .data()
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xBandScale(d.name))
        .attr("y", d => yLinearScale(d.hours))
        .attr("width", xBandScale.bandwidth())
        .attr("height", d => chartHeight - yLinearScale(d.hours));


    // line generator
    var bar = d3.bar()
        .x(d => xTimeScale(x))
        .y(d => yLinearScale(x));
    console.log(`sampleValues ${sampleValues}`)

    tvData.forEach(function (d) {
        d.hours = +d.hours;
    });

    // append line bar...
    chartGroup.append("path")
        .data([medalData])
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "red");

    // append circles
    var barGroup = chartGroup.selectAll("bar")
        .data(samples)
        .enter()
        .append("circle")
        .attr("cx", d => xTimeScale(sampleValues))
        .attr("cy", d => yLinearScale(otuIDs))
        .attr("r", "10")
        .attr("fill", "gold")
        .attr("stroke-width", "1")
        .attr("stroke", "black");
    /*    
    // Step 1: Append tooltip div
    var toolTip = d3.select("body")
        .append("div")
        .classed("tooltip", true);

    // Step 2: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function (d) {
        toolTip.style("display", "block")
            .html(
                `<strong>${dateFormatter(d.date)}<strong><hr>${d.medals}
      medal(s) won`)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px");
    })
        // Step 3: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function () {
            toolTip.style("display", "none");
        }); 
*/
    //}).catch (function(error) {
    //    console.log(error);
    //});
}; //end
/*
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // Append SVG element
    var svg = d3
        .select(".chart")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Read CSV
    d3.csv("norway_medals.csv").then(function (medalData) {

        // create date parser
        var dateParser = d3.timeParse("%d-%b");

        // parse data
        medalData.forEach(function (data) {
            data.date = dateParser(data.date);
            data.medals = +data.medals;
        });

        // create scales
        var xTimeScale = d3.scaleTime()
            .domain(d3.extent(medalData, d => d.date))
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(medalData, d => d.medals)])
            .range([height, 0]);

        // create axes
        var xAxis = d3.axisBottom(xTimeScale);
        var yAxis = d3.axisLeft(yLinearScale).ticks(6);

        // append axes
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

        // line generator
        var line = d3.line()
            .x(d => xTimeScale(d.date))
            .y(d => yLinearScale(d.medals));

        // append line
        chartGroup.append("path")
            .data([medalData])
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "red");

        // append circles
        var circlesGroup = chartGroup.selectAll("circle")
            .data(medalData)
            .enter()
            .append("circle")
            .attr("cx", d => xTimeScale(d.date))
            .attr("cy", d => yLinearScale(d.medals))
            .attr("r", "10")
            .attr("fill", "gold")
            .attr("stroke-width", "1")
            .attr("stroke", "black");

        // date formatter to display dates nicely
        var dateFormatter = d3.timeFormat("%d-%b");

        // Step 1: Append tooltip div
        var toolTip = d3.select("body")
            .append("div")
            .classed("tooltip", true);

        // Step 2: Create "mouseover" event listener to display tooltip
        circlesGroup.on("mouseover", function (d) {
            toolTip.style("display", "block")
                .html(
                    `<strong>${dateFormatter(d.date)}<strong><hr>${d.medals}
          medal(s) won`)
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px");
        })
            // Step 3: Create "mouseout" event listener to hide tooltip
            .on("mouseout", function () {
                toolTip.style("display", "none");
            });

    }).catch(function (error) {
        console.log(error);
    });
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

*/
