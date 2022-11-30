import '../styles/components/Letters.scss';

function SolutionLetters(props) {
  return (
    <div className='solution'>
      <h2 className='title'>Solución:</h2>
      <ul className='letters'>{props.renderSolutionLetters()}</ul>
    </div>
  );
}

export default SolutionLetters;
