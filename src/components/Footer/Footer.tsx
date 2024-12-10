import React from 'react';
import Text from '../Text';
import classes from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <div className="wrapper">
        <div className={classes.contacts}>
          <ul className={classes.list}>
            <li>
              <Text view="p-14" color="secondary">
                Email: <span className={classes.contactsValue}>customerservice@lalasia.com</span>
              </Text>
            </li>
            <li>
              <Text view="p-14" color="secondary">
                Support: <span className={classes.contactsValue}>support@lalasia.com</span>
              </Text>
            </li>
            <li>
              <Text view="p-14" color="secondary">
                Phone: <span className={classes.contactsValue}>+1 (555) 123-4567</span>
              </Text>
            </li>
            <li>
              <Text view="p-14" color="secondary">
                Mailing Address:{' '}
                <span className={classes.contactsValue}>123 Fashion Avenue, Suite 400, New York, NY 10001</span>
              </Text>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
