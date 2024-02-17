from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
import os 
import requests
import json

app = Flask(__name__)
CORS(app)

client = OpenAI( 
    api_key = os.environ['OPENAI_API_KEY']
)

completion = client.chat.completions.create(
model="gpt-3.5-turbo",
messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
]
)


# intial route 
@app.route('/open-ai', methods=['GET', 'POST'])
def generate():
    name = request.json.get('name')
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
        {"role": "user", "content": name}
    ]
    )
    return str(completion.choices[0].message.content)

@app.route('/amazon', methods=['GET', 'POST'])
def getInfo():
# set up the request parameters
    params = {
    'api_key': 'demo',
    'type': 'reviews',
    'amazon_domain': 'amazon.com',
    'asin': 'B073JYC4XM',
    'review_stars': 'all_critical',
    'sort_by': 'most_recent'
    }

    # make the http GET request to Rainforest API
    api_result = requests.get('https://api.rainforestapi.com/request', params)

    # print the JSON response from Rainforest API
    return api_result.json()
    
    
if __name__ == '__main__':
    app.run(debug=True)