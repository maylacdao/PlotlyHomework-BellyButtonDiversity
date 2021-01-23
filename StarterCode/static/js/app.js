//Load sample data (json file)
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        //console.log(data);
        var metadata = data.metadata;
        var resultsArray = metadata.filter(sampleobject => sampleobject.id == sample);
        var result = resultsArray[0];
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}:${value}`);
        });
    });
};


//Create function to build horizontal bar chart
function buildCharts() {
    //Load sample data using d3.js
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultsArray = samples.filter(sampleobject => sampleobject.id == samples);
        var result = resultsArray[0];

        var ids = data.otu_ids;
        var labels = data.otu_labels;
        var values = data.sample_values;

        //Build bubble chart using sample data
        var bubbleChartData = [{
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: ids,
                size: values
            }
        }];

        var bubbleChartLayout = {
            xaxis:{title: "OTU ID"},
            margin: {t:0},
            hovermode:"closest"
        };

        Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);
    });

        //Build horizontal bar chart using sample data
        var horizontalBarData = [{
            y: ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            x: values.slice(0,10).reverse(),
            text: labels.slice(0,10).reverse(),
            type:"bar",
            orientation: "h"
        }];

        var horizontalBarLayout = {
            title: "Top 10 Microbial Species per Individual"
        };

        Plotly.newPlot("bar", horizontalBarData, horizontalBarLayout);
        
        
}

function init() {
    //Establish reference to dropdown select element
    var selector = d3.select("#selDataset");

    //Populate options using sample names
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        //Build initial plots using first sample entry
        const firstEntry = sampleNames[0];
        buildCharts(firstEntry);
        buildMetadata(firstEntry);
    });
}

function optionChanged(newSample) {
    //Fetch new data whenever a different option is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}

//Initialize dashboard
init();