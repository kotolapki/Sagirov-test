import React from 'react';
import './styles.css';

class RegistrationFields extends React.Component {
  constructor(props) {
    super(props);
    this.checkboxLabel = null;

    this.setCheckboxLabelRef = element => {
      this.checkboxLabel = element;
    }

    this.focusCheckboxLabel = () => {
      if (this.checkboxLabel) this.checkboxLabel.focus();
    };
  }

  componentDidMount() {
    this.telInput = document.querySelector('#tel');
    this.telInput.addEventListener('keydown', this.telInputKeyPressHandler);
    
    this.checkboxLabel = document.querySelector('.form__agreement-label');
    this.checkboxLabel.addEventListener('keydown',this.checkboxLabelKeypressHandler);
  }

  componentWillUnmount() {
    this.telInput.removeEventListener('keydown', this.telInputKeyPressHandler);
    this.checkboxLabel.removeEventListener('keydown', this.checkboxLabelKeypressHandler);
  }

  checkboxLabelKeypressHandler(e) {
    if (e.code === 'Enter') {
      this.checkbox = document.querySelector('#checkbox');
      this.checkbox.checked = !this.checkbox.checked;
    }
  }

  onFocusCheckboxMoveFocusToLabel = () => {
    this.focusCheckboxLabel();
  }

  telInputKeyPressHandler(e) {
    const startPos = e.target.selectionStart;
    const previousPos = startPos - 1;

    if (e.code === 'Backspace') {
      e.preventDefault();

      if (e.target.value[previousPos] === ' ' && previousPos <= 3) {
        e.target.setSelectionRange(3, 3);
      } else if (e.target.value[previousPos] === ' ') {
        e.target.setSelectionRange(previousPos - 1, previousPos - 1);
        e.target.setRangeText('_', previousPos - 1, startPos - 1, 'start');
      } else {
        e.target.setRangeText('_', previousPos, startPos, 'start');
      }
    } else if (e.code === 'Space') {
      e.preventDefault();
    } else if (e.code === 'ArrowLeft' && startPos < 4) {
      e.target.setSelectionRange(3, 3);
    } else if (e.code === 'ArrowLeft' && e.target.value[startPos - 1] === ' ') {
      e.preventDefault();
      let targetPos = startPos - 2;
      e.target.setSelectionRange(targetPos, targetPos);
    }
  }

  render() {
    return (
      <div className='form__container'>
        <ul className='form__list'>
          <li className='form__item'>
            <label className='form__label' htmlFor='name'>Имя</label>
            <input 
              className='form__input' 
              type='text' 
              name='name' 
              id='name' 
              minLength='2'
              maxLength='25'
              pattern='[А-Яа-яЁё]{2,}'
              autoComplete='off' 
              required
              onFocus={this.props.onFocusInput}
              onBlur={this.props.onBlurInput}
            />
          </li>
          <li className='form__item'>
            <label className='form__label' htmlFor='nickname'>Никнейм</label>
            <input 
              className='form__input' 
              type='text' 
              name='nickname' 
              id='nickname' 
              minLength='2'
              maxLength='25'
              pattern='[A-Za-z]{2,}'
              autoComplete='off' 
              required 
              onFocus={this.props.onFocusInput}
              onBlur={this.props.onBlurInput}
            />
          </li>
          <li className='form__item'>
            <label className='form__label' htmlFor='email'>Email</label>
            <input 
              className='form__input' 
              type='email' 
              name='email' 
              id='email' 
              maxLength='40'
              autoComplete='off'
              required 
              onFocus={this.props.onFocusInput}
              onBlur={this.props.onBlurInput}
            />
          </li>
          <li className='form__item'>
            <label className='form__label' htmlFor='tel'>Телефон</label>
            <input 
              className='form__input' 
              type='tel' 
              name='tel' 
              id='tel' 
              minLength='17'
              pattern='\+[0-9]{1,}\s[0-9]{3,}\s[0-9]{3,}\s[0-9]{2,}\s[0-9]{2,}' 
              autoComplete='off' 
              required 
              onSelect={this.props.onSelectTelInput}
              onFocus={this.props.onFocusTelInput}
              onClick={this.props.onClickTelInput}
              onChange={this.props.onChangeTelInput}
              onBlur={this.props.onBlurTelInput}
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
              maxLength='25'
              pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
              autoComplete='off' 
              required 
              onFocus={this.props.onFocusInput}
              onBlur={this.props.onBlurInput}
            />
            <button 
              className='form__password-btn' 
              aria-label='Показать или скрыть пароль' 
              type='button' 
              tabIndex='0'
              onClick={this.props.onClickChangePasswordVisibility}
            >
              <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1134 6.9999C12.1134 7.68188 11.8425 8.33593 11.3603 8.81817C10.878 9.30041 10.224 9.57132 9.54201 9.57132C8.86002 9.57132 8.20597 9.30041 7.72373 8.81817C7.2415 8.33593 6.97058 7.68188 6.97058 6.9999C6.97058 6.31791 7.2415 5.66386 7.72373 5.18162C8.20597 4.69938 8.86002 4.42847 9.54201 4.42847C10.224 4.42847 10.878 4.69938 11.3603 5.18162C11.8425 5.66386 12.1134 6.31791 12.1134 6.9999V6.9999Z" stroke="#C4C4C4"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.36316 7C2.45516 3.52257 5.70459 1 9.54202 1C13.3803 1 16.6289 3.52257 17.7209 7C16.6289 10.4774 13.3803 13 9.54202 13C5.70459 13 2.45516 10.4774 1.36316 7V7Z" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </li>
        </ul>
        <div className='form__agreement-wrapper'>
          <input 
            className='form__agreement-checkbox visuallyhidden' 
            type='checkbox' 
            name='checkbox' 
            id='checkbox' 
            tabIndex='-1'
            onFocus={this.focusCheckboxLabel}
            required
          />
          <label className='form__agreement-label' tabIndex='0' htmlFor='checkbox' ref={this.setCheckboxLabelRef}>Я даю свое согласие на обработку персональных данных</label>
        </div>
      </div>
    )
  }
}

export default RegistrationFields;