//Load sample data (json file)
d3.json("samples.json").then((data) => {
    console.log(data);
});

//Create function to build horizontal bar chart
function buildHorizontalBarChart() {
    var trace1 

    var data 

    var layout

    Plotly.newPlot("bar", data, layout)
}