import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions/get-issues.action';

export const useGetIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
    staleTime: 1000 * 60, // 1 minute
  });

  return {
    issuesQuery,
  };
};
