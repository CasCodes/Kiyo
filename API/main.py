
from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

class Summary(Resource):
    # get request text string and returns summary
    def get(self, text):
        # access the ML here
        return {"data": text}

    def post(self):
        return {"data": "posted!"}

api.add_resource(Summary, "/summary/<string:text>")

if __name__ == "__main__":
    app.run(debug=True)
