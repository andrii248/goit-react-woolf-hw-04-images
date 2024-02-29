import { Component } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import css from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        <CirclesWithBar
          height="100"
          width="100"
          color="#3f51b5"
          outerCircleColor="#3f51b5"
          innerCircleColor="#3f51b5"
          barColor="#3f51b5"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
}

export default Loader;
