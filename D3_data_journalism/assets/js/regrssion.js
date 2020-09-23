linearRegression = ss.linearRegression(data.map(d => [d.x, d.y]));

linearRegressionLine = ss.linearRegressionLine(linearRegression);

// We need to define the 2 points of the regression line to be able to have D3 make a line.
// This just makes 2 points, 1 for the start and 1 for the end of our line.
regressionPoints = {
    const firstX = data[0].x;
    const lastX = data.slice(-1)[0].x;
    const xCoordinates = [firstX, lastX];
    
    return xCoordinates.map(d => ({
      x: d,                         // We pick x and y arbitrarily, just make sure they match d3.line accessors
      y: linearRegressionLine(d)
    }));
  }

  // We also need to prepare a line generator that knows what to do with each datapoint.
line = d3.line()
.x(d => xScale(d.x))
.y(d => yScale(d.y))


// Lastly, here's the function that will tie everything together!

/* 
Draws a scatterplot and linear regression line and attaches it to the DOM node "target".
*/
renderChart = (target) => {
  

            
    // Next, we'll draw the regression line
    target.append('path')
          .classed('regressionLine', true)
          .datum(regressionPoints)
          .attr('d', line);
            

  }