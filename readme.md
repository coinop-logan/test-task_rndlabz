# Crypto Price Watcher

This app tracks the prices of cryptocurrencies defined in `config/tokens.ts`. Currently three cryptos and their inverse prices are tracked.

The assignment specifies that the user should be able to view "selected" cryptos. I considered dropdowns and buttons to facilitate the user having to "select" one to satisfy the spec, but in the end chose to implement a simple search box which narrows the list down to tokens matching the search; this seemed the most useful of the different ways to interpret the act of selection for this application.

## Setup/Testing/Running

Prerequisites:
* node (tested with v21)
* npm (tested with v10)
* docker

### Setup

In the project root:

`npm install`

Setup the .env file:

* Rename/copy `backend/.env.template` to `backend/.env`. In that file:
  * Set `COINGECKO_API_KEY` to the an api obtained from the Coingecko Developer Dashboard (after creating an account) (free tier works)
  * Set `MONGO_PASSWORD` to something long and random

### Testing

`npm run test`

(one of these tests fails. More in this under Notes below.)

### Running Locally

In one terminal, go to the `backend/` directory and run `docker-compose up`.

In another terminal, in the project root run `npm run dev`; this will start up both the backend and the frontend.

Visit http://localhost:5173/ in a browser to see the app running.

## Tech Choices

**Typescript** was chosen for its strong typing; strong typing helps to minimize bugs and goes a long way toward keeping technical debt low throughout the life of any project.

**Vue** was chosen partially because it works well with Typescript, and partially because the framework is familiar to me.

A **REST api** was chosen over GraphQL due to the straightforward nature of the communication between the server and client: we're basically just fetching price data. GraphQL would be more appropriate if we expected to do more complex querying or manipulation of a large, more complex dataset.

**Express** was chosen due to its simplicity in implementing REST apis.

**Coingecko** was chosen simply because it is a well-known, simple to use price provider.

**MongoDB** was chosen due both to its simplicity and because it's designed to scale horizontally.

## Under the Hood

The frontend has a single Vue component which contains a search box and the list of token pricing info. Upon being mounted, this component requests from the backend pricing info for each label found in `config/tokens.ts`. The backend handles this call in `backend/src/controllers/PriceController.ts`, which translates the label into an ID and then hands this ID to `backend/src/services/FetchPrice.ts`. This first checks a database to see if we've already fetched the price and if it's not too old (this time limit can be set in `backend/.env`, and is currently 30 min). If the price has not been stored or is too old, Coingecko is called to fetch and store the price. The price is handed back up to the frontend, possibly inverting the price if appropriate for the label as specified in `config/tokens.ts`.

## Notes

* Generally speaking, I underestimated how much time I'd need to complete the task, and failed to deliver on two points:
  * The the frontend task is failing, and I'm not sure why. What it's testing for is actually working in the frontend, so it's some issue with the test itself; probably an interaction with the reactivity of Vue and the testing framework jest.
  * The visual design of this app is... minimalistic, to put it lightly. While the assignment said that aesthetic design is not required, I'd hoped to deliver something a bit less ugly.
* There are three points under scalability concerns in the assignment, which I'll comment on.
  * **Supporting multiple tokens:** Already implemented; more tokens can be easily added in `config/tokens.ts`.
  * **Integrating with Multiple Data Providers:** Partially implemented. Line 20 of `backend/src/services/FetchPrice.ts` defines a list of functions that know how to fetch a price from an api. One could add more endpoints to this list. However, this is not a fully working solution as-is, because different providers would expect different IDs. For this to work, the api providers would need to use the same IDs, or the `config/tokens.ts` would have to know which IDs to use for the various api endpoints. Putting this aside, adding multiple providers would result in the app trying the first in the list, then if there are connection issues, trying the second one, etc. Depending on the intent of adding multiple providers, these could be averaged instead.
  * **Displaying historical data:** Not implemented. This point was too open-ended to directly add affordances for in the current version of the project. If we're storing prices forever (or a long time), we essentially are just replicating the behavior of the very platform we consume from (i.e. Coingecko). If it's shorter than that, how short? And how are we displaying the data: in a graph? There are too many questions here to add any affordances in the code in this direction.

## Improvements

Given more time, the next steps would be:

* Get the frontend test working
* Better visual design
* Better error handling