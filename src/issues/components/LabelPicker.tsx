import { FC } from "react";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useLabels } from "../hooks/useLabels";

type Props = {
  selectedLabels: string[];
  onLabelSelected: (label: string) => void;
};

export const LabelPicker: FC<Props> = ({ selectedLabels, onLabelSelected }) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return (
      <div className="flex items-center ">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex items-center flex-wrap gap-2 ">
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          onClick={() => onLabelSelected(label.name)}
          className={`animate-fade-in px-2 py-1 rounded-full text-xs font-semibold mr-2 cursor-pointer ${
            selectedLabels.includes(label.name) ? "selected-label" : ""
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: "#fff",
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
