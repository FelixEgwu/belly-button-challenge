

// The url with data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Display the default plots
function init() {

    // Use D3 to activate the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Fetch the JSON data and  log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of id names
        let names = data.names;

        // Iterate through the names 
        names.forEach((name) => {
            // Append each name  onto the drop down menu
            // Add each name to the html file as an option element
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // Assign the first name to name variable
        let name = names[0];

        // Call the functions to make the demo panel, bar chart, and bubble chart
        demo(name);
        bar(name);
        bubble(name);
        gauge(name);
    });
}

// Make the demo panel
function demo(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of metadata objects
        let metadata = data.metadata;
        
        // Filter data after converting their types 
        
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assign the first object to the variable
        let obj = filteredData[0]
        
        // Reconcile the elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
  
        // return an array of object properties
        let entries = Object.entries(obj);
        
        // Iterate through the array and append key/value pairs to the id sample-metadata
        
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Log the entries Array
        console.log(entries);
    });
  }
  

// Make the bar chart
function bar(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of sample objects
        let samples = data.samples;

        // Filter therough data by id 
        let filteredData = samples.filter((sample) => sample.id === selectedValue);

        // Assign the object to the variable
        let obj = filteredData[0];
        
        //  horizontal bar chart
        let trace = [{
            // Slice out the top 10 otus
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "rgb(166,172,237)"
            },
            orientation: "h"
        }];
        
        // plot the data in a bar chart
        Plotly.newPlot("bar", trace);
    });
}
  
// Make the bubble chart
function bubble(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {

        // An array of sample objects
        let samples = data.samples;
    
        // Filter data by selected value 
        let filteredData = samples.filter((sample) => sample.id === selectedValue);
    
        // Assign the object to the variable
        let obj = filteredData[0];
        
        // bubble chart
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Sunset"
            }
        }];
    
        // Assign the x-axis
        let layout = {
            xaxis: {title: "OTU ID"}
        };
    
        // plot data into the bubble chart
        Plotly.newPlot("bubble", trace, layout);
    });
}

// Make the gauge chart 
function gauge(selectedValue) {
    // Fetch the JSON data and console log it 
    d3.json(url).then((data) => {
        // Creatr the array of metadata objects
        let metadata = data.metadata;
        
        // Filter data by types 
        
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assign the object to the variable
        let obj = filteredData[0]

        // gauge chart with spectrum of colors
        let trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
            type: "indicator", 
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 10]}, 
                bar: {color: "rgb(68,166,198)"},
                steps: [
                    { range: [0, 1], color: "rgb(255,255,255)" },
                    { range: [1, 2], color: "rgb(255,204,204)" },
                    { range: [2, 3], color: "rgb(255,153,153)" },
                    { range: [3, 4], color: "rgb(255,102,102)" },
                    { range: [4, 5], color: "rgb(255,51,51)" },
                    { range: [5, 6], color: "rgb(204,0,0)" },
                    { range: [6, 7], color: "rgb(153,0,0)" },
                    { range: [7, 8], color: "rgb(102,0,0)" },
                    { range: [8, 9], color: "rgb(51,0,0)" },
                    { range: [9, 10], color: "rgb(0,0,0)" }
                ]
            }
        }];

         // Plot data in a gauge chart
         Plotly.newPlot("gauge", trace);
    });
}

// Toggle to different plots when changing option
function optionChanged(selectedValue) {
    demo(selectedValue);
    bar(selectedValue);
    bubble(selectedValue);
    gauge(selectedValue)
}

init();
        




