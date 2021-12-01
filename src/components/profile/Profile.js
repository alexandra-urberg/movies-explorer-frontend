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
    if (props.userUpdateError.length > 0) {
      props.setUserUpdateError("");
    } else if (props.successText.length > 0) {
      props.setSuccessText("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); //Запрещаем браузеру переходить по адресу формы
    props.onUpdate({
      name: values.name,
      email: values.email,
    });
    resetForm();
  }

  useEffect(() => {
    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    setValues(currentUser);
  }, [currentUser, setValues]);

  return (
    <>
      <Header onPopupOpen={props.onPopupOpen} />
      <main className="profile">
        <h1 className="profile__title">Привет, {props.currentUser.name}!</h1>
        <form className="profile__box form" onSubmit={handleSubmit}>
          <label className="profile__label">
            <h2 className="profile__description">Имя</h2>
            <input
              placeholder="Введите новое имя"
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
              placeholder="Введите новый email"
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
          <span
            className={`profile__margin ${
              props.successText
                ? "profile__input-success"
                : "profile__input-error"
            }`}
          >
            {props.userUpdateError || props.successText}
          </span>
          <button
            type="submit"
            className={`profile__button profile__button-text ${
              !isValid ? "form__button_disabled" : null
            }`}
            disabled={!isValid}
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

