import os
import pymongo
import json
import random
import hashlib
import time

import requests

from hashlib import sha256



def sendsms(tonum, mesg):


    url = "https://us-central1-aiot-fit-xlab.cloudfunctions.net/sendsms"

    payload = json.dumps({
    "receiver": tonum,
    "message": mesg,
    "token": "hackeroo"
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    # print(response.text)

def hashthis(st):


    hash_object = hashlib.md5(st.encode())
    h = str(hash_object.hexdigest())
    return h



def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()



    receiver_public_key = os.environ.get('ownpublic')

    mongostr = os.environ.get('MONGOSTR')
    client = pymongo.MongoClient(mongostr)
    db = client["learnai"]


    retjson = {}

    action = request_json['action']

    if action == "getuserdata":
        col = db.users
        for x in col.find():
            if int(x['id']) == int(request_json['userid']):
                name = x['name']

                address = x['address']


                retjson = {}

                # retjson['dish'] = userid
                retjson['status'] = "success"
                retjson['name'] = name
                retjson['address'] = address                
                retjson['email'] = x['email']
                retjson['phone'] = x['phone']
                retjson['cuisine'] = x['cuisine']
                retjson['publickey'] = x['publickey']
                

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)


    if action == "getrawquiz":
        col = db.questions
        tables = []
        for x in col.find():
            table = {}

            table['id'] = x['id']
            table['question'] = x['question']
            table['dataset'] = x['dataset']
            table['prediction'] = x['prediction']

            tables.append(table)

            


        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "success"
        retjson['questions'] = tables
        

        return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)




    if action == "getquiz":

        ids = random.sample(range(1, 14), 5)


        col = db.questions
        tables = []
        j = 0
        for x in col.find():
            if x['id'] not in ids:
                continue

            correct = {}
            table = {}

            dataset = []
            prediction = []
            dataset.append(x['dataset'])
            prediction.append(x['prediction'])

            ids2 = random.sample(range(1, 14), 4)
            for y in col.find():
                if y['id'] not in ids2:
                    continue
                if y['id'] == x['id']:
                    continue
                dataset.append(y['dataset'])
                prediction.append(y['prediction'])

            table['id'] = x['id']
            table['question'] = x['question']
            table['dataset'] = dataset
            table['prediction'] = prediction

            correct['dataset'] = x['dataset']
            correct['prediction'] = x['prediction']
            table['correct'] = correct


            tables.append(table)

            


        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "success"
        retjson['quiz'] = tables
        retjson['ids'] = ids
        

        return json.dumps(retjson)
        retjson = {}







    if action == "register" :
        maxid = 1
        col = db.users
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["id"] = id
        # payload["uid"] = request_json['uid']
        # payload["name"] = request_json['name']
        payload["name"] = request_json['name']
        payload["email"] = request_json['email']
        payload["phone"] = request_json['phone']

        payload['address'] = request_json['address']

        payload["password"] = request_json['password']


        
        payload["score"] = 0
        payload["currscore"] = 0
        

        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['userid'] = id

        return json.dumps(retjson)


    if action == "login":
        col = db.users
        for x in col.find():
            if x['email'] == request_json['email'] and x['password'] == request_json['password']:
                userid = x['id']
                name = x['name']
                retjson = {}

                # retjson['dish'] = userid
                retjson['status'] = "success"
                retjson['name'] = name
                retjson['userid'] = userid
                

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['userid'] = "-1"

        return json.dumps(retjson)



    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
