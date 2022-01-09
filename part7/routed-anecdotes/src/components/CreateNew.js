import { useField } from '../hooks';
import { useHistory } from 'react-router-dom';

const CreateNew = (props) => {
  let history = useHistory();
  const { reset: resetContent, ...content } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetInfor, ...info } = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push('/');
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfor();
  };
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
