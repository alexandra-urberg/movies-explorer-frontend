import PopupNavigator from "../popupNavigator/PopupNavigator";
import { useFormValidation } from "../../utils/hooks/useFormValidation";

function Profile(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  function handleChangeInput(e) {
    handleChange(e);
    if (props.userInput.length > 0) {
      props.setUserInput("");
    }
  }

  function deleteErrors() {
    resetForm();
  }

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {props.name}!</h1>
      <form className="profile__box">
        <label className="profile__label">
          <h2 className="profile__description">Имя</h2>
          <input
            placeholder={props.name}
            required
            id="name"
            value={values.name}
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
            placeholder={props.email}
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
        <button
          onClick={deleteErrors}
          type="submit"
          className={`profile__button profile__button-text ${
            errors.name || errors.email || null ? "form__button_disabled" : null
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
  );
}

export default Profile;
