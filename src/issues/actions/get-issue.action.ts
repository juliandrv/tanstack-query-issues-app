import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers/sleep';
import { GithubIssue } from '../interfaces/issue.interface';

export const getIssue = async (issueNumber: number) => {
  await sleep(1500); // Simulate network delay

  const { data } = await githubApi.get<GithubIssue>(
    `/issues/${issueNumber}`
  );

  return data;
};
