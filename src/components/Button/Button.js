import css from './Button.module.css';

const Button = ({ onClick, title }) => {
  return (
    <button className={css.Button} type="button" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
