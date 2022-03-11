
from xml.parsers.expat import model

# import libraries
from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin

# ML model
from kiyo_model import initalize_model, compute_summarize

# setup
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

api = Api(app)
# define rules
get_args = reqparse.RequestParser()
get_args.add_argument("text", type=str, help="Input text")

# initialize ML model
model = initalize_model()

class Summary(Resource):
    # get text string and returns summary
    def get(self, text):
        summary = compute_summarize(text, model)
        return jsonify(
            message = (summary['summary_text'])
        )


api.add_resource(Summary, "/summary/<string:text>")

if __name__ == "__main__":
    app.run(debug=True)
