import { useState } from "react";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useGetIssues } from "../hooks/useGetIssues";
import { State } from "../interfaces/issue.interface";

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issuesQuery, page, prevPage, nextPage } = useGetIssues({
    state: state,
    selectedLabels: selectedLabels,
  });

  const issues = issuesQuery.data ?? [];

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
          <>
            <IssueList issues={issues} onStateChange={setState} state={state} />

            <div className="flex justify-between items-center">
              <button
                onClick={prevPage}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:pointer-events-none"
                disabled={page === 1}
              >
                Prev
              </button>

              <span>page {page}</span>

              <button
                onClick={nextPage}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:pointer-events-none"
                disabled={issues.length < 5}
              >
                Next
              </button>
            </div>
          </>
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
