import { setupFormFields } from '../components/FormErrors';
import form from '../components/form'

const dom = {}

const selectors = {
  addressesList: '[data-addresses-list]',
  formsList: '[data-address-forms-list]',
  addAddressBtn: '[data-add-new-address]',
  editAddressBtn: '[data-edit-address]',
  deleteAddressBtn: '[data-delete-address]',
  cancelAddressBtn: '[data-cancel-address]'
}

const cacheDom = () => {
  dom.addressesList = document.querySelector(selectors.addressesList)
  dom.formsList = document.querySelector(selectors.formsList)
  dom.addAddressBtn = document.querySelectorAll(selectors.addAddressBtn)
  dom.editAddressBtn = document.querySelectorAll(selectors.editAddressBtn)
  dom.deleteAddressBtn = document.querySelectorAll(selectors.deleteAddressBtn)
  dom.cancelAddressBtn = document.querySelectorAll(selectors.cancelAddressBtn)
}

const bindEvents = () => {
  [...dom.addAddressBtn].forEach(btn => {
    btn.addEventListener('click', e => {
      let form = document.querySelector(`#account-address-form-new`)
      dom.addressesList.classList.add('hidden')
      if (form) {
        clearForm(form)
        form.classList.remove('hidden')
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    })
  });
  [...dom.editAddressBtn].forEach(btn => {
    btn.addEventListener('click', e => {
      let form = document.querySelector(`#account-address-form-${btn.dataset.addressId}`)
      dom.addressesList.classList.add('hidden')
      if (form) {
        clearForm(form)
        form.classList.remove('hidden')
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    })
  });
  [...dom.deleteAddressBtn].forEach(btn => {
    btn.addEventListener('click', e => deleteAddress(btn.dataset.addressId))
  });
  [...dom.cancelAddressBtn].forEach(btn => {
    btn.addEventListener('click', e => {
      let form = btn.closest('.account-address-form')
      form && form.classList.add('hidden')
      dom.addressesList.classList.remove('hidden')
      window.location.hash = ''
    })
  })
  window.addEventListener('popstate', function (event) {
    let location = event.currentTarget.location
    if (location.pathname == '/account/addresses') {
      let forms = document.querySelectorAll('.account-address-form')
      forms.forEach(form => { form.classList.add('hidden') })
      if (location.hash == '') {
        dom.addressesList.classList.remove('hidden')
      } else {
        dom.addressesList.classList.add('hidden')
        let form = document.querySelector(location.hash)
        form && form.classList.remove('hidden')
      }
    }
  })
}

const clearForm = (form) => {
  if (!form) return
  form.querySelectorAll('input:not([type=hidden])').forEach(input => {
    if (input.type == 'checkbox') {
      input.checked = (input.dataset.default == 'true' ? true : false)
    } else {
      input.value = input.dataset.default
    }
  })
  form.querySelectorAll('select').forEach(select => {
    select.value = select.dataset.default
    // select.dispatchEvent(new Event('change'))
  })
}

const deleteAddress = (addressId) => {
  if (!addressId) return
  const form = document.createElement('form')
  form.setAttribute('method', 'post')
  form.setAttribute('action', '/account/addresses/' + addressId)
  const hiddenField = document.createElement('input')
  hiddenField.setAttribute('type', 'hidden')
  hiddenField.setAttribute('name', '_method')
  hiddenField.setAttribute('value', 'delete')
  form.appendChild(hiddenField)
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

document.addEventListener('DOMContentLoaded', () => {
  cacheDom()
  bindEvents()
  form.init()
  setupFormFields()
})
