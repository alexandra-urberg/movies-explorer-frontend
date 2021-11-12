import { useState } from "react";
import Form from "../form/Form";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  }); //state of input validation

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

    if (value.length < 6 || value.includes("")) {
      validationErrors.password =
        "Enter the correct password without spaces and more than 6 symbols";
    } else {
      validationErrors.password = "" && setValidationErrors(validationErrors);
    }
  }
  return (
    <Form
      header="Рады видеть!"
      id="email"
      title="E-mail"
      value={email}
      className="login__name"
      type="email"
      onChange={handleChangeEmail}
      error={validationErrors.email}
      message={validationErrors.email}
      componentName="form__signIn"
      errors={validationErrors.email || validationErrors.password || null}
      disabled={validationErrors.email || validationErrors.password || null}
      path="/profile"
      btn="Войти"
      text="Ещё не зарегистрированы?"
      link="/sign-up"
      linkTitle=" Регистрация"
    >
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

export default Login;
