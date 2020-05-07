
# Backend service for SpotifySocial

The primary goals for this backend service is to 
1. Provide the application the desired endpoints to authenticate and get user-specific data
2. Communicate with the Spotify Web API endpoints 
3. Update MongoDB Database with relevant data
4. Provide data for training the machine learning model

## Setup Instructions
- Clone the Repository
- Navigate to back/ directory
- Run 'npm install' to install the dependencies
- In back/ directory, create a .env file. The environment variables required are provided in a sample .env file at the bottom of this README
- Run 'npm start' to start the server ( at http://localhost:PORT/ )
- This is the server to which the front/ should make requests to 
- Note: PORT is one of the environment variables. If not set, the application defaults to 8080. From this point onwards, the docs assume the PORT environment variable has been set to 8080

There are two main topics - README for Web App and README for Data Science Engine

# README for Web App

## Middleware

### Token Reset
- Applicable to routes: /profile, /get, /new, /update
- Fetches the user refresh token from either session or cookie
- If fetched from cookie, it requests for a new access token and appropriately updates the session
- if fetched from session, it checks expiration and if expired it requests for a new access token and appropriately updates the session
- It updates the refresh token in the cookie
- Returned HTTP codes and responses:
	- 401: Refresh Token not successfully reset 

### Profile
- Applicable to routes: /profile, /get, /new, /update
- Fetches user data using the refresh token in the session and adds the user data in the session
- Returned HTTP codes and responses:
	- 400: Bad Request, Failed to get Profile

### Update Token
- Applicable when fetching the access token during Profile middleware the a new refresh token is issued
- Updates the Refresh token in the backend database
- Returned HTTP codes and responses:
	- 500: Database Update Error

Note: The error codes and messages of the middleware can also be returned by the routes which they belong to

## Endpoints

### http://localhost:8080/login
- GET Request
- No query parameter expected
- It rediects to Spotify's authorization page where users can authenticate themselves by passing the client api keys and the redirect uri
- It sets a cookie as state which is later checked to ensure that the user got through the authorization from our platform itself
- Since it redirects to spotify's service, there is no response success or error code to the frontend

### http://localhost:8080/
- GET request 
- This is the redirect uri to which spotify authorization service redirects to after success or failure of authentication
- If the user successfully authenticated and the state matched then user access and refresh tokens are fetched from spotify's token API
- On success, it also adds the tokens to the user's session and redirects to the <web app's domain>/
- On failure due to whatever reason (the state mismatched, the user did not authorize or failure to fetch the tokens), it redirects to <web app's domain>/error with the error code of 401
- Adds the user refresh token to the the user's cookies and a cookie flag which indicates the user is logged in
- This endpoint is meant to be called directly by Spotify and not the web app. It will result in a 401 error as described above if the requests come from anywhere other than through the spotify login redirect route

### http://localhost:8080/logout
- GET request with the credentials sent
- Clears the cookies set by '/' endpoint
- Returns a status code of 200 on success

### http://localhost:8080/profile
- GET request with the credentials sent
- Fetches the user details from the session
- if the user does not exist, it adds him to the database 
- Returned HTTP codes and responses:
	- 200: JSON with keys: 'id','display_name','spotifyUrl', 'images'. All are strings apart from 'images' which is of type array
	- 500: Database Update error

### http://localhost:8080/get/friends
- GET request with the credentials sent
- Fetches the friends of the current logged in user
- Returned HTTP codes and responses:
	- 200: JSON array. One JSON for every friend. The keys of the JSON are the same as described in /profile
	- 500: Internal Server Error! Failed to fetch friend data from ID
	- 500: Database Error: Error finding friends

### http://localhost:8080/get/requests
- GET request with the credentials sent
- Fetches the friend requests of the current logged in user
- Returned HTTP codes and responses:
	- 200: JSON array. One JSON for every friend. The keys of the JSON are the same as described in /profile
	- 500: Internal Server Error! Failed to fetch friend data from ID
	- 500: Database Error: Error finding friends

### http://localhost:8080/get/users
- GET request with the credentials sent
- Fetches the all the users 
- Returned HTTP codes and responses:
	- 200: JSON array. One JSON for every friend. The keys of the JSON are the same as described in /profile
	- 500: Database Error: Error finding Users
	- 400: Could not fetch user data

### http://localhost:8080/new/request
- POST request with credentials sent
- Content-Type: application/json
- Body parameters: user_id: \<user id of the user to which the current user is sending a friend request to \>
- Adds the request in current user's sent collection and the user_id's request collection
- Returned HTTP codes and responses:
	- 200: Successfully Added friend request
	- 400: Provide a user id in query body
	- 400: Provide a user id that exists
	- 500: Database Error: Could not add friend request
	- 500: Database Error: Failed to fetch users
	- 500: Internal Server Error! Failed to fetch friend data from ID
	- 500: Database Error: Cannot find userid

### http://localhost:8080/update/request
- POST request with credentials sent
- Content-Type: application/json
- Body parameters: user_id: \<user id of the user whos friend request was either accepted or rejected by current user\> flag = true || 'true' || false || 'false' (true if accepted, false if rejected)
- Based on flag, eithers adds a new friend and removes the friend request from the current user list or simply removes the friend request based on flag value
- Returned HTTP codes and responses:
	- 200: Successfully Deleted Friend Request
	- 200: Successfully Added friend
	- 400: Provide a user id in query body
	- 400: Provide a user id that exists
	- 400: Provide a flag in query body
	- 400: Provide a valid flag
	- 400: Bad Request: No friend request found with such user_id
	- 500: Database Error: Failed to fetch users
	- 500: Database Error: Could delete friend request
	- 500: Internal Server Error! Failed to fetch friend data from ID
	- 500: Database Error: Cannot find userid
	- 500: Database Error: Could not add friend

# README for Data Science Engine:

Since these endpoints are only for our internal data science engine, very HTTP request requires a secret query parameter which must exactly match
a password in our database

## Endpoints

### http://localhost:8080/ml/songs/saved
- GET request
- Returns all the users saved tracks
- Returned HTTP codes and responses:
	- 200: JSON array where the key is the user_id and the value is the json response from spotify
	- 400: Could not get saved songs for all users

### http://localhost:8080/ml/songs/top
- GET request
- Returns all the users top tracks
- Returned HTTP codes and responses:
	- 200: JSON array where the key is the user_id and the value is the json response from spotify
	- 400: Could not get top songs for all users

### http://localhost:8080/ml/artists/top
- GET request
- Returns all the users top artists
- Returned HTTP codes and responses:
	- 200: JSON array where the key is the user_id and the value is the json response from spotify
	- 400: Could not get top artists for all users


## Sample .env file
PORT=8080
SPOTIFY_CLIENT_ID={spotify_client_id}
SPOTIFY_CLIENT_SECRET={spotify_client_secret}
SESSION_SECRET={session_secret}
AUTH_COOKIE_VAL={auth_cookie_val}
MONGO_USERNAME={db_username}
MONGO_PASSWORD={db_password}
MONGO_CONNECT_URI={db_connect}
ML_SECRET={ml_secret}