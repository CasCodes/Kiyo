
from xml.parsers.expat import model

# from simplejson import load
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
import json

from kiyo_model import initalize_model, compute_summarize

app = Flask(__name__)
api = Api(app)

model = initalize_model()

class Summary(Resource):
    # get request text string and returns summary
    def get(self, text):
        # access the ML model
        summary = compute_summarize(text, model)
        
        return jsonify(
            message = (summary['summary_text'])
        )


api.add_resource(Summary, "/summary/<string:text>")

if __name__ == "__main__":
    app.run(debug=True)

# @app.after_request
# def after_request(response):
#     white_origin= ['http://localhost']
#     if request.headers['Origin'] in white_origin:
#         response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] 
#         response.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
#         response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
#     print("after:")
#     print(response)
#     return response


# 09:43:56 web.1   |  {'summary_text': 'This course is designed to introduce you to the world of software development and to provide you with the skills and confidence you will need to pursue a career in software development.'}
# 09:43:56 web.1   |  <Response 205 bytes [200 OK]>
