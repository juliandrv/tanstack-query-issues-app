import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers/sleep";
import { GithubIssue, State } from "../interfaces/issue.interface";

export const getIssues = async (state: State, selectedLabels: string[]) => {
  await sleep(1500); // Simulate network delay

  const params = new URLSearchParams();

  if (state !== State.All) {
    params.append("state", state);
  }

  if (selectedLabels.length > 0) {
    params.append("labels", selectedLabels.join(","));
  }

  const { data } = await githubApi.get<GithubIssue[]>("/issues", { params });

  return data;
};
