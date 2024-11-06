import Icon from '../icons/Icon';
import Logo from '../icons/Logo';
import { Link } from 'react-router-dom';
import classes from './header.module.scss';
import Lalasia from '../icons/Lalasia';

const Header = () => (
  <header className={classes.header}>
    <div className="wrapper">
      <div className={classes.headerWrapper}>
        <div className={classes.logo}>
          <Logo className={classes.logoIcon} width={42} height={42} />
          <Lalasia className={classes.logoText} width={76} height={19} />
        </div>
        <nav className={classes.menu}>
          <ul className={classes.menuList}>
            <li className={classes.menuItem}>
              <Link to="/">Products</Link>
            </li>
            <li className={classes.menuItem}>Categories</li>
            <li className={classes.menuItem}>About us</li>
          </ul>
        </nav>
        <nav className={classes.menuIcons}>
          <Icon className="menu-icons__bag" width={30} height={30}>
            <path
              d="M9.375 9.58751V8.37501C9.375 5.56251 11.6375 2.80001 14.45 2.53751C17.8 2.21251 20.625 4.85001 20.625 8.13751V9.86251"
              stroke="#151411"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.25 27.5H18.75C23.775 27.5 24.675 25.4875 24.9375 23.0375L25.875 15.5375C26.2125 12.4875 25.3375 10 20 10H10C4.66253 10 3.78753 12.4875 4.12503 15.5375L5.06253 23.0375C5.32503 25.4875 6.22503 27.5 11.25 27.5Z"
              stroke="#151411"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.3694 15H19.3806"
              stroke="#151411"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.6181 15H10.6294"
              stroke="#151411"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Icon>
          <Icon className="menu-icons__profile" width={30} height={30}>
            <path
              d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z"
              stroke="#151411"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25.7374 27.5C25.7374 22.6625 20.9249 18.75 14.9999 18.75C9.07495 18.75 4.26245 22.6625 4.26245 27.5"
              stroke="#151411"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Icon>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
