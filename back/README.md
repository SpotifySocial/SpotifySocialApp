# Backend service for SpotifySocial

The primary goals for this backend service is to 
1. Provide the application the desired endpoints to authenticate and get user-specific data
2. Communicate with the Spotify Web API endpoints 
3. Update MongoDB Database with relevant data
4. Provide data for training the machine learning model



## Endpoints

### /login
- GET Request
- No query parameter expected
- It rediects to Spotify's authorization page where users can authenticate themselves by passing the client api keys and the redirect uri
- It sets a cookie as state which is later checked to ensure that the user got through the authorization from our platform itself
- Since it redirects to spotify's service, there is no response success or error code to the frontend

### /
- GET request 
- This is the redirect uri to which spotify authorization service redirects to after success or failure of authentication
- If the user successfully authenticated and the state matched then user access and refresh tokens are fetched from spotify's token API
- On success, it also adds the tokens to the user's session and redirects to the <web app's domain>/
- On failure due to whatever reason (the state mismatched, the user did not authorize or failure to fetch the tokens), it redirects to <web app's domain>/error with the error code of 401
- This endpoint is meant to be called directly by Spotify and not the web app. It will result in a 401 error as described above if the requests come from anywhere other than through the spotify login redirect route