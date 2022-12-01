import '../styles/components/Footer.scss';
import {NavLink} from 'react-router-dom';

const Footer = () => {
    return (
       
    <footer className="footer">
        <nav>
            <ul>
                <li className="footer__menu-item">
                <NavLink to='/' className={isActive =>"footer__menu-link" + (!isActive ? "active" : "")}>A jugar
                </NavLink>
                </li>
                <li className="footer__menu-item">
                <NavLink to='/instructions' className={isActive =>"footer__menu-link"+ (!isActive ? "active" : "")}>¿Cómo se juega?
                </NavLink>
                </li>
                <li className="footer__menu-item">
                <NavLink to='/options' className={isActive =>"footer__menu-link"+ (!isActive ? "active" : "")}>Más opciones
                </NavLink>
                </li>
            </ul>
        </nav>
        <small className="footer__copy">© Adalab</small>
    </footer>
        
    )
};

export default Footer;


