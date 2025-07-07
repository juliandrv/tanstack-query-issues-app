import { useInfiniteQuery } from "@tanstack/react-query";
import { State } from "../interfaces/issue.interface";
import { getIssues } from "../actions/get-issues.action";

type Props = {
  state: State;
  selectedLabels: string[];
};

export const useGetIssuesInfinite = ({ state, selectedLabels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, selectedLabels }],
    queryFn: ({ pageParam, queryKey }) => {
      const [, , args] = queryKey;
      const { state, selectedLabels } = args as Props;

      return getIssues(state, selectedLabels, pageParam);
    },
    staleTime: 1000 * 60, // 1 minute
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length > 0 ? nextPage : undefined;
    },
  });

  return {
    issuesQuery,
  };
};
