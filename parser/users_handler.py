import json

class Error(Exception):
  pass

class InvalidRequestError(Error):
  pass

class InvalidUsernameError(Error):
  pass

def parse_request(user_request_body):
  try:
    body_parsed = json.loads(user_request_body)
  except json.decoder.JSONDecodeError:
    raise InvalidRequestError('Request body must be valid JSON')

  try:
    username = body_parsed['username']
  except KeyError:
    raise InvalidRequestError('Request must include username field')

  if not (1 <= len(username) <= 20):
    raise InvalidUsernameError('Username must be between 1 and 20 characters')

  if username.lower() == 'root':
    raise InvalidUsernameError('Username cannot be root')

  try:
    bio = body_parsed['bio']
  except KeyError:
    raise InvalidRequestError('Request must include bio field')

  return {'username': username, 'bio': bio}