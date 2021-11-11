import { Link } from "react-router-dom";

function Form(props) {
  return (
    <main className="form">
      <div className="form__head">
        <Link to="/">
          <div className="form__logo background-color"></div>
        </Link>
        <h1 className="form__title">{props.header}</h1>
      </div>
      <div className="form__container">
        <form className="form__box">
          <label className="form__label">
            <h2 className="form__description">{props.title}</h2>
            <input
              required
              id={props.id}
              value={props.value}
              name={props.name}
              type={props.type}
              autoComplete="on"
              className="form__input"
              onChange={props.onChange}
            />
            <span className={`${props.error ? "form__input-error" : null}`}>
              {props.message}
            </span>
          </label>
          {props.children}
          <button
            type="submit"
            className={`${props.componentName} form__button form__button-text ${
              props.errors ? "form__button_disabled" : null
            }`}
            disabled={props.disabled}
          >
            {props.btn}
          </button>
        </form>
        <div className="form__route-container">
          <h2 className="form__question">
            {props.text}
            <Link to={props.link} className="form__link">
              {props.linkTitle}
            </Link>
          </h2>
        </div>
      </div>
    </main>
  );
}

export default Form;
