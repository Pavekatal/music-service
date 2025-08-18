'use client';
// import AuthForm from '@components/auth-form/AuthForm';

import Link from 'next/link';
import Image from 'next/image';
import styles from './signin.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import { login } from '../../../services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setCurrentUser } from '../../../store/features/userSlice';

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const [authField, setAuthField] = useState({ email: '', password: '' });
  // const [errors, setErrors] = useState({ email: false, password: false });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onChangeUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAuthField({ ...authField, [name]: value });
    console.log(authField);
  };

  const onSubmitUserData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setErrorMessage('');

    if (!authField.email.trim() || !authField.password.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    login(authField)
      .then((res) => {
        console.log(res.data);
        dispatch(setCurrentUser(res.data));
        localStorage.setItem('user', JSON.stringify(res.data));
        router.push('/music/main');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который
            // выходит за пределы 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            console.log(error.request);
            setErrorMessage(
              'Похоже, что-то с интернет-подключением... Попробуйте позже',
            );
          } else {
            // Произошло что-то при настройке запроса, вызвавшее ошибку
            console.log('Error', error.message);
            setErrorMessage('Возникла неизвестная ошибка, попробуйте позже');
          }
        }
      });
  };
  console.log('currentUser:', currentUser);
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
        name="email"
        placeholder="Почта"
        autoComplete="email"
        value={authField.email}
        onChange={onChangeUserData}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        autoComplete="new-password"
        value={authField.password}
        onChange={onChangeUserData}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button className={styles.modal__btnEnter} onClick={onSubmitUserData}>
        Войти
      </button>
      <Link href={'/auth/sign-up'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
