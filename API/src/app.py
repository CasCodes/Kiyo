
from xml.parsers.expat import model

# from simplejson import load
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin

from kiyo_model import initalize_model, compute_summarize

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
