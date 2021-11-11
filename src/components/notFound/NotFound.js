import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="notFound">
      <div className="notFound__container">
        <div className="notFound__box">
          <h1 className="notFound__status">404</h1>
          <p className="notFound__message">Страница не найдена</p>
        </div>
        <Link to="/" className="notFound__link">
          Назад
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
