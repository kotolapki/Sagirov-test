import React from 'react';
import './styles.css';
import RegistrationFields from '../RegistrationFields';
import AutorizationFields from '../AutorizationFields';

function Form(props) {
  function onFocusMoveInputlabel(e) {
    const targetItem = e.target;
    const label = targetItem.previousSibling;

    label.classList.add('form__label--changed');
  }

  function onFocusTelInput(e) {
    const targetItem = e.target;
    const label = targetItem.previousSibling;

    label.classList.add('form__label--changed');

    if (!targetItem.value) {
      targetItem.value = '+7 ___ ___ __ __';
      e.target.setSelectionRange(3,3);
    } else {
      let index = targetItem.value.indexOf('_');

      if (index === -1) {
        e.target.setSelectionRange(16,16);
      } else {
        e.target.setSelectionRange(index, index);
      }
    }
  }

  
  function onBlurTelInput(e) {
    const targetItem = e.target;
    const label = targetItem.previousSibling;

    if (label.classList.contains('form__label--changed') && targetItem.value === '+7 ___ ___ __ __') {
      label.classList.remove('form__label--changed');
      targetItem.removeAttribute('placeholder');
      targetItem.value = '';
    }
  }

  function onClickTelInput(e) {
    let startPos = e.target.selectionStart;
    if (startPos === 0 || startPos === 1 || startPos === 2) {
      e.target.setSelectionRange(3,3);
    }
  }

  function onSelectStartTelInput(e) {
    let startPos = e.target.selectionStart;
    let nextPos = startPos + 1;

    if (e.target.value[startPos] === ' ') {
      e.target.setSelectionRange(nextPos, nextPos);
    }

    if (startPos === 0) {
      e.target.setSelectionRange(3, 3);
    }

    if (document.getSelection().toString().length > 1) { 
      document.getSelection().removeAllRanges();
      e.target.setSelectionRange(startPos, startPos);
    }

    if (startPos === 17) {
      e.target.setRangeText('', startPos - 1, startPos, 'start');
      this.setState({tel: e.target.value});
    }
  }

  function onChangeTelInput(e) {
    let startPos = e.target.selectionStart;
    let nextPos = startPos + 1;
    
    e.target.setRangeText('', startPos, nextPos, 'start');

    if (e.target.value[startPos] === ' ') {
      e.target.setSelectionRange(nextPos, nextPos);
    }
  }

  function onBlurMoveInputLabel(e) {
    const targetItem = e.target;
    const label = targetItem.previousSibling;

    if (label.classList.contains('form__label--changed') && !targetItem.value) {
      label.classList.remove('form__label--changed');
    }
  }

  function onClickChangePasswordVisibility(e) {
    e.stopPropagation();
    const passwordInput = document.getElementById('password');

    if (passwordInput.value !== '' && passwordInput.type === 'password') {
      passwordInput.setAttribute('type', 'text');
    } else {
      passwordInput.setAttribute('type', 'password');
    }
  }

  function onClickChangeRegistrationStatus() {
    this.setState({tel: ''});
    props.changeRegistrationStatus();
  }

  function onSubmit(e) {
    e.preventDefault();
    props.onSubmit();
    e.target.reset();
  }

  return (
    <div className='form-wrapper'>
      <form className='form' method='post' onSubmit={onSubmit}>
        <fieldset className='form__fieldset'>
          <legend className='form__legend'>{props.header}</legend>
          <p className='form__clarification-text'>Введите свои данные</p>
          {props.registrationStatus? (
            <AutorizationFields
              onFocusInput={onFocusMoveInputlabel}
              onBlurInput={onBlurMoveInputLabel}
              onClickChangePasswordVisibility={onClickChangePasswordVisibility}
            />
            ) : (
            <RegistrationFields
              onFocusInput={onFocusMoveInputlabel}
              onBlurInput={onBlurMoveInputLabel}
              onSelectTelInput={onSelectStartTelInput}
              onFocusTelInput={onFocusTelInput}
              onBlurTelInput={onBlurTelInput}
              onClickTelInput={onClickTelInput}
              onChangeTelInput={onChangeTelInput}
              onClickChangePasswordVisibility={onClickChangePasswordVisibility}
            />
          )}
        </fieldset>
        <button className='form__submit-btn'>{props.submitBtnText}</button>
      </form>
      <div className='asking-block' style={{paddingLeft: props.askingBlockPaddingLeft}}>
        <p className='asking-block__text'>{props.askingText}</p>
        <button className='asking-block__button' type='button' onClick={onClickChangeRegistrationStatus}>{props.askingBtn}</button>
      </div>
    </div>
  )
}

export default Form;