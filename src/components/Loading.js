import '../styles/components/Loading.scss';

function Loading(props) {
  return props.isLoading ? <span className='loading' /> : '';
}

export default Loading;
