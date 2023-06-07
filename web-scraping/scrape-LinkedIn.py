import requests

# API credentials
client_id = '78784hofk0ayc8'
client_secret = '3rMFjQwksEH2ikba'
access_token = 'USER_ACCESS_TOKEN'

def generate_authorization_url():
    """
    Generate an authorization URL for a user to give permission to extract their LinkedIn Profile.

    The genereated URL will take the user to a LinkedIn page where the user will be asked to give explicit
    permission to share their profile with you (the application creator).

    Should the user agree, they will be redirected to `LINKEDIN_REDIRECT_URI`.
    In the redirect, two fields will appear in the URL parameter, namely `code` and `state`.

    * `state` is generated below using `secrets.token_hex(8).upper()`. This is as a form of identifier for this user.
    * `code` is the authorization_code, and can be used in `get_access_token()` to exchange for an `access_token`.

    """
    LI_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization'
    url = requests.Request('GET', LI_AUTH_URL,
                           params={
                               'response_type': 'code',
                               'client_id': LINKEDIN_CLIENT_ID,
                               'redirect_uri': LINKEDIN_REDIRECT_URI,
                               'state': secrets.token_hex(8).upper(),
                               'scope': '%20'.join(['r_liteprofile', 'r_emailaddress', 'w_member_social']),
                           }).prepare().url
    return url

def get_access_token(authorization_code):
    """
    Given a authorization `code`, this function will return you `access_token` which can then be used to access a user's LinkedIn profile.
    """
    LI_ACCESS_TOKEN_EXCHANGE_URL = 'https://www.linkedin.com/oauth/v2/accessToken'
    access_token = requests.post(LI_ACCESS_TOKEN_EXCHANGE_URL, params={
        'grant_type': 'authorization_code',
        'code': authorization_code,
        'redirect_uri': LINKEDIN_REDIRECT_URI,
        'client_id': LINKEDIN_CLIENT_ID,
        'client_secret': LINKEDIN_CLIENT_SECRET,
    }).json()['access_token']
    return access_token

def get_profile(access_token):
    """
    Fetches the profile of a LinkedIn user who has given you their permission to view their profile
    """
    LI_PROFILE_API_ENDPOINT = 'https://api.linkedin.com/v2/me'
    r = requests.get(LI_PROFILE_API_ENDPOINT, headers={
                     'Authorization': 'Bearer ' + access_token})
    return r.json()

def get_access_token():
    """
    If you are

    1. an approved LinkedIn developer
    2. on a paid subscription to their Consumer Product

    You can use this function to fetch an `access_token` to access the API.
    """
    LI_ACCESS_TOKEN_EXCHANGE_URL = 'https://www.linkedin.com/oauth/v2/accessToken'
    access_token = requests.post(LI_ACCESS_TOKEN_EXCHANGE_URL, params={
        'grant_type': 'client_credentials',
        'client_id': LINKEDIN_CLIENT_ID,
        'client_secret': LINKEDIN_CLIENT_SECRET,
    }).json()['access_token']
    return access_token

def get_profile(access_token, profile_id):
    """
    Given an `access_token`, fetch structured data of any profile.
    """
    LI_PROFILE_API_ENDPOINT = f'https://api.linkedin.com/v2/people/{profile_id}'
    r = requests.get(LI_PROFILE_API_ENDPOINT, headers={
                     'Authorization': 'Bearer ' + access_token,
                     'X-RestLi-Protocol-Version': '2.0.0'})
    return r.json()

# API endpoint
url = 'https://api.linkedin.com/v2/me'

# Request headers
headers = {
    'Authorization': f'Bearer {access_token}',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

# Make API request
response = requests.get(url, headers=headers)

# Parse and print the profile information
if response.status_code == 200:
    profile_data = response.json()
    # Extract and process the relevant profile information as needed
    print(profile_data)
else:
    print(f"Error: {response.status_code} - {response.text}")

