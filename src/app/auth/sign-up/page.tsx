// import AuthForm from '@components/auth-form/AuthForm';

import Link from 'next/link';
import Image from 'next/image';
import styles from './signup.module.css';
import classNames from 'classnames';

export default function SignUpPage() {
  return (
    <>
      {/* <AuthForm isSignUp={true} /> */}

      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        autoComplete="login"
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        autoComplete="new-password"
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        autoComplete="new-password"
      />
      <div className={styles.errorContainer}></div>
      <button className={styles.modal__btnSignupEnt}>Зарегистрироваться</button>
    </>
  );
}
