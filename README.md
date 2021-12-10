# silverorange Intermediate Developer Assessment

A full-stack application meant to replicate a repository listing one can find on sites like Github.

## Getting Started

First you run the express app with:

```sh
cd api/
npm install
npm start
```

You can verify the API is working by visiting http://localhost:4000/repos in
your browser or another HTTP client. **Please note that about 25% of the time,
the API returns an error message.**

Then you run the React App with:

```sh
cd web/
npm install
npm start
```

This will open your browser at http://localhost:3000, allowing you to test the
React client.

## To-Dos

- The language filter dropdown needs to signify what is currently being selected at all times
- A css design overhaul is needed, specifically for fancying up the forks repo information such as the amount of forks being displayed with an icon instead of just a number by itself, etc.,
- The modal has the text README.md text overshoot if the width is too small, so a solution is necessary, perhaps starting with max-width
- Cleaning up the code
- Part of the css design overhaul can be introducing the user's picture, inspired by Github's design (maybe make it Neumorphic based)
