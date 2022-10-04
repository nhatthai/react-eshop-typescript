import background from '../../assets/images/header.jpg';
import logo_color from '../../assets/images/logo_color.svg';
import { Identity } from '../Indentity';
import './styles.scss';

export const Header = (): JSX.Element => {
  return (
    <header className="esh-app-header" style={{ backgroundImage: `url(${background})` }}>
        <div className="esh-app-header-promo">
        <span className="esh-app-header-promo-title">All T-SHIRTS</span>
        <span className="esh-app-header-promo-subtitle">
            On sale this weekend
        </span>
        </div>
        <div className="container">
        <article className="d-flex align-content-center justify-content-between">
            <section>
            <a href="/#">
                <img
                className="esh-app-header-brand"
                src={logo_color}
                alt="Logo"
                />
            </a>
            </section>

            <section className="d-flex justify-content-end">
            <Identity></Identity>
            </section>
        </article>
        </div>
    </header>
  );
}