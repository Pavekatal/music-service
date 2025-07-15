import styles from './auth-form.module.css';
import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthForm({ isSignUp }) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
            <form className={styles.modal__form}>
              <Link href="/">
                <div className={styles.modal__logo}>
                  <Image
                    src="/img/logo_modal.png"
                    alt="logo"
                    width={140}
                    height={21}
                  />
                </div>
              </Link>
              <div className={styles.modal__input_wrapper}>
                <input
                  className={styles.modal__input}
                  type="text"
                  name="login"
                  placeholder="Почта"
                  autoComplete="login"
                />
                <input
                  className={classnames(styles.modal__input)}
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  autoComplete="new-password"
                />
                {isSignUp && (
                  <input
                    className={styles.modal__input}
                    type="password"
                    name="password"
                    placeholder="Повторите пароль"
                    autoComplete="new-password"
                  />
                )}
              </div>

              <div className={styles.errorContainer}>{/*Блок для ошибок*/}</div>
              {!isSignUp ? (
                <button className={styles.modal__btnEnter}>Войти</button>
              ) : (
                <button className={styles.modal__btnEnter}>
                  Зарегистрироваться
                </button>
              )}
              {!isSignUp && (
                <Link href={'/sign-up'} className={styles.modal__btnSignup}>
                  Зарегистрироваться
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
