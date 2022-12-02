function Options(props) {
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleChange = (ev) => {
    props.handleChange(ev.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className='title' for='word'>
        Escribe aquí la palabra que hay que adivinar:
      </label>
      <input
        autofocus
        autocomplete='off'
        className='form__input'
        maxlength='15'
        type='text'
        id='word'
        name='word'
        value={props.word}
        onChange={handleChange}
      />
    </form>
  );
}

export default Options;
