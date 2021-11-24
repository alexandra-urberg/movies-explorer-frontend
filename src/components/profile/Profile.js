import { useContext, useEffect } from "react";
import PopupNavigator from "../popupNavigator/PopupNavigator";
import { useFormValidation } from "../../utils/hooks/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../header/Header";
import Preloader from "../preloader/Preloader";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormValidation();

  function handleChangeInput(e) {
    handleChange(e);
    if (props.userInput.length > 0) {
      props.setUserInput("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); //Запрещаем браузеру переходить по адресу формы

    props.onUpdate({
      //Передаём значения управляемых компонентов во внешний обработчик
      name: values.name,
      email: values.email,
    });
    resetForm();
  }

  useEffect(() => {
    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    setValues(currentUser.name);
    setValues(currentUser.email);
  }, [currentUser, setValues]);

  return (
    <>
      <Header onPopupOpen={props.onPopupOpen} />
      <main className="profile">
        <h1 className="profile__title">Привет, {props.currentUser.name}!</h1>
        <form className="profile__box" onSubmit={handleSubmit}>
          <label className="profile__label">
            <h2 className="profile__description">Имя</h2>
            <input
              placeholder={props.currentUser.name}
              required
              id="name"
              value={values.name}
              minLength="3"
              maxLength="30"
              name="name"
              type="text"
              autoComplete="on"
              className="profile__input"
              onChange={handleChangeInput}
            />
            <span className={errors.name ? "profile__input-error" : null}>
              {errors.name}
            </span>
          </label>
          <label className="profile__label">
            <h2 className="profile__description">E-mail</h2>
            <input
              placeholder={props.currentUser.email}
              required
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
              value={values.email}
              id="email"
              name="email"
              type="email"
              autoComplete="on"
              className="profile__input"
              onChange={handleChangeInput}
            />
            <span className={`${errors.email ? "profile__input-error" : null}`}>
              {errors.email}
            </span>
          </label>
          {props.isLoading && <Preloader />}
          <span className="profile__input-error profile__margin">
            {props.userInput}
          </span>
          <button
            type="submit"
            className={`profile__button profile__button-text ${
              errors.name || errors.email || null
                ? "form__button_disabled"
                : null
            }`}
            disabled={!isValid || null}
          >
            Редактировать
          </button>
        </form>
        <button className="profile__button-signout" onClick={props.onSignOut}>
          Выйти из аккаунта
        </button>
        <PopupNavigator isOpen={props.isOpen} onClose={props.onClose} />
      </main>
    </>
  );
}

export default Profile;
