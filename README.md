
# Fullstack Challenge Frontend

https://balance-meter-challenge.netlify.app/

Built in React using VITE, conecting to a Nodejs Server built with Express using REST Api connections

Works in connection with its server-side partner https://github.com/BrunoGN91/Fullstack_challenge_BE built in Node.js

## Local Enviroment for testing

Since the app is deployed in heroku and working with its serverside partner, the HTTP requests are all linked
to its partner in the heroku app.

In order to start testing in a local enviroment you should:

Replace the .env.example file

```bash
.env.example
```

with

```bash
.env
```

And add the port from where you will fetch the server side APIS, at 'http://localhost:8888'. 

## Installation

You will need to pull the server side of the app built in NodeJs - https://github.com/BrunoGN91/Fullstack_challenge_BE

Once its set up you can run this app after the following commands:

```bash
npm install
```

```bash
npm run dev
```

Enjoy!



