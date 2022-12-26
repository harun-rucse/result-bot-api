# Result-bot-API -V1.0

Result-bot-API is a free API build with `nodeJS` and `puppeteer` that allows you to get `SSC` and `HSC` results and returns the result pdf as a response. The API base link is `https://result-bot-api.up.railway.app` and there is a single route `/api/result`. The API requires five query strings named exam, year, board, roll, and reg.

## Getting Started

In order to get started using Result-bot-API, you'll need to make a GET request to the /api/result endpoint using the five required query strings.

## Query Strings

The query strings required for the API are:

- `exam`: The name of the exam for which the result should be retrieved. `Ex: ssc/hsc`
- `year`: The year the exam was conducted. `Ex: 2014`
- `board`: The board conducting the exam. `Ex: Rajshahi`
- `roll`: The roll number of the student. `Ex: 123`
- `reg`: The registration number of the student. `Ex: 123`

- GET request in the browser:

```
https://result-bot-api.up.railway.app/api/result?exam=ssc&year=2014&board=Dhaka&roll=123&reg=1234
```

In the example below, we make a GET request to the /api/result endpoint using the five required query strings.

### Example Code (Javascript)

```js
fetch('https://result-bot-api.up.railway.app/api/result?exam=ssc&year=2014&board=Dhaka&roll=123&reg=1234')
  .then((result) => result.json())
  .then((result) => {
    console.log(result);
  });
```

## Response Format

The response format of the Result-bot-API is a PDF file containing the requested result.
