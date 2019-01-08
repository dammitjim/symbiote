import { Request, Response } from "express";

import {
  LinkSharedBody,
  validateUrlVerificationBody,
  UrlVerificationBody
} from "./requests";
import { saveLink } from "./utils";
import { PullRequest } from "./models";

export async function urlVerificationController(req: Request, res: Response) {
  const body = req.body as UrlVerificationBody;
  if (!validateUrlVerificationBody(body)) {
    res.status(400);
    res.json({ message: "invalid payload" });
    return;
  }

  res.json({
    challenge: body.challenge
  });
}

interface PullRequestResult {
  pullRequest: PullRequest;
  result: any;
}

interface PullRequestAPIParts {
  owner: string;
  repo: string;
  number: string;
}

// This function is bad and I should feed bad
// TODO refactor
const convertPRToParts = (link: string): PullRequestAPIParts => {
  const [base, slashyBois, domain, owner, repo, method, number] = link.split(
    "/"
  );
  return { owner, repo, number };
};

export const linkSharedController = async (req: Request, res: Response) => {
  res.json({ message: "ok" });

  const body = req.body as LinkSharedBody;

  // save all the links to the database
  // get the information for all of them on from github
  // enrich saved database link with github data
  // we don't wait for this to process as it does not affect our response
  // TODO refactor this into functions
  Promise.all(
    body.event.links.map(link => {
      return saveLink(link, body.event.user);
    })
  )
    .then((values: PullRequest[]) => {
      const github = req.app.get("github");
      return Promise.all(
        values.map(
          async (pullRequest): Promise<PullRequestResult> => {
            const pullsParts = convertPRToParts(pullRequest.link);
            const result = await github.pulls.get(pullsParts);
            return { pullRequest, result };
          }
        )
      );
    })
    .then((pullRequests: PullRequestResult[]) => {});
};

export async function invalidEventController(req: Request, res: Response) {
  res.status(400);
  res.json({ message: "Invalid event type" });
}
