

///This block is an extension of the Block with a regression line fit to the data.

function LinearReg_create_data(Data,X,Y) {
    var x = [];
    var y = [];
    var n = Data.length;
    var x_mean = 0;
    var y_mean = 0;
    var term1 = 0;
    var term2 = 0;
 
    // create x and y values
    for (var i = 0; i < n; i++) {
        x.push(Data[i][X]);
        y.push(Data[i][Y]);
        x_mean += Data[i][X];
        y_mean += Data[i][Y];
   }

   // calculate mean x and y
    x_mean /= n;
    y_mean /= n;
// console.log(x_mean,y_mean);

    // calculate coefficients
    var xr = 0;
    var yr = 0;
    for (i = 0; i < x.length; i++) {
        xr = x[i] - x_mean;
        yr = y[i] - y_mean;
        term1 += xr * yr;
        term2 += xr * xr;

    }
    var b1 = term1 / term2;
    var b0 = y_mean - (b1 * x_mean);
    // perform regression 

    yhat = [];
    // fit line using coeffs
    for (i = 0; i < x.length; i++) {
        yhat.push(b0 + (x[i] * b1));
    }

    var data = [];
    for (i = 0; i < y.length; i++) {
        data.push({
            "yhat": yhat[i],
            "y": Data[i][Y],
            "x": Data[i][X]
        })
    }


    return (data);
}



    
