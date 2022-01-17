import Form from "../form/Form";
import Preloader from "../preloader/Preloader";
import { useFormValidation } from "../../utils/hooks/useFormValidation";

function Register({
  userRegisterInput,
  setUserRegisterInput,
  onRegistered,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm  } = useFormValidation();

  function handleChangeInput(e) {
    handleChange(e);
    if (userRegisterInput.length > 0) {
      setUserRegisterInput("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); //Запрещаем браузеру переходить по адресу формы

    onRegistered({
      //Передаём значения управляемых компонентов во внешний обработчик
      name: values.name,
      email: values.email,
      password: values.password,
    });
    resetForm();
  }

  return (
    <Form
      onSubmit={handleSubmit}
      header="Добро пожаловать!"
      errors={!isValid}
      disabled={!isValid}
      path="/sign-in"
      component="form__signUp"
      input={userRegisterInput}
      btn="Зарегистрироваться"
      text="Уже зарегистрированы?&nbsp;"
      link="/sign-in"
      linkTitle="Войти"
    >
      <div className="form">
        <label className="form__label">
          <h2 className="form__description">Имя</h2>
          <input
            required
            id="name"
            value={values.name}
            title="Имя"
            name="name"
            type="text"
            minLength="3"
            autoComplete="on"
            className="form__input"
            onChange={handleChangeInput}
            maxLength="30"
          />
          <span className={`${errors.name ? "form__input-error" : null}`}>
            {errors.name}
          </span>
        </label>
        <label className="form__label">
          <h2 className="form__description">E-mail</h2>
          <input
            required
            value={values.email}
            id="email"
            name="email"
            type="email"
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            autoComplete="on"
            className="form__email form__input"
            onChange={handleChangeInput}
          />
          <span className={`${errors.email ? "form__input-error" : null}`}>
            {errors.email}
          </span>
        </label>
        <label className="form__label">
          <h2 className="form__description">Пароль</h2>
          <input
            required
            value={values.password}
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

export default Register;
