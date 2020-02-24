const AWS = require('aws-sdk');
AWS.config.update({ 
    region: 'us-east-2',
    //dynamodb: {
    //    endpoint: process.env.AWS_DYNAMODB_ENDPOINT
    //}
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;
//const tableName = 'User';

exports.lambdaHandler = async(event) => {
    let userid = event.pathParameters.userid;
    let data = await dynamodb.get({
        TableName: tableName,
        Key: {
            userid: userid
        }
    }).promise();

    if(data.Item) {
        return {
            statusCode:200,
            body: JSON.stringify(data.Item)
        };
    } else {
        return {
            statusCode:404,
            body: JSON.stringify({
                message: "User not found"
            })
        };
    }
}