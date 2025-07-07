import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.action";
import { State } from "../interfaces/issue.interface";

type Props = {
  state: State;
  selectedLabels: string[];
};

export const useGetIssues = ({ state, selectedLabels }: Props) => {
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels }],
    queryFn: () => getIssues(state, selectedLabels),
    staleTime: 1000 * 60, // 1 minute
  });

  return {
    issuesQuery,
  };
};
