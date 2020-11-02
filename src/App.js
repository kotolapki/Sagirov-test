import React from 'react';
import './reset.css';
import './app.css';
import Form from './components/Form';
import Popup from './components/Popup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationStatus: false,
      signInStatus: false,
      popupVisibility: false,
    }
  }

  onSubmitForm = () => {
    let changePopupVisibility = () => {
      this.setState(prevState => ({popupVisibility: !prevState.popupVisibility}));
    }

    if (!this.state.registrationStatus) {
      const form = document.querySelector('.form');

      let userInformation = {
        username: form.elements[1].value,
        nickname: form.elements[2].value,
        email: form.elements[3].value,
        tel: form.elements[4].value.replace(/\s/g, ''),
        password: form.elements[5].value
      }

      const email = userInformation.email;
      const tel = userInformation.tel;
  
      userInformation = JSON.stringify(userInformation);
  
      localStorage.setItem(`${email}`, userInformation);
      localStorage.setItem(`${tel}`, userInformation);
      
      this.setState(prevState => ({registrationStatus: !prevState.registrationStatus}));
      this.setState(prevState => ({popupVisibility: !prevState.popupVisibility}));
      setTimeout(changePopupVisibility, 1500);
    } else {
      const form = document.querySelector('.form');
      const login = form.elements[1].value;
      const password = form.elements[2].value;

      if (localStorage.getItem(`${login}`)) {
        let userData = localStorage.getItem(`${login}`);
        userData = JSON.parse(userData);

        if (userData.password === password) {
          this.setState(prevState => ({signInStatus: !prevState.signInStatus}));
          this.setState(prevState => ({popupVisibility: !prevState.popupVisibility}));
          setTimeout(changePopupVisibility, 2000);
        } else {
          alert('Неверно введенные данные');
        }

      } else {
        alert('Данные пользователя не найдены');
      }
    }
  }

  changeRegistrationStatus = () => {
    this.setState(prevState => ({registrationStatus: !prevState.registrationStatus}));
  }

  render() {
    let formHeader;
    let submitBtnText;
    let askingText;
    let askingBtn;
    let message;
    let askingBlockPaddingLeft;

    if (!this.state.registrationStatus) {
      formHeader = 'Регистрация';
      submitBtnText = 'Зарегистрироваться';
      askingText = 'Есть аккаунт?';
      askingBtn = 'Войти';
      message = '';
    } else {
      formHeader = 'Вход';
      submitBtnText = 'Войти';
      askingText = 'Нет аккаунта?';
      askingBtn = 'Зарегистрироваться';
      message = 'Вы зарегистрированы';
    }

    if (this.state.signInStatus) {
      message = 'Вы авторизованы';
    }

    if (!this.state.registrationStatus) {
      askingBlockPaddingLeft = '105px';
    } else {
      askingBlockPaddingLeft = '43px';
    }

    return (
      <div className='app-container'>
        <Form 
          header={formHeader}
          submitBtnText={submitBtnText}
          askingText={askingText}
          askingBtn={askingBtn} 
          onSubmit={this.onSubmitForm} 
          registrationStatus={this.state.registrationStatus}
          signInStatus={this.state.signInStatus}
          changeRegistrationStatus={this.changeRegistrationStatus}
          askingBlockPaddingLeft={askingBlockPaddingLeft}
        />
        {this.state.popupVisibility && <Popup message={message}/>}
      </div>
    )
  }
}

export default App;