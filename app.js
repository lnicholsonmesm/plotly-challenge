let subjectID = '';


//will need to be a function like updatePlotly
//get data
/* =======================================================
    Make a Promise & then get IDs and graph the result.
======================================================= */
function getData() {
    d3.json("data/samples.json").then(result => {
        //console.log(result);
        result.names.forEach(function (data) {
            d3.select('#selDataset') //.html(`<option>${data}</option>`)
                .append("option")
                .text(`${data}`);
        });
        return result;
    });
};

getData();

/* =======================================================
    Build Graph
======================================================= */
function plotGraph(subjectID) {
    let sampleValues = [];
    let sampleIndices = [];
    let otuIDs = [];
    let otuLabels = [];
    let trace1 = {};
    let chartData = [];
    var layout = {};
    let dataSlice = [];
    let sample_values = [];
    let otu_ids = [];
    let labels = [];
    // ____________________________________________________
    /* FILTER data for x and y values */
    d3.json("data/samples.json").then(result => {
        let samples = result.samples;

        sampleValues = [];
        sampleIndices = [];
        otuIDs = [];
        otuLabels = [];
        let bubbleValues = [];
        //console.log(samples);
        samples.map((data, index) => {
            if (data.id == subjectID) {
                //console.log(data);
                sample_values = data.sample_values;
                otu_ids = data.otu_ids;
                console.log(otu_ids);
                labels = data.otu_labels;
                for (var i = 0; i < sample_values.length; i++) {
                    sampleValues.push({ x: sample_values[i], y: otu_ids[i], labels: labels[i] });
                    // bubbleValues.push({ x: })
                };
                //console.log(sampleValues);
            };
        });
        //console.log(sampleValues);
        //console.log(index);
        sampleValues.sort(function (a, b) {
            return parseFloat(b.sample_values) - parseFloat(a.sample_values);
        });
        //console.log(`sampleVal log ${sampleValues}`);
        dataSlice = sampleValues.slice(0, 10);

        trace1 = {
            x: dataSlice.map(d => d.x),
            y: dataSlice.map(d => 'OTU'.concat(" ", d.y)),
            text: dataSlice.map(d => d.labels),
            name: "Belly Button Bacteria",
            type: "bar",
            marker: {
                color: 'rgb(0, 153, 153)',
                width: 2
            },
            orientation: "h"
        };
        console.log(trace1);
        // data
        chartData = [trace1];

        // Apply the group bar mode to the layout
        layout = {
            autosize: true,
            title: {
                text: "Top Belly Button Bacteria",
                font: {
                    family: 'Courier New, monospace',
                    size: 20
                },
                xref: 'paper',
                x: 0.05,
            },
            xaxis: {
                title: {
                    text: 'x Axis',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                },
            },
            yaxis: {
                title: {
                    text: 'OTU Groups',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                }
            }
            //margin: {
            //    l: 100,
            //    r: 100,
            //    t: 100,
            //    b: 100
            //}
        };
        // Render the plot to the div tag with id "plot"
        d3.select("#bar").html("") //<div id="bar"></div>
        Plotly.newPlot("bar", chartData, layout);


        var trace2 = {
            y: sampleValues.map(d => d.x),
            x: sampleValues.map(d => 'OTU'.concat(" ", d.y)),
            text: dataSlice.map(d => d.labels),
            name: "Your Belly Button Bacteria",
            mode: 'markers',
            marker: {
                color: sampleValues.map(d => d.y),
                size: sampleValues.map(d => d.x),
            },
        };

        var data2 = [trace2];

        var layout2 = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
        };

        d3.select("#bubble").html("") //<div id="bar"></div>
        Plotly.newPlot('bubble', data2, layout2);
    });
};
plotGraph('940');



/* =======================================================
    Actually Load the Page!
======================================================= */
//loadPage();
//getIDs();
/* =======================================================
    Set page to reload when new dropdown is selected
======================================================= */
function optionChanged(val) {
    var subjectID = val;
    console.log(subjectID);
    plotGraph(subjectID);
};

/* =======================================================
    Bubble Function
======================================================= */
//function Bubble();