import { Request, Response } from "express";

import {
  LinkSharedBody,
  validateUrlVerificationBody,
  UrlVerificationBody
} from "./requests";
import { saveLink } from "./utils";

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

export async function linkSharedController(req: Request, res: Response) {
  res.json({ message: "ok" });

  const body = req.body as LinkSharedBody;
  // we don't wait for this to process as it does not affect our response
  Promise.all(
    body.event.links.map(link => {
      return saveLink(link, body.event.user);
    })
  );
}

export async function invalidEventController(req: Request, res: Response) {
  res.status(400);
  res.json({ message: "Invalid event type" });
}
