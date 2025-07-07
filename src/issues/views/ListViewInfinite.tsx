import { useState } from "react";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { State } from "../interfaces/issue.interface";
import { useGetIssuesInfinite } from "../hooks/useGetIssuesInfinite";

export const ListViewInfinite = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issuesQuery } = useGetIssuesInfinite({
    state: state,
    selectedLabels: selectedLabels,
  });

  const issues = issuesQuery.data?.pages.flat() ?? [];

  const onLabelSelected = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col justify-center">
            <IssueList issues={issues} onStateChange={setState} state={state} />

            <button
              onClick={() => {
                issuesQuery.fetchNextPage();
              }}
              className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:pointer-events-none"
              disabled={
                issuesQuery.isFetchingNextPage || !issuesQuery.hasNextPage
              }
            >
              {issuesQuery.isFetchingNextPage ? (
                <LoadingSpinner />
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          onLabelSelected={onLabelSelected}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
