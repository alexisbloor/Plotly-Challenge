// function for dropdown
function optionChanged(selectedID){
  
    console.log (selectedID);
      //read json file
    // const json_file = "/Users/alexisbloor/Desktop/Homework/Plot.ly_hw/data/samples.json"
    d3.json("/Users/alexisbloor/Desktop/Homework/Plot.ly_hw/StarterCode/samples.json").optionChanged(Response)
    // d3.json("samples.json").then((data) => {

    d3.select("#selDataset").html("");
      // select the metadata array from the json file 
    data.metadata.forEach(item =>
            {
        d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
            });
    d3.select ("#selDataset").node().value = selectedID;

    const idMetadata = data.metadata.filter(item => (item.id == selectedID));

    //   console.log(idMetadata);

    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(idMetadata[0]).forEach(item =>
        {
            panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
        });

    const idSample = data.samples.filter(item => parseInt(item.id) == selectedID);

    var sampleValue = idSample[0].sample_values.slice(0,10);
    sampleValue = sampleValue.reverse();
    var otuID = idSample[0].otu_labels;
    otu_labels = otuLabels.reverse();

    const yAxis = otuID.map(item => 'OTU' + " " + item);
        // console.log(yAxis)

        const trace = {
            y: yAxis,
            x: sampleValue, 
            type: 'bar', 
            orientation: "h",
            text: otuLabels, 
            marker: {
                color: 'rgb(0, 200, 200)',
                line: {
                    width: 3
                }
            }
        },
        layout = {
            title: 'Top 10 OTU/Individual',
            xaxis: {title: 'Number of Samples Collected'},
            yAxis: {title: 'OTU ID'}
        };

        Plotly.newPlot('bar', [trace], layout, {responsive: true}); 


        var sampleValue1 = idSample[0].sample_values;
        var otuID1 = idSample[0].otu_ids;

        const trace1 = {
            x: otuID1, 
            y: sampleValue1, 
            mode: 'markers',
            marker: {
                color: otuID1, 
                size: sampleValue1
            }
        },
        layout1 = {
            title: '<b>Bubble chart for each sample</b>',
            xaxis: {title: 'OTU ID'},
            yAxis: {title: 'Number of Samples'},
            showlegend: false,
            height: 800,
            width: 122
        };

        Plotly.newPlot('bubble', [trace1], layout1);
}