#!/usr/bin/python3

import json

import users_handler

#users_handler.parse_request(json.dumps({'foo': 'bar'}))
#users_handler.parse_request('{')
users_handler.parse_request(json.dumps({'username': 'joe', 'bio': 'I am Joe'}))