import { setupFormFields } from '../components/FormErrors';

const dom = {}

const selectors = {
  signInContainer: '[data-account-sign-in]',
  forgotContainer: '[data-account-forgot-password]',
  goToForgotBtn: '[data-go-forgot]',
  goToSignInBtn: '[data-go-signin]'
}

const cacheDom = () => {
  dom.signInContainer = document.querySelector(selectors.signInContainer)
  dom.forgotContainer = document.querySelector(selectors.forgotContainer)
  dom.goToForgotBtn = document.querySelector(selectors.goToForgotBtn)
  dom.goToSignInBtn = document.querySelector(selectors.goToSignInBtn)
}

const resetForgotForm = () => {
  [...dom.forgotContainer.querySelectorAll('.alert')].forEach(alert => alert.remove())
  dom.forgotContainer.querySelector('#ForgotForm-email').value = ''
}

const bindEvents = () => {
  dom.goToForgotBtn && dom.goToForgotBtn.addEventListener('click', e => {
    resetForgotForm()
    goToForgot()
  })
  dom.goToSignInBtn && dom.goToSignInBtn.addEventListener('click', e => {
    window.location.hash = ''
    goToSignIn()
  })
}

const goToForgot = () => {
  dom.signInContainer && dom.signInContainer.classList.add('hidden')
  dom.forgotContainer && dom.forgotContainer.classList.remove('hidden')
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const goToSignIn = () => {
  dom.forgotContainer && dom.forgotContainer.classList.add('hidden')
  dom.signInContainer && dom.signInContainer.classList.remove('hidden')
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const init = () => {
  // Allow deep linking to recover password form
  if (window.location.hash === '#recover') {
    goToForgot()
  } else {
    goToSignIn()
  }
}


document.addEventListener('DOMContentLoaded', () => {
  cacheDom()
  bindEvents()
  init()
  setupFormFields()
})
