import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { FiSkipBack } from 'react-icons/fi';
import { useGetIssue } from '../hooks/useGetIssue';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();

  const issueNumber = Number(params.number ?? 0);
  const { issueQuery, issueCommentsQuery } = useGetIssue(issueNumber);

  if (issueQuery.isLoading) {
    return <div className=''>Loading Issue...</div>;
  }

  if (!issueQuery.data) {
    return <Navigate to='/404' />;
  }

  return (
    <div className='mb-5'>
      <div className='mb-4'>
        <button
          onClick={() => navigate(-1)}
          className='hover:underline text-blue-400 flex items-center'
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {issueCommentsQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        issueCommentsQuery.data?.map((comment) => (
          <IssueComment key={comment.id} issue={comment} />
        ))
      )}

      {/* Comentario de otros */}
      {/* <IssueComment body={comment2} />
      <IssueComment body={comment3} /> */}
    </div>
  );
};
