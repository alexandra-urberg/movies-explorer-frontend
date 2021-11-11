import { useState } from "react";
import PopupNavigator from "../popupNavigator/PopupNavigator";

function Profile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
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

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__box">
        <label className="profile__label">
          <h2 className="profile__description">Имя</h2>
          <input
            required
            id="name"
            value={name}
            name="name"
            type="text"
            autoComplete="on"
            className="profile__input"
            placeholder="Виталий"
            onChange={handleChangeName}
          />
          <span
            className={validationErrors.name ? "profile__input-error" : null}
          >
            {validationErrors.name}
          </span>
        </label>
        <label className="profile__label">
          <h2 className="profile__description">E-mail</h2>
          <input
            required
            value={email}
            id="email"
            name="email"
            type="email"
            autoComplete="on"
            className="profile__input"
            placeholder="pochta@yandex.ru"
            onChange={handleChangeEmail}
          />
          <span
            className={`${
              validationErrors.email ? "profile__input-error" : null
            }`}
          >
            {validationErrors.email}
          </span>
        </label>
        <button
          type="submit"
          className={`profile__button profile__button-text ${
            validationErrors.name || validationErrors.email || null
              ? "form__button_disabled"
              : null
          }`}
          disabled={validationErrors.name || validationErrors.email || null}
        >
          Редактировать
        </button>
      </form>
      <button className="profile__button-signout">Выйти из аккаунта</button>
      <PopupNavigator isOpen={props.isOpen} onClose={props.onClose} />
    </main>
  );
}

export default Profile;
