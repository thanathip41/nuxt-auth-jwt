class Validate {
  constructor (formElem) {
    this.form = formElem
    this.firstElemValidate = ''
    this.removeState()
  }

    validateEmail = (objElem = {}) => {
      for (const i in objElem) {
        const elem = objElem[i]
        const regex = /\S+@\S+\.\S+/
        const checkRule = regex.test(elem.value)
        if (!checkRule) {
          this.displayError(elem, 'Email must be valid !')
        } else { this.displaySucess(elem) }
      }
    }

    validateNumber = (objElem = {}) => {
      for (const i in objElem) {
        const elem = objElem[i]
        const regex = /^\d+$/
        const checkRule = regex.test(elem.value)
        if (!checkRule) {
          this.displayError(elem, 'Number only !')
        } else { this.displaySucess(elem) }
      }
    }

    validateRequired = (objElem = {}) => {
      for (const i in objElem) {
        const elem = objElem[i]
        if (elem) {
          const val = elem.value
          if (val.length === 0) {
            this.displayError(elem, 'Required !')
          } else { this.displaySucess(elem) }
        }
      }
    }

    validateFile = (objElem) => {
      for (const i in objElem) {
        const elem = objElem[i]
        if (elem) {
          if (!elem.value) {
            this.displayErrorFile(elem, 'กรุณาเลือกรูปภาพ !')
          } else { this.displaySuccessFile(elem) }
        }
      }
    }

    validateLengthMin = (objElem) => {
      for (const i in objElem) {
        const obj = objElem[i]
        const elem = obj.elem
        if (elem) {
          const min = obj.min ?? 8
          const replace = obj.replace ?? '-'
          const value = obj.elem.value.replaceAll(replace, '')
          if (value.length < min) {
            this.displayError(elem, `Must not be less than ${min} character !`)
          } else { this.displaySucess(elem) }
        }
      }
    }

    validateLengthMax = (objElem) => {
      for (const i in objElem) {
        const obj = objElem[i]
        const elem = obj.elem
        if (elem) {
          const max = obj.max ?? 15
          const replace = obj.replace ?? '-'
          const value = obj.elem.value.replaceAll(replace, '')
          if (value.length > max) {
            this.displayError(elem, `ต้องไม่มากกว่า ${max} ตัว !`)
          } else { this.displaySucess(elem) }
        }
      }
    }

    validateLength = (objElem) => {
      for (const i in objElem) {
        const obj = objElem[i]
        const elem = obj.elem
        const min = obj.min ?? 8
        const max = obj.max ?? 15
        const val = obj.elem.value

        if (val.length <= min || val.length >= max) {
          // const elemName = elem.getAttribute('id')
          // const name = elemName?.charAt(0).toUpperCase() + elemName?.slice(1)

          this.displayError(elem, `Length must be between ${min} and ${max} !`)
        } else { this.displaySucess(elem) }
      }
    }

    validateDate = (objElem) => {
      for (const i in objElem) {
        const elem = objElem[i]
        if (elem) {
          const date = elem.value
          const regex = /^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](24|25)?[0-9]{2})*$/
          if (!date || !regex.test(date)) {
            this.displayError(elem, 'ผิดรูปแบบ วัน/เดือน/ปีเกิด !')
          } else {
            this.displaySucess(elem)
          }
        }
      }
    }

    validateAge = (elem) => {
      const now = new Date()
      const yN = now.getFullYear()
      const mN = now.getMonth() + 1
      const dN = now.getDate()

      const dateString = elem.value
      const [dS, mS, yS] = dateString.split('/')
      const db = new Date(parseInt(yS) - 543, parseInt(mS) - 1, parseInt(dS))

      const y = db.getFullYear()
      const m = db.getMonth() + 1
      const d = db.getDate()
      let age = yN - y
      let month = mN < m ? (mN + 12) - m : mN - m
      month = dN < d ? month - 1 : month

      age = month < 12 ? age - 1 : age

      if (age < 18) {
        this.displayError(elem, 'อายุไม่ถึง 18 ปี')
      } else {
        this.displaySucess(elem)
      }
    }

    validateCitizenId = (elem) => {
      const citizenId = elem.value.replace(/-/g, '')
      let total = 0
      let chk = ''
      let validchk = ''
      validchk = citizenId.substr(12, 1)
      let j = 0
      let pidcut
      for (let n = 0; n < 12; n++) {
        pidcut = parseInt(citizenId.substr(j, 1))
        total = (total + ((pidcut) * (13 - n)))
        j++
      }
      chk = 11 - (total % 11)
      if (chk === 10) { chk = 0 } else if (chk === 11) { chk = 1 }
      chk = '' + chk
      if (chk === validchk) { this.displaySucess(elem) } else {
        this.displayError(elem, 'รูปแบบหมายเลขบัตรประชาชนไม่ถูกต้อง !')
      }
    }

    validateCheckbox = (objElem) => {
      for (const i in objElem) {
        const elem = objElem[i]
        const checked = elem.checked
        if (!checked) {
          this.displayErrorCheckbox(elem)
        } else { this.displaySuccessCheckbox(elem) }
      }
    }

    removeState = () => {
      this.form.classList.remove('invalid')
    }

    displayErrorFile = (elem, message) => {
      elem.classList.add('is-invalid')
      this.form.classList.add('invalid')
      if (this.firstElemValidate === '') { this.firstElemValidate = elem }
    }

    displaySuccessFile = (elem, message) => {
      elem.classList.add('is-valid')
      elem.classList.remove('is-invalid')
    }

    displayError = (elem, message) => {
      const smallElem = elem.parentElement.querySelector('small')
      if (smallElem && smallElem.innerHTML === '') { smallElem.innerHTML = message }

      elem.classList.add('is-invalid')
      elem.classList.remove('is-valid')
      this.form.classList.add('invalid')
      //
      if (this.firstElemValidate === '') { this.firstElemValidate = elem }
    }

    displayErrorCheckbox = (elem) => {
      const labelElem = elem.parentElement.querySelector('label')
      labelElem.classList.add('is-invalid')
      elem.classList.add('is-invalid')
      this.form.classList.add('invalid')
      if (this.firstElemValidate === '') { this.firstElemValidate = elem }
    }

    displaySuccessCheckbox = (elem) => {
      elem.classList.add('is-valid')
      const labelElem = elem.parentElement.querySelector('label')
      labelElem.classList.add('is-valid')
      elem.classList.remove('is-invalid')
    }

    displaySucess = (elem) => {
      elem.classList.add('is-valid')
      elem.classList.remove('is-invalid')
      const smallElem = elem.parentElement.querySelector('small')
      if (smallElem) { smallElem.innerHTML = '' }
    }

    scrollIntoError = () => {
      const elem = this.firstElemValidate
      if (elem) {
        elem.scrollIntoView(true)
        window.scrollBy(0, -500)
      }
    }

    formValidate = () => {
      return !this.form.classList.contains('invalid')
    }
}

export default Validate
