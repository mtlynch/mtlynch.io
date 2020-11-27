import json

class Error(Exception):
  pass

class InvalidRequestError(Error):
  pass

class InvalidUsernameError(Error):
  pass


def parse_request(request_body_raw):
  """Parse the body of a user request.

  Args:
    request_body_raw: Raw request body, as JSON string.

  Returns:
    The parsed request message, as a dict.
  """
  body_parsed = _parse_request_body_raw(request_body_raw)
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


def parse_response(response_body_raw):
  """Parse the response from the user request.

  Args:
    response_body_raw: Raw response body, as JSON string.

  Returns:
    The parsed response message, as a dict.
  """
  body_parsed = _parse_response_body_raw(request_body_raw)
  error_code = body_parsed['errorCode']
  error_message = body_parsed['errorMessage']

  return {
    'error_code': error_code,
    'error_message': error_message,
  }


def _parse_request_body_raw(request_body_raw):
  try:
    return json.loads(request_body_raw)
  except json.decoder.JSONDecodeError:
    raise InvalidRequestError('Request body must be valid JSON')


def _parse_request_body_raw(request_body_raw):
  try:
    return json.loads(request_body_raw)
  except json.decoder.JSONDecodeError:
    raise InvalidRequestError('Request body must be valid JSON')
