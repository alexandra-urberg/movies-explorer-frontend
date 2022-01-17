import Form from "../form/Form";
import Preloader from "../preloader/Preloader";
import { useFormValidation } from "../../utils/hooks/useFormValidation";

function Login({
  userLoginInput,
  setuserLoginInput,
  onAuthorization,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

  function handleChangeInput(e) {
    handleChange(e);
    if (userLoginInput.length > 0) {
      setuserLoginInput("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); //Запрещаем браузеру переходить по адресу формы

    onAuthorization({
      //Передаём значения управляемых компонентов во внешний обработчик
      email: values.email,
      password: values.password,
    });
    resetForm();
  }

  return (
    <Form
      onSubmit={handleSubmit}
      header="Рады видеть!"
      errors={!isValid}
      disabled={!isValid}
      path="/profile"
      input={userLoginInput}
      component="form__signIn"
      btn="Войти"
      text="Ещё не зарегистрированы?"
      link="/sign-up"
      linkTitle=" Регистрация"
    >
      <div className="form">
      <label className="form__label">
        <h2 className="form__description">E-mail</h2>
        <input
          required
          id="email"
          title="E-mail"
          value={values.email || ""}
          type="email"
          pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
          onChange={handleChangeInput}
          name="email"
          autoComplete="on"
          className="form__input"
        />
        <span className={`${errors.email ? "form__input-error" : null}`}>
          {errors.email}
        </span>
      </label>
      <label className="form__label">
        <h2 className="form__description">Пароль</h2>
        <input
          required
          value={values.password || ""}
          id="password"
          name="password"
          type="password"
          minLength="8"
          autoComplete="on"
          className="form__password form__input"
          onChange={handleChangeInput}
        />
        <span className={`${errors.password ? "form__input-error" : null}`}>
          {errors.password}
        </span>
      </label>
      </div>
      {isLoading && <Preloader />}
    </Form>
  );
}

export default Login;
