import { Request, Response } from "express";

import { LinkSharedBody, validateUrlVerificationBody, UrlVerificationBody } from "./requests";
import { saveLink } from "./db";

export async function urlVerificationController (req: Request, res: Response) {
    const body = req.body as UrlVerificationBody;
    if (!validateUrlVerificationBody(body)) {
        res.status(400);
        res.json({message: "invalid payload"});
        return;
    }

    res.json({
        challenge: body.challenge
    });
}

export async function linkSharedController(req: Request, res: Response) {
    res.json({message: "ok"});

    const body = req.body as LinkSharedBody;
    // we don't wait for this to process as it does not affect our response
    Promise.all(body.links.map((link) => {
        return saveLink(link);
    }));
}

export async function invalidEventController(req: Request, res: Response) {
    res.status(400);
    res.json({message: "Invalid event type"});
}
