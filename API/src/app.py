
from xml.parsers.expat import model
from flask import Flask, request, jsonify
from flask_restful import Api, Resource

from kiyo_model import compute_summarize


app = Flask(__name__)
api = Api(app)

class Summary(Resource):
    # get request text string and returns summary
    def get(self, text):
        
        # access the ML model
        summary = compute_summarize(text)
        print(summary)
        return jsonify(summary)

    def post(self):
        return {"data": "posted!"}

api.add_resource(Summary, "/summary/<string:text>")

if __name__ == "__main__":
    app.run(debug=True)

@app.after_request
def after_request(response):
    white_origin= ['http://localhost']
    if request.headers['Origin'] in white_origin:
        response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] 
        response.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    print("after:")
    print(response)
    return response