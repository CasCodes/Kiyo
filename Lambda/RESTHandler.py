import os
import io
import boto3
import json
import logging

# create info logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# grab environment variables
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime= boto3.client('runtime.sagemaker')
"""
Gets invoked by API Gateway, reads request, computes body with sagemaker
and responds with JSON
"""

def respond(res):
    return {
        'statusCode': '200',
        'body': json.dumps(res),
        'headers': {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
    }

# calls sagemaker endpoint and passes text
def invoke_model(text):
    payload = {'inputs': text}
    response = runtime.invoke_endpoint(
        EndpointName=ENDPOINT_NAME, # defined as environmental variable
        ContentType='application/json',
        Body=json.dumps(payload, indent=1))
    
    summary = json.loads(response['Body'].read().decode())
    summary = (summary[0])['summary_text']
    logger.info(summary)    
    
    return summary

# main entry point
def lambda_handler(event, context):
    body = event['body']
    text = json.loads(body)
    logger.info(text)
    res = invoke_model(text['text'])
    return respond(res)