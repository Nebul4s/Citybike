# Helsinki Citybike

This project has a node server serving data about the journeys made and pick-up locations of Helsinki Citybike users from mondodb to a react client where the data is displayed by listing all the journeys and locations on separate tabs and when item is selected showing the departure and return station or the pick-up location on the map and displaying details about the journey or the location.

User can also enter in new journeys/locations through a form

## How to install and run this project

Installation with npm

```bash
  cd Citybike-main
  npm install ./client ./server
```

Running the server

```bash
  cd server
  npm start
```

Running the client in a new terminal window

```bash
  cd client
  npm start
```

## Tech Stack

**Client:** React, SCSS

**Server:** Node, Express, MongoDB, Mongoose

## Known Issues

- In the filter a oneway slider component will give an error about the input being changed from controlled to uncontrolled

## Features coming soon

- Importing new journeys and locations from csv file to mongoDB
