import { useQuery } from '@tanstack/react-query';
import { getIssue } from '../actions/get-issue.action';
import { getIssueComments } from '../actions/get-issue-comments.action';

export const useGetIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ['issues', issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60, // 1 minute
  });

  /* const issueCommentsQuery = useQuery({
    queryKey: ['issues', issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueNumber),
    staleTime: 1000 * 60, // 1 minute
  }); */

  const issueCommentsQuery = useQuery({
    queryKey: ['issues', issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueNumber),
    staleTime: 1000 * 60, // 1 minute
    enabled: issueQuery.isSuccess, // Only fetch comments if the issue is successfully fetched
  });

  return {
    issueQuery,
    issueCommentsQuery,
  };
};
