# Code snippet for RunKit endpoint
## Introduction
[RunKit](https://runkit.com/) is an online service that allow you to easily create public endpoint, available on Internet, where you can implement some logic written in NodeJS. This page contains some usefule snippets to be used as a starting point.

## Read GET url parameter
When you call the endpoint in GET with query string parameters, with this code you can read and use the qs parameters.

```javascript
const parse = require('url-parse');

exports.endpoint = async function (request, response) {

    //  Convert the url in a JSON object
    let url = parse(request.url, true);

    //  JSON object returned by the endpoint
    let out = {}

    //  In this example you have 2 parameters as input: param1 and param2 
    //  Let's put this into the output object.

    out = {
        param1: url.query.param1,
        param2: url.query.param2
    }
    
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(out));

}
```

## Read JSON body from a POST HTTP Request
When you call the endpoint in POST with JSON body, with this code you can read and use the body.

```javascript
exports.endpoint = async function (request, response) {

    //  Get call body from readableStream
    let body = '';
    request.on('data', (chunk) => {body += chunk;});
    
    //  Once the readableStream is closed, you can use the body JSON object.
    request.on('end', () => {
        //  Write code here
        let postData = JSON.parse(body)
        //  ....
        
        //  For example, you can return the JSON body as it is.
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(body);
    });

}
```
