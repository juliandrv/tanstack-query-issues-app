import { CgSpinner } from 'react-icons/cg';

const LoadingSpinner = () => {
  return (
    <div className='loading'>
      <div className='animate-spin'>
        <CgSpinner size={28} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
