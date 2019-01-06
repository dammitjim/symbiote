import { Express, Request, Response } from "express";

import * as controllers from "./controllers";

import { EventCallbackBody } from "./requests";

interface HTTPHandler {
    (req: Request, res: Response): void;
}

const LINK_SHARED_EVENT = "link_shared";
const URL_VERIFICATION_TYPE = "url_verification";
const EVENT_CALLBACK_TYPE = "event_callback";


function getEventController(body: EventCallbackBody): HTTPHandler {
    let { type } = body.event;
    switch (type) {
        case LINK_SHARED_EVENT:
            return controllers.linkSharedController;
    }
    return controllers.invalidEventController;
}

async function intakeHandler(req: Request, res: Response) {
    let { body } = req;
    switch (body.type) {
        case URL_VERIFICATION_TYPE:
            await controllers.urlVerificationController(req, res);
            break;
        case EVENT_CALLBACK_TYPE:
            const fn = getEventController(body)
            await fn(req, res);
            break;
        default:
            res.status(400);
            res.json({message: "Invalid event type."});
    }
}

export default function(app: Express) {
    app.post("/api/v1/intake/", intakeHandler);
}
