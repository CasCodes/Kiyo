import json

# Gets invoked by API Gateway, reads request and responds with JSON

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

# main entry point
def lambda_handler(event, context):
    body = event['body']
    text = json.loads(body)
    return respond(text)