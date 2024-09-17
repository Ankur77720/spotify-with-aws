Sure, here is a basic documentation for your music streaming application in Markdown format:

### Music Streaming Application Documentation

#### Table of Contents
1. [Introduction](#introduction)
2. [Setup](#setup)
3. [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Music](#music)
    - [Playlists](#playlists)
    - [Search](#search)
    - [History](#history)
    - [Favorites](#favorites)
4. [Middleware](#middleware)
5. [Models](#models)

---

### Introduction
This is a music streaming application similar to Spotify, where there are two types of users: normal users and artists. Artists can upload music, while normal users can listen to music, create playlists, add or remove music from playlists, and manage their favorites.

### Setup
1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd music-streaming-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the MongoDB server:
    ```sh
    mongod
    ```

4. Start the application:
    ```sh
    npm start
    ```

### API Endpoints

#### Authentication
- **Register**
    - **URL:** `/auth/register`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "username": "string",
            "password": "string",
            "role": "normal" | "artist"
        }
        ```
    - **Response:** `201 Created`

- **Login**
    - **URL:** `/auth/login`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "username": "string",
            "password": "string"
        }
        ```
    - **Response:** `200 OK`

- **Logout**
    - **URL:** `/auth/logout`
    - **Method:** `GET`
    - **Response:** `200 OK`

#### Music
- **Upload Music** (Artist only)
    - **URL:** `/music/upload`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "title": "string",
            "url": "string",
            "poster": "The poster file to upload (optional)",
            "album": "string",
            "genre": "string"
        }
        ```
    - **Response:** `201 Created`

- **Get All Music**
    - **URL:** `/music`
    - **Method:** `GET`
    - **Response:** `200 OK`
        ```json
        [
            {
                "_id": "string",
                "title": "string",
                "artist": {
                    "_id": "string",
                    "username": "string"
                },
                "url": "string",
                "album": "string",
                "genre": "string"
            }
        ]
        ```

#### Playlists
- **Create Playlist**
    - **URL:** `/playlist/create`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "name": "string",
            "songs": ["musicId1", "musicId2"]
        }
        ```
    - **Response:** `201 Created`

- **Get User Playlists**
    - **URL:** `/playlist`
    - **Method:** `GET`
    - **Response:** `200 OK`
        ```json
        [
            {
                "_id": "string",
                "name": "string",
                "user": "string",
                "songs": ["musicId1", "musicId2"]
            }
        ]
        ```

- **Add Song to Playlist**
    - **URL:** `/playlist/add-song`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "playlistId": "string",
            "songId": "string"
        }
        ```
    - **Response:** `200 OK`

- **Remove Song from Playlist**
    - **URL:** `/playlist/remove-song`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "playlistId": "string",
            "songId": "string"
        }
        ```
    - **Response:** `200 OK`

#### Search
- **Search Music**
    - **URL:** `/search`
    - **Method:** `GET`
    - **Query Parameters:**
        - `query`: The search term
    - **Response:** `200 OK`
        ```json
        [
            {
                "_id": "string",
                "title": "string",
                "artist": {
                    "_id": "string",
                    "username": "string"
                },
                "url": "string",
                "album": "string",
                "genre": "string"
            }
        ]
        ```

#### History
- **Add to History**
    - **URL:** `/history/add`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "musicId": "string"
        }
        ```
    - **Response:** `201 Created`

- **Get User History**
    - **URL:** `/history`
    - **Method:** `GET`
    - **Response:** `200 OK`
        ```json
        [
            {
                "_id": "string",
                "user": "string",
                "music": {
                    "_id": "string",
                    "title": "string",
                    "artist": "string",
                    "url": "string",
                    "album": "string",
                    "genre": "string"
                },
                "listenedAt": "date"
            }
        ]
        ```

#### Favorites
- **Add Music to Favorites**
    - **URL:** `/favorites/add-music`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "musicId": "string"
        }
        ```
    - **Response:** `200 OK`

- **Remove Music from Favorites**
    - **URL:** `/favorites/remove-music`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "musicId": "string"
        }
        ```
    - **Response:** `200 OK`

- **Get Favorite Music**
    - **URL:** `/favorites/music`
    - **Method:** `GET`
    - **Response:** `200 OK`
        ```json
        [
            {
                "_id": "string",
                "title": "string",
                "artist": {
                    "_id": "string",
                    "username": "string"
                },
                "url": "string",
                "album": "string",
                "genre": "string"
            }
        ]
        ```

- **Add Artist to Favorites**
    - **URL:** `/favorites/add-artist`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "artistId": "string"
        }
        ```
    - **Response:** `200 OK`

- **Remove Artist from Favorites**
    - **URL:** `/favorites/remove-artist`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "artistId": "string"
        }
        ```
    - **Response:** `200 OK`

- **Get Favorite Artists**
    - **URL:** `/favorites/artists`
    - **Method:** `GET`
    - **Response:** `200 OK`
        ```json
        [
            {
                "_id": "string",
                "username": "string"
            }
        ]
        ```

### Middleware
- **isAuthenticated**
    - Ensures the user is authenticated.
    - Usage: `router.use(isAuthenticated);`

- **isArtist**
    - Ensures the user is authenticated and has the role of 'artist'.
    - Usage: `router.use(isArtist);`

### Models
#### User
```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['normal', 'artist'], required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
  favoriteArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
```

#### Music
```javascript
const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  album: { type: String },
  genre: { type: String }
});
```

#### Playlist
```javascript
const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }]
});
```

#### History
```javascript
const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  music: { type: mongoose.Schema.Types.ObjectId, ref: 'Music', required: true },
  listenedAt: { type: Date, default: Date.now }
});
```

This documentation provides an overview of the setup, API endpoints, middleware, and models for your music streaming application. You can expand it further as you add more features and functionalities.