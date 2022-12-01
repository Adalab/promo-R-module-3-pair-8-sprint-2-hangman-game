import '../styles/components/Form.scss';

function Form(props) {
  const formSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleInputLetter = (ev) => {
    props.handleInputLetter(ev.target.value);
  };

  return (
    <form className='form' onSubmit={formSubmit}>
      <label className='title' htmlFor='last-letter'>
        Escribe una letra:
      </label>
      <input
        autoComplete='off'
        className='form__input'
        maxLength='1'
        type='text'
        name='last-letter'
        id='last-letter'
        onChange={handleInputLetter}
        value={props.lastLetter}
      />
    </form>
  );
}

export default Form;
