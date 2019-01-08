import { SlackLink } from "./requests";

import { PullRequest } from "./models";

export async function saveLink(link: SlackLink, user: string) {
  return await PullRequest.query().insert({
    link: link.url,
    slack_user: user,
    state: "new"
  });
}
