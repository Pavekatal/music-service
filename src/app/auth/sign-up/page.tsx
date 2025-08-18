'use client';

// import AuthForm from '@components/auth-form/AuthForm';

import Link from 'next/link';
import Image from 'next/image';
import styles from './signup.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import { registration } from '../../../services/auth/authApi';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../../store/store';
import { useRouter } from 'next/navigation';
import { setCurrentUser } from '../../../store/features/userSlice';

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [dataField, setDataField] = useState({
    email: '',
    username: '',
    password: '',
    newpassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeDataField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataField({ ...dataField, [name]: value });
  };

  const onSubmitUserData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setErrorMessage('');

    if (
      !dataField.email.trim() ||
      !dataField.username.trim() ||
      !dataField.password.trim() ||
      !dataField.newpassword.trim()
    ) {
      setErrorMessage('Заполните все поля');
      return;
    }

    if (dataField.password !== dataField.newpassword) {
      setErrorMessage('Пароли не совпадают. Повторите ввод');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { newpassword, ...dataToSend } = dataField;

    registration(dataToSend)
      .then((res) => {
        console.log(res.data);
        dispatch(setCurrentUser(res.data.result));
        localStorage.setItem('user', JSON.stringify(res.data.result));
        alert('Регистрация прошла успешно!');
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
            if (error.response.data.data.errors.email) {
              setErrorMessage(error.response.data.data.errors.email);
            }
            if (error.response.data.data.errors.username) {
              setErrorMessage(error.response.data.data.errors.username);
            }
            if (error.response.data.data.errors.password) {
              setErrorMessage(error.response.data.data.errors.password);
            }
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
        name="email"
        value={dataField.email}
        placeholder="Почта"
        autoComplete="email"
        onChange={onChangeDataField}
      />
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="username"
        value={dataField.username}
        placeholder="Имя пользователя"
        autoComplete="username"
        onChange={onChangeDataField}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        value={dataField.password}
        placeholder="Пароль"
        autoComplete="new-password"
        onChange={onChangeDataField}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="newpassword"
        value={dataField.newpassword}
        placeholder="Повторите пароль"
        autoComplete="new-password"
        onChange={onChangeDataField}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button className={styles.modal__btnSignupEnt} onClick={onSubmitUserData}>
        Зарегистрироваться
      </button>
    </>
  );
}
