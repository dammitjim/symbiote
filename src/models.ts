import { Model } from "objection";

export class PullRequest extends Model {
  readonly id!: number;
  link!: string;
  slack_user!: string;
  state!: string;
  created_at!: Date;
  updated_at?: Date;

  static tableName = "pull_requests";
}
