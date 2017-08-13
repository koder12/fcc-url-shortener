# FCC URL Shortener Microservice

Implemented using Express and Tingodb & Tungus (remember to use Mongoose 3.x version)

## User stories:
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

3. When I visit that shortened URL, it will redirect me to my original link.


### Example usage:
https://rainy-respect.glitch.me/new/https://www.freecodecamp.org/map

### Example output:
{"original_url":"https://www.freecodecamp.org/map","short_url":"https://rainy-respect.glitch.me/3"}