import { useState } from "react";
import { withRouter } from "react-router";
import Form from "../form/Form";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
  }); //state of input validation

  function handleChangeName(e) {
    //Обработчик изменения инпута name обновляет стейт
    const { value } = e.target;
    setName(value);

    if (value.length < 2) {
      validationErrors.name = "Enter more than 2 symbols";
    } else {
      validationErrors.name = "" && setValidationErrors(validationErrors);
    }
  }

  function handleChangeEmail(e) {
    const { value } = e.target;
    setEmail(value);
    const regEx = /.+@.+\..+/;

    if (!regEx.test(value)) {
      validationErrors.email = "Enter the correct email address";
    } else {
      validationErrors.email = "" && setValidationErrors(validationErrors);
    }
  }

  function handleChangePassword(e) {
    //Обработчик изменения инпута about обновляет стейт
    const { value } = e.target;
    setPassword(value);

    if (value.length < 6 || value.includes(" ")) {
      validationErrors.password =
        "Enter the correct password without spaces and more than 6 symbols";
    } else {
      validationErrors.password = "" && setValidationErrors(validationErrors);
    }
  }

  return (
    <Form
      header="Добро пожаловать!"
      id="name"
      title="Имя"
      value={name}
      className="register__name"
      type="text"
      onChange={handleChangeName}
      error={validationErrors.name}
      message={validationErrors.name}
      componentName="form__signUp"
      errors={
        validationErrors.name ||
        validationErrors.email ||
        validationErrors.password
      }
      disabled={
        validationErrors.name ||
        validationErrors.email ||
        validationErrors.password ||
        null
      }
      path="/sign-in"
      btn="Зарегистрироваться"
      text="Уже зарегистрированы?&nbsp;"
      link="/sign-in"
      linkTitle="Войти"
    >
      <label className="form__label">
        <h2 className="form__description">E-mail</h2>
        <input
          required
          value={email}
          id="email"
          name="email"
          type="email"
          autoComplete="on"
          className="form__email form__input"
          onChange={handleChangeEmail}
        />
        <span
          className={`${validationErrors.email ? "form__input-error" : null}`}
        >
          {validationErrors.email}
        </span>
      </label>
      <label className="form__label">
        <h2 className="form__description">Пароль</h2>
        <input
          required
          value={password}
          id="password"
          name="password"
          type="password"
          minLength="6"
          autoComplete="on"
          className="form__password form__input"
          onChange={handleChangePassword}
        />
        <span
          className={`${
            validationErrors.password ? "form__input-error" : null
          }`}
        >
          {validationErrors.password}
        </span>
      </label>
    </Form>
  );
}

export default withRouter(Register);
