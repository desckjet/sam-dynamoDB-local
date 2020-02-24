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
    let {firstname, lastname, email, website} = JSON.parse(event.body);

    let item = {
        userid: userid,
        firstname: firstname,
        lastname: lastname,
        email: email,
        website: website
    }

    await dynamodb.put({
        TableName: tableName,
        Item: item
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Data inserted/updated"
        })
    };
}