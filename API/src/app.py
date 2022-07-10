
from email import message
from xml.parsers.expat import model

# import libraries
from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
import json

# ML model
from kiyo_model import initalize_model, compute_summarize

# setup
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

api = Api(app)

# initialize ML model
model = initalize_model()

def respond(msg):
    return {
        'statusCode': '200',
        'body': json.dumps(msg),
        'headers': {
            'Content-Type': 'application/json'
        }
    }
class Summary(Resource):
    # get text string and returns summary
    def get(self):
        text = request.args.get('text')
        print(text)
        if len(text) > 2:
            summary = compute_summarize(text, model)
            
            # response = jsonify(
            #     message = (summary['summary_text'])
            # )
            response = respond(summary['summary_text'])
            response.headers.add('Access-Control-Allow-Origin', '*')
            print(response)
            return response
        # handle empty selection
        else:
            response = jsonify(
                message = "No text selected! please review this video for more information: https://www.youtube.com/watch?v=xvFZjo5PgG0" 
            )
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    def post(self):
        content = request.args.get('text')


api.add_resource(Summary, "/summary/")

if __name__ == "__main__":
    app.run(debug=True)
