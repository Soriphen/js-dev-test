import { Router, Request, Response } from "express";

export const repos = Router();

const fetch = require("node-fetch"); // Need node-fetch version 2 in order to use require
const localJson = require("../../data/repos.json");

repos.get("/", async (_: Request, res: Response) => {
  res.header("Cache-Control", "no-store");

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  try {
    const response = await fetch(
      "https://api.github.com/users/silverorange/repos",
      {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" }
      }
    );
    const json = await response.json();
    const combinedJson = json.concat(localJson); // Combining the local json with the one fetched from the external API call
    const newJson = combinedJson.filter((repo: any) => {
      return !repo.fork;
    });
    // res.json(newJson);
    res.send(newJson);
  } catch (err) {
    console.log(err);
  }
});
