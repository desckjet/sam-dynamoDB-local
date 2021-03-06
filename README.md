# sam-dynamoDB-local

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- hello-world - Code for the application's Lambda function.
- events - Invocation events that you can use to invoke the function.
- hello-world/tests - Unit tests for the application code. 
- template.yaml - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions, API Gateway and DynamoDB. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Tools required

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 12](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

## Run DynamoDB locally

In the root path of the project create a service for DynamoDB
```bash
sam-dynamoDB-local$ docker-compose up -d
```

Create the table
```bash
sam-dynamoDB-local$ bash dynamodb-create-table.sh 
```

Check if the table has Items
```bash
sam-dynamoDB-local$ bash dynamodb-scan-table.sh 
```

## Use the SAM CLI to build and test locally

Run functions locally and invoke them with the `sam local invoke` command.

```bash
sam-dynamoDB-local$ sam local invoke HelloWorldFunction
```

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command and pass a json as a parameter.

```bash
sam-dynamoDB-local$ sam local invoke PostUser --event event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
sam-dynamoDB-local$ sam local start-api --docker-network sam-backend
sam-dynamoDB-local$ curl http://localhost:3000/hello
```

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

## Unit tests

Tests are defined in the `hello-world/tests` folder in this project. Use NPM to install the [Mocha test framework](https://mochajs.org/) and run unit tests.

```bash
sam-app-example$ cd hello-world
hello-world$ npm install
hello-world$ npm run test
```

## Build And Deploy
### Important

`If you want to deploy you need to check that you have the correct environment variables in each lambda funtion and in template.yaml`

Create a `sam.yml` with the following command
```bash
sam package --template-file template.yaml --output-template-file sam.yml --s3-bucket "your S3 bucket name"
```

Deploy to your aws account
```bash
sam deploy --template-file sam.yml --stack-name example-sam --capabilities CAPABILITY_IAM
```

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modified IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name example-sam
```
