

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            return done(null,getTitle);
            break;
        case 'POST':
            done(null,postTitle);
            break;
        case 'PUT':
            done(null, updateTitle);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }

    const getTitle = new function (cb){
      
      return 'this is the title object';

    }

    const postTitle = new function (){
      
      return 'your title was posted';

    }

    const updateTitle = new function(){

      return 'the title was updated';
    }
};
