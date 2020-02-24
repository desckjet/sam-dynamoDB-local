const AWS = require('aws-sdk');
//AWS.config.update({ region:'us-east-2' });
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
    let {firstname, lastname, email, website} = JSON.parse(event.body);

    let item = {
        userid: userid,
        firstname: firstname,
        lastname: lastname,
        email: email,
        website: website
    }

    let data = await dynamodb.put({
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