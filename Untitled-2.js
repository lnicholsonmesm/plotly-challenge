

var selectData = function () {
    // ____________________________________________________
    /* GET dropdown value */
    let subjectID = d3.select("#selDataset option").text();
    //console.log(d3.select("#selDataset option").text());
    //console.log(dataImport);

    // ____________________________________________________
    /* FILTER data for x and y values */
    d3.json("data/samples.json").then((data2) => {
        return data2;
    });
    let samples = data2.samples;
    sampleValues = [];
    sampleIndices = [];
    otuIDs = [];
    otuLabels = [];
    console.log(samples);
    samples.map((data, index) => {
        if (data.id == subjectID) {
            console.log(data);
            let x = data.sample_values;
            let y = data.otu_ids;
            let labels = data.otu_labels;
            for (var i = 0; i < x.length; i++) {
                sampleValues.push({ x: x[i], y: y[i], labels: labels[i] });
            };
        }
    });
    console.log(sampleValues);
    //console.log(index);
    sampleValues.sort(function (a, b) {
        return parseFloat(b.x) - parseFloat(a.x);
    });
    console.log(`sampleVal log ${sampleValues}`);
    var data = sampleValues.slice(0, 10);

    var trace1 = {
        x: data.map(d => d.x),
        y: data.map(d => d.y),
        text: data.map(d => d.labels),
        name: "Belly Button Bacteria",
        type: "bar",
        orientation: "h"
    };
    // data
    var chartData = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
        title: "Belly Button Bacteria - top 10",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", chartData, layout);
};

//event Listener
//d3.selectAll("#selDataset").on("change", selectData(dataImport));


/* *******************************************************
   Get Data
        Initialize Graph
            Make an Event Listener
******************************************************* */





doSomething()
    .then(result => doSomethingElse(result))
    .then(newResult => doThirdThing(newResult))
    .then(finalResult => {
        console.log(`Got the final result: ${finalResult}`);
    })
    .catch(failureCallback);