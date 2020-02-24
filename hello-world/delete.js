const AWS = require('aws-sdk');
AWS.config.update({ 
    region: 'us-east-2',
    //Uncomment this if you want to run dynamodb locally
    //dynamodb: {
    //    endpoint: process.env.AWS_DYNAMODB_ENDPOINT
    //}
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;
//Uncomment this if you want to run dynamodb locally
//const tableName = 'User';

exports.lambdaHandler = async(event) => {
    let userid = event.pathParameters.userid;

    let data = await dynamodb.delete({
        TableName: tableName,
        Key: {
            userid: userid
        }
    }).promise();
    return {
        statusCode:200,
        body: JSON.stringify({
            message: "User deleted successfully"
        })
    };
}