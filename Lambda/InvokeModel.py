import os
import io
import boto3
import json
import logging

# Function that invokes the sagemaker endpoint

logger = logging.getLogger()
logger.setLevel(logging.INFO)


# grab environment variables
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime= boto3.client('runtime.sagemaker')

def invoke_model(text):
    payload = {'inputs': text}
    response = runtime.invoke_endpoint(
        EndpointName=ENDPOINT_NAME, # defined as environmental variable
        ContentType='application/json',
        Body=json.dumps(payload, indent=1))
    
    #summary = response['Body'].read().decode('utf-8')
    summary = json.loads(response['Body'].read().decode())
    summary = (summary[0])['summary_text']
    logger.info(summary)    
    
    return summary
    

def lambda_handler(event, context):
    text = 'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.'
    res = invoke_model(text)

    return res