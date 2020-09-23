// @TODO: YOUR CODE HERE!
var svgWidth = 800;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// function used for updating scale var upon click on axis label
function Scale(Data, chosenAxis,kind) 
{
  // create scales
  var LinearScale = d3.scaleLinear()
    
    if (kind==="x") {
    var LinearScale=LinearScale.domain([d3.min(Data, d => d[chosenAxis]) * 0.9,
    d3.max(Data, d => d[chosenAxis])*1.05 ]);
    LinearScale.range([0, width]);}
    else {
    var LinearScale=LinearScale.domain([d3.min(Data, d => d[chosenAxis]) * 0.85,
      d3.max(Data, d => d[chosenAxis]) * 1.1]);
    LinearScale.range([height,0]); }

  return LinearScale;

}

// function used for updating Axis var upon click on axis label
function renderAxes(newScale, Axis,kind) 
{
  if (kind==="x")
  {
   var bottomAxis = d3.axisBottom(newScale);
      Axis.transition()
        .duration(1000)
        .call(bottomAxis);
  }
  else
  {
    var leftAxis = d3.axisLeft(newScale);
    Axis.transition()
      .duration(1000)
      .call(leftAxis);
  }
  return Axis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newScale, chosenAxis,kind) {

  if (kind==="x") {
    circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newScale(d[chosenAxis]));}
  else {
      circlesGroup.transition()
      .duration(1000)
      .attr("cy", d => newScale(d[chosenAxis]));
    }

  return circlesGroup;
}

// function used for updating Texts group with a transition to
// new Texts
function renderText(TextGroup, newScale, chosenAxis,kind) {

  if (kind==="x") {
    TextGroup.transition()
    .duration(1000)
    .attr("x", d => newScale(d[chosenAxis]));}
  else {
    TextGroup.transition()
      .duration(1000)
      .attr("y", d => newScale(d[chosenAxis]));
    }

  return TextGroup;
}


// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis,chosenYAxis ,circlesGroup) {

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${chosenXAxis} ${d[chosenXAxis]}<br>${chosenYAxis} ${d[chosenYAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}




// function findLineByLeastSquares(data,x, y) {
//   var sum_x = 0;
//   var sum_y = 0;
//   var sum_xy = 0;
//   var sum_xx = 0;
//   var count = 0;
//   values_x=data.map(d => d[x]);
//   values_y=data.map(d => d[y]);
//   // console.log(d3.max(data, d => d[x]));
//   // console.log(data,x,y);
//   /*
//    * We'll use those variables for faster read/write access.
//    */
//   var x = 0;
//   var y = 0;
//   var values_length = values_x.length;

  


//   if (values_length != values_y.length) {
//       throw new Error('The parameters values_x and values_y need to have same size!');
//   }

//   /*
//    * Nothing to do.
//    */
//   if (values_length === 0) {
//       return [ [], [] ];
//   }

//   /*
//    * Calculate the sum for each of the parts necessary.
//    */
//   for (var v = 0; v < values_length; v++) 
//     {
//       x = values_x[v];
//       y = values_y[v];
//       sum_x += x;
//       sum_y += y;
//       sum_xx += x*x;
//       sum_xy += x*y;
//       count++;
//     }

//   /*
//    * Calculate m and b for the formula:
//    * y = x * m + b
//    */
//   var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
//   var b = (sum_y/count) - (m*sum_x)/count;

//   /*
//    * We will make the x and y result line now
//    */
//   result=[];
//   for (var v = 0; v < values_length; v++) {
//       x = values_x[v];
//       y = x * m + b;
//       Temp={};
//       // result_values_x.push(x);
//       // result_values_y.push(y);
//       Temp={x,y}
//       result.push(Temp);
//     }
 
// // console.log(result_values_x,result_values_y);
// //   return {result_values_x, result_values_y};
 
// console.log(result);
//   return result;


// }




// Retrieve data from the CSV file and execute everything below
d3.csv("./assets/data/data.csv").then(function(Data, err) {
  if (err) throw err;

  // var State=Data.map(d => d.abbr);
  // console.log (State);
    
  // parse data
  Data.forEach(function(data) {
    data.obesity = +data.obesity;
    data.obesityHigh = +data.obesityHigh;
    data.obesityLow = +data.obesityLow;
    data.smokes = +data.smokes;
    data.smokesHigh = +data.smokesHigh;
    data.smokesLow = +data.smokesLow;
    data.healthcare = +data.healthcare;
    data.healthcareHigh = +data.healthcareHigh;
    data.healthcareLow = +data.healthcareLow;
    data.poverty = +data.poverty;
    data.povertyMoe = +data.povertyMoe;
    data.income = +data.income;
    data.incomeMoe = +data.incomeMoe;
    data.age = +data.age;
    data.ageMoe = +data.ageMoe;
   });
//    console.log(Data);

  // xLinearScale function above csv import
  var xLinearScale = Scale(Data, chosenXAxis,"x");

  // Create y scale function
  var yLinearScale = Scale(Data, chosenYAxis,"y");

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .attr("transform", `translate(0,0)`)
    .call(leftAxis);


  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 15)
    .attr("fill", "blue")
    .attr("opacity", ".5") ;

// append initial Text
  var TextGroup =chartGroup.append("text")
    .selectAll("tspan")
    .data(Data)
    .enter()
    .append("tspan")
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]-.4))
    .classed("stateText", true)
    .text(d => d.abbr)
  

// LinearReg (Data,chosenXAxis,chosenYAxis);


console.log(Data["id"],chosenYAxis);


Linear_x_y = _.zipWith(Data.chosenXAxis,Data.chosenYAxis, (X, Y) => (
  {
    X: year,
    Y: salary
  }
))
console.log(Linear_x_y);


linearRegression = d3.regressionLinear()
   .x(d => d.X)
   .y(d => d.Y)
   .domain([-1.7, 16]);
res = linearRegression(Linear_x_y)
console.log(res)


// var Linear_x_y=findLineByLeastSquares (Data,"age","smokes");
// console.log(Linear_x_y);



  chartGroup.append("svg:path")
  .datum(Linear_x_y)
    .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 1.5)
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("d", d3.line()
  .x(function(d) { 
    console.log(d.x);
    return (d.x)*10 ;})   
  .y(function(d) { 
    console.log(d.y);
    return (d.y)*10}));


  //  var LinearLine=chartGroup.selectAll("path")
  //     .data(Linear_x_y)
  //     .enter()
  //     .append("path")
  //     .attr("fill", "black")
  //     .attr("stroke", "black")
  //     .attr("stroke-width", 5)
  //     .attr("d", line);
      
      // d3.line()
      //   .x(function(d) { return (d.result_values_x) })
      //   .y(function(d) { console.log(d.result_values_y );
      //     return (d.result_values_y) }))
        

    // // Add the line
    // var LinearLine=chartGroup.append("path")
    // .attr("fill", "black")
    // .attr("stroke", "black")
    // .attr("stroke-width", 5)
    // .attr("d", d3.line()
    //   .x([6,20])
    //   .y([10,20]))
      



  // Create group for x-axis labels
  var xlabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var povertyLable = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("#poverty(%)");

  var ageLable = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("#age");

    var incomeLable = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("#income");

    // append y axis
    var ylabelsGroup= chartGroup.append("g")
    .attr("transform", "rotate(-90)");

    var obsesLable=ylabelsGroup.append("text")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "obesity") // value to grab for event listener
    .classed("inactive", true)
    .text("#obesity");

    var smokesLable=ylabelsGroup.append("text")
    .attr("y", 0 - margin.left+20)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .text("#smokes");

    var healthcareLable=ylabelsGroup.append("text")
    .attr("y", 0 - margin.left+40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "healthcare") // value to grab for event listener
    .classed("active", true)
    .text("#healthcare");


  // x axis labels event listener
  xlabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      console.log (value);

      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;
        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = Scale(Data, chosenXAxis,"x");

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis,"x");

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis,"x");

        // updates Texts with new x values
        TextGroup = renderText(TextGroup, xLinearScale, chosenXAxis,"x");

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis,chosenYAxis, circlesGroup);

        // changes classes to change bold text

        switch(chosenXAxis){
            case "poverty":
                povertyLable
                .classed("active", true)
                .classed("inactive", false);
                ageLable
                .classed("active", false)
                .classed("inactive", true);
                incomeLable
                .classed("active", false)
                .classed("inactive", true);
                break;
            case "age":
                povertyLable
                .classed("active", false)
                .classed("inactive", true);
                ageLable
                .classed("active", true)
                .classed("inactive", false);
                incomeLable
                .classed("active", false)
                .classed("inactive", true);        
                break;
            case "income":
                povertyLable
                .classed("active", false)
                .classed("inactive", true);
                ageLable
                .classed("active", false)
                .classed("inactive", true);
                incomeLable
                .classed("active", true)
                .classed("inactive", false);        
                break;

        }


      }
    });

  // Y axis labels event listener
  ylabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenYAxis with value
        chosenYAxis = value;

        // console.log(chosenYAxis)

        // functions here found above csv import
        // updates y scale for new data
        yLinearScale = Scale(Data, chosenYAxis,"y");

        // updates y axis with transition
        yAxis = renderAxes(yLinearScale, yAxis,"y");

        // updates circles with new y values
        circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis,"y");

        // updates Tests with new y values
        TextGroup = renderText(TextGroup, yLinearScale, chosenYAxis,"y");

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis,chosenYAxis, circlesGroup);

        // changes classes to change bold text
        switch(chosenYAxis){
            case "obesity":
                obsesLable
                .classed("active", true)
                .classed("inactive", false);
                smokesLable
                .classed("active", false)
                .classed("inactive", true);
                healthcareLable
                .classed("active", false)
                .classed("inactive", true);
                break;
            case "smokes":
                obsesLable
                .classed("active", false)
                .classed("inactive", true);
                smokesLable
                .classed("active", true)
                .classed("inactive", false);
                healthcareLable
                .classed("active", false)
                .classed("inactive", true);        
                break;
            case "healthcare":
                obsesLable
                .classed("active", false)
                .classed("inactive", true);
                smokesLable
                .classed("active", false)
                .classed("inactive", true);
                healthcareLable
                .classed("active", true)
                .classed("inactive", false);        
                break;

        }
        
        
      }
    });




}).catch(function(error) {
  console.log(error);
});
