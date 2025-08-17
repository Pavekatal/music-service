// import AuthForm from '@components/auth-form/AuthForm';

import Link from 'next/link';
import Image from 'next/image';
import styles from './signin.module.css';
import classNames from 'classnames';

export default function SignInPage() {
  return (
    <>
      {/* <AuthForm isSignUp={false} /> */}

      <a href="/music/main">
        <div className={styles.modal__logo}>
          <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        autoComplete="login"
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        autoComplete="new-password"
      />
      <div className={styles.errorContainer}>{/*Блок для ошибок*/}</div>
      <button className={styles.modal__btnEnter}>Войти</button>
      <Link href={'/auth/sign-up'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
