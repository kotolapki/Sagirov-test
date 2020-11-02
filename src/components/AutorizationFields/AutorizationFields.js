import React from 'react';
import './styles.css';

function AutorizationFields(props) {
  return (
    <ul className='form__list'>
      <li className='form__item'>
        <label className='form__label' htmlFor='name'>Email или номер телефона</label>
        <input 
          className='form__input' 
          type='text' 
          name='name' 
          id='name' 
          minLength='3'
          maxLength='40'
          autoComplete='off' 
          required
          onFocus={props.onFocusInput}
          onBlur={props.onBlurInput}
        />
      </li>
      <li className='form__item'>
        <label className='form__label' htmlFor='password'>Пароль</label>
        <input 
          className='form__input' 
          type='password' 
          name='password' 
          id='password' 
          minLength='8'
          pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
          autoComplete='off' 
          required 
          onFocus={props.onFocusInput}
          onBlur={props.onBlurInput}
        />
        <button className='form__password-btn' aria-label='Показать или скрыть пароль' type='button'  onClick={props.onClickChangePasswordVisibility}>
          <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1134 6.9999C12.1134 7.68188 11.8425 8.33593 11.3603 8.81817C10.878 9.30041 10.224 9.57132 9.54201 9.57132C8.86002 9.57132 8.20597 9.30041 7.72373 8.81817C7.2415 8.33593 6.97058 7.68188 6.97058 6.9999C6.97058 6.31791 7.2415 5.66386 7.72373 5.18162C8.20597 4.69938 8.86002 4.42847 9.54201 4.42847C10.224 4.42847 10.878 4.69938 11.3603 5.18162C11.8425 5.66386 12.1134 6.31791 12.1134 6.9999V6.9999Z" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1.36316 7C2.45516 3.52257 5.70459 1 9.54202 1C13.3803 1 16.6289 3.52257 17.7209 7C16.6289 10.4774 13.3803 13 9.54202 13C5.70459 13 2.45516 10.4774 1.36316 7V7Z" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </li>
    </ul>
  )
}

export default AutorizationFields;