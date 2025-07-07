import { CgSpinner } from 'react-icons/cg';

const LoadingSpinner = () => {
  return (
    <div className='loading'>
      <div className='flex w-full justify-center items-center h-full'>
        <CgSpinner size={28} className='animate-spin' />
      </div>
    </div>
  );
};

export default LoadingSpinner;
