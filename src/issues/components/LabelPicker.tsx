import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { useLabels } from '../hooks/useLabels';

export const LabelPicker = () => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return (
      <div className='flex items-center '>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='flex items-center flex-wrap gap-2 '>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          className='animate-fade-in px-2 py-1 rounded-full text-xs font-semibold mr-2 cursor-pointer'
          style={{
            backgroundColor: `#${label.color}`,
            color: '#000',
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
