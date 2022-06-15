'use strict';
exports.handler = (event, context, callback) => {
    
    // Extract the request from the CloudFront event that is sent to Lambda@Edge 
    var request = event.Records[0].cf.request;

    // Extract the URI from the request
    var uri = request.uri
    
    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } 
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    
    // Log the URI as received by CloudFront and the new URI to be used to fetch from origin
    console.log("Original URI: " + uri);
    console.log("Updated  URI: " + request.uri);
    
    // Return to CloudFront
    return callback(null, request);

};