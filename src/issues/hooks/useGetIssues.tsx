import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.action";
import { State } from "../interfaces/issue.interface";
import { useEffect, useState } from "react";

type Props = {
  state: State;
  selectedLabels: string[];
};

export const useGetIssues = ({ state, selectedLabels }: Props) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels, page }],
    queryFn: () => getIssues(state, selectedLabels, page),
    staleTime: 1000 * 60, // 1 minute
  });

  const prevPage = () => {
    if (page === 1) return;

    setPage((prevPage) => prevPage - 1);
  };

  const nextPage = () => {
    if (!issuesQuery.data || issuesQuery.data.length === 0) return;
    setPage(page + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [state]);

  useEffect(() => {
    setPage(1);
  }, [selectedLabels]);

  return {
    issuesQuery,
    // getters
    page,
    // actions
    prevPage,
    nextPage,
  };
};
