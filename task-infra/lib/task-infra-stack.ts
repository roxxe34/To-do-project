import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ddb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class TaskInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB table
    const table = new ddb.Table(this, 'TaskTable', {
      partitionKey: { name: 'id', type: ddb.AttributeType.STRING },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
    });

    // add a secondary index
    table.addGlobalSecondaryIndex({
      indexName: 'user_index',
      partitionKey: { name: 'user-id', type: ddb.AttributeType.STRING },
      sortKey: { name: 'created_time', type: ddb.AttributeType.NUMBER },
    });

    // Lambda function
    const handler = new lambda.Function(this, 'TaskHandler', {
      runtime: lambda.Runtime.PYTHON_3_12,
      code: lambda.Code.fromAsset('../task-manager-api/app'),
      handler: 'todo.handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // grant the lambda role read/write permissions to our table
    table.grantReadWriteData(handler);

    // create url so we can access the lambda function
    const functionUrl = handler.addFunctionUrl(
      {authType: lambda. FunctionUrlAuthType . NONE,
        cors: {
        allowedOrigins: ["*"],
        allowedMethods: [lambda.HttpMethod. ALL],
        allowedHeaders: ["*"],
    
      }
    }
    );
    //output the function url
    new cdk.CfnOutput(this, 'FunctionUrl', {
      value: functionUrl.url,
    });
    

  }
}