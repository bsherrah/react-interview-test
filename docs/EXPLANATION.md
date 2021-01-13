# Scenario

  Our app sell cool 3rd party products and need to let users login without requiring any credentials.
  Our app will get essential information about users without spending much time in forms.
  User can easily add items to cart and checkout.

## Task

- Allow users to login using Google OAuth authentication.
  Integrate Google's official supported library as a server side verification to add an additional security layer.
  Retrieve user profile information upon successful login from Google, store it meaningfully in MongoDB database.
  Add a shopping cart to display selected items the user wants to buy and store in the database.
  After the first successful login user should be able to refresh/browse the app, retrieve his profile info and cart items without requiring a new login as long as his access token is not expired.
  Add the functionality to refresh access tokens automatically.
  Ability to 'like' an item and store which items got liked/disliked meaningfully in the database.

## Assumptions

  Typescript and Jest not leveraged in this particular submission. It will be implemented in the next submission.
- In this submission a responsive layout was not added, simple styling had been used with flex boxs where applicable.
- When user clicks Buy the app reset the user cart only, in next submission orders table to be added in database along with payment
api integration.

## Considerations

  Prettier + ESLint used to take care of code formatting and style guide.
  Use React hooks where applicable.
- Handle local state management via apollo reactive variables.

## Setup

- Please makesure to have MongoDB running in the background.
- `yarn install` to install dependencies.
- `yarn dev` to run the app.
  `yarn formate` to enforces a consistent style and code formate.
- Visit http://localhost:8080 for user app.

## Videos

Please reference the folder `/videos` to see a demonstration of added features.
