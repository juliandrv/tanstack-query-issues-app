import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers/sleep';
import { GithubIssue } from '../interfaces/issue.interface';

export const getIssues = async () => {
  await sleep(1500); // Simulate network delay

  const { data } = await githubApi.get<GithubIssue[]>('/issues');

  return data;
};
