export interface EventBody {
    type: string;
}

export interface EventCallbackBody extends EventBody {
    event: any;
}

export interface UrlVerificationBody {
    token: string;
    challenge: string;
}

export function validateUrlVerificationBody (body: UrlVerificationBody): boolean {
    // TODO logging
    if (!body.challenge) {
        return false;
    }
    if (!body.token) {
        return false;
    }
    // TODO validate token from slack
    return true;
}

export interface SlackLink {
    domain: string;
    url: string;
}

export interface LinkSharedBody {
    type: string;
    channel: string;
    user: string;
    message_ts: string;
    thread_ts: string;
    links: SlackLink[];
}
