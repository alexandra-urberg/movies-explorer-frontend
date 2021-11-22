import Form from "../form/Form";
import Preloader from "../preloader/Preloader";
import { useFormValidation } from "../../utils/hooks/useFormValidation";

function Login({
  userLoginInput,
  setuserLoginInput,
  onAuthorization,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  function handleChangeInput(e) {
    handleChange(e);
    if (userLoginInput.length > 0) {
      setuserLoginInput("");
    }
  }

  function deleteErrors() {
    resetForm();
  }

  function handleSubmit(e) {
    e.preventDefault(); //Запрещаем браузеру переходить по адресу формы

    onAuthorization({
      //Передаём значения управляемых компонентов во внешний обработчик
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Form
      onSubmit={handleSubmit}
      header="Рады видеть!"
      componentName="form__signIn"
      errors={errors.email || errors.password || null}
      disabled={!isValid || null}
      path="/profile"
      btn="Войти"
      cleanErrors={deleteErrors}
      text="Ещё не зарегистрированы?"
      link="/sign-up"
      linkTitle=" Регистрация"
    >
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
          minLength="6"
          autoComplete="on"
          className="form__password form__input"
          onChange={handleChangeInput}
        />
        <span className={`${errors.password ? "form__input-error" : null}`}>
          {errors.password}
        </span>
      </label>
      {isLoading && <Preloader />}
    </Form>
  );
}

export default Login;
