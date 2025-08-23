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
import { setIsLoading } from '../../../store/features/loadingSlice';

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [authField, setAuthField] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChangeUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthField({ ...authField, [name]: value });
  };

  const onSubmitUserData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setErrorMessage('');

    if (!authField.email.trim() || !authField.password.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    dispatch(setIsLoading(true));
    // setIsLoading(true);
    login(authField)
      .then((res) => {
        console.log(res);
        dispatch(setCurrentUser(res));
        localStorage.setItem('user', JSON.stringify(res));
        router.push('/music/main');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.log(error.response.data);
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            setErrorMessage(
              'Похоже, что-то с интернет-подключением... Попробуйте позже',
            );
          } else {
            console.log('Error', error.message);
            setErrorMessage('Возникла неизвестная ошибка, попробуйте позже');
          }
        }
      })
      .finally(() => {
        dispatch(setIsLoading(false));
        // setIsLoading(false);
      });
  };
  console.log('isLoading после нажатия кнопки:', isLoading);

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
      <button
        className={classNames(styles.modal__btnEnter, {
          [styles.loading__btn]: isLoading,
        })}
        disabled={isLoading}
        onClick={onSubmitUserData}
      >
        Войти
      </button>
      <Link href={'/auth/sign-up'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
