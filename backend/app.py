from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS, cross_origin
import requests
import json
import yesg
import pandas
import time
import json

app = Flask(__name__)
CORS(app)
#CORS(app, resources={r"/*": {"origins": "*"}})
#cors = CORS(app, resources={r"/*": {"origins": "http://localhost:port"}})


client1 = OpenAI( 
    #api_key = os.environ['OPENAI_API_KEY']
    api_key = "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"
)
client2 = OpenAI( 
    #api_key = os.environ['OPENAI_API_KEY']
    api_key = "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"
)
rainforest_api_key = '96255297DE974A5EBD6BE6B2459198BD'

motherly_tone="You are a mother going shopping with her child. Speak in a parental tone to a child who wants to buy a product. Make sure your response is short but covers briefly all essential topics. You know that your child does not need anything."
genz_tone="You are a blunt, brutally honest, and a bit rude Gen Z teenager shopping with their friend. Speak to your friend who wants to buy a product, that you know they do not need. Use Gen Z TikTok terminology, acronyms, and references. Use some phrases like: 'Be so for real with me right now' and 'Are you serious'. Make sure your response is short but covers briefly all essential topics."
neutral_tone="You are ChatGPT advising someone on whether or not they should buy a product. You know they do not need the product. Make sure your response is short but covers briefly all essential topics."

pros_query=" Create a list of 5 pros of the product."
cons_query=" Create a list of 5 cons of the product."
summary_query=" Write a brief summary of the pros and cons, take into consideration the reviews, esg score of the company and also follow your personality."
worthit_query=" Explain why or why not this product is worth it."
openai_score_query=" Give a rating for this product on a scale of 1 to 10 for how worth it this item is. Give only a numerical value."



@app.route('/amazon-info', methods=['GET', 'POST'])
def amazon_info():
    # create storage dictionary
    response = {}
    product_info = getAmazonInfo('B0CP9YB3Q4')
    
    response['title'] = product_info.get('product').get('title')
    response['price'] = product_info.get('product').get('buybox_winner').get('price').get('raw')
    response['company'] = product_info.get('product').get('brand')
    response['overall_rating'] = product_info.get('product').get('rating')
    response['image'] = product_info.get('product').get('images')[0].get('link')
    response['feature_bullets'] = product_info.get('product').get('feature_bullets')
    response['reviews'] = []
    response['esg_scores'] = {}

    time.sleep(5)

    # get reviews
    for star_rating in ['one_star', 'five_star']:
        star_rating_info = getAmazonReviews('B0CP9YB3Q4', star_rating)
        for i in range(5):
            response['reviews'].append(star_rating_info.get('reviews')[i]['body'])
    
    # # for testing matters
    # star_rating_info = getAmazonReviews('B0CP9YB3Q4', 'all_stars')
    # for i in range(10):
    #     response['reviews'].append(star_rating_info.get('reviews')[i]['body'])

    # calculate ESG score
    computeESGScore(response)  

    createOpenAIInfo(response)

    with open("sampleAmazon.json", "w") as outfile: 
        json.dump(response, outfile)
    # return dictionary
    return response


@app.route('/neutral-query', methods=['GET', 'POST'])
def neutral_query():
    openai_info = request.json.get('openai_info')
    
    query_results = {}
    # instantiate client.chat.completions
    query_results['pros_query'] = callOpenAI(client1, neutral_tone, openai_info + pros_query)
    query_results['cons_query'] = callOpenAI(client2, neutral_tone, openai_info + cons_query)
    time.sleep(5)
    query_results['summary_query'] = callOpenAI(client1, neutral_tone, openai_info + summary_query)
    query_results['worthit_query'] = callOpenAI(client2, neutral_tone, openai_info + worthit_query)
    time.sleep(5)
    query_results['openai_score_query'] = callOpenAI(client1, neutral_tone, openai_info + openai_score_query)

    with open("sample1.json", "w") as outfile: 
        json.dump(query_results, outfile)
    return query_results

@app.route('/motherly-query', methods=['GET', 'POST'])
def motherly_query():
    openai_info = request.json.get('openai_info')
    
    query_results = {}
    # instantiate client.chat.completions
    query_results['pros_query'] = callOpenAI(client1, neutral_tone, openai_info + pros_query)
    query_results['cons_query'] = callOpenAI(client2, neutral_tone, openai_info + cons_query)
    time.sleep(5)
    query_results['summary_query'] = callOpenAI(client1, motherly_tone, openai_info + summary_query)
    query_results['worthit_query'] = callOpenAI(client2, motherly_tone, openai_info + worthit_query)
    time.sleep(5)
    query_results['openai_score_query'] = callOpenAI(client1, motherly_tone, openai_info + openai_score_query)
    
    with open("sample2.json", "w") as outfile: 
        json.dump(query_results, outfile)
    return query_results

@app.route('/genz-query', methods=['GET', 'POST'])
def genz_query():
    openai_info = request.json.get('openai_info')
    
    query_results = {}
    # instantiate client.chat.completions
    query_results['pros_query'] = callOpenAI(client1, neutral_tone, openai_info + pros_query)
    query_results['cons_query'] = callOpenAI(client2, neutral_tone, openai_info + cons_query)
    time.sleep(5)
    query_results['summary_query'] = callOpenAI(client1, genz_tone, openai_info + summary_query)
    query_results['worthit_query'] = callOpenAI(client2, genz_tone, openai_info + worthit_query)
    time.sleep(5)
    query_results['openai_score_query'] = callOpenAI(client1, genz_tone, openai_info + openai_score_query)
    with open("sample3.json", "w") as outfile: 
        json.dump(query_results, outfile)
    return query_results


def getAmazonInfo(asin):
    params = {
        'api_key': rainforest_api_key,
        'type': 'product',
        'amazon_domain': 'amazon.com',
        'asin': "B0B7F65Y51",
        'currency': 'cad'
    }

    # make the http GET request to Rainforest API
    api_result = requests.get('https://api.rainforestapi.com/request', params)
    print(api_result)
    # return the JSON response from Rainforest API
    return api_result.json()

def getAmazonReviews(asin, review_stars):
    params = {
    'api_key': rainforest_api_key,
    'type': 'reviews',
    'amazon_domain': 'amazon.com',
    'asin': asin,
    'review_stars': review_stars,
    'sort_by': 'most_helpful'
    }

    # make the http GET request to Rainforest API
    api_result = requests.get('https://api.rainforestapi.com/request', params)

    # return the JSON response from Rainforest API
    return api_result.json()
 
def callOpenAI(client, system_query, user_query):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": system_query},
        {"role": "user", "content": user_query}
    ]
    )
    return str(completion.choices[0].message.content)

def computeESGScore(response):
    if response['company'] == "Meta":
        response['esg_scores']['total'] =  yesg.get_historic_esg('META').iloc[-1, 0]
        response['esg_scores']['e_score'] =  yesg.get_historic_esg('META').iloc[-1, 1]
        response['esg_scores']['s_score'] =  yesg.get_historic_esg('META').iloc[-1, 2]
        response['esg_scores']['g_score'] =  yesg.get_historic_esg('META').iloc[-1, 3]
    elif response['company'] == "Stanley":
        response['esg_scores']['total'] =  yesg.get_historic_esg('SWK').iloc[-1, 0]
        response['esg_scores']['e_score'] =  yesg.get_historic_esg('SWK').iloc[-1, 1]
        response['esg_scores']['s_score'] =  yesg.get_historic_esg('SWK').iloc[-1, 2]
        response['esg_scores']['g_score'] =  yesg.get_historic_esg('SWK').iloc[-1, 3]
    else: # response['company'] == "Amazon"
        response['esg_scores']['total'] =  yesg.get_historic_esg('AMZN').iloc[-1, 0]
        response['esg_scores']['e_score'] =  yesg.get_historic_esg('AMZN').iloc[-1, 1]
        response['esg_scores']['s_score'] =  yesg.get_historic_esg('AMZN').iloc[-1, 2]
        response['esg_scores']['g_score'] =  yesg.get_historic_esg('AMZN').iloc[-1, 3]

def createOpenAIInfo(response):
    info = "The product is " + response['title'] + " from " + response['company'] + ". "
    info += "It has an overall rating of " + str(response['overall_rating']) + " and costs " + str(response['price']) + " CAD. "
    info += "The features are as follows: " + str(response['feature_bullets']) + ". "
    info += "The reviews are as follows: " + ", ".join(response['reviews']) + ". "
    info += "The company has an ESG score of " + str(response['esg_scores']['total']) + " /40 and bigger number is worse."
    response['openai_info'] = info

if __name__ == '__main__':
    app.run(debug=True)