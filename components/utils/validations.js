export const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const validatePhone = phone => {
  const re = /^((\+7|7|8)+([0-9]){10})$/
  return phone.length > 0 ? re.test(String(phone.replace(/\s/g, ''))) : true
}

export const validateTime = time => {
  const re = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
  return re.test(String(time))
}

export const validateDate = date => {
  const re = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/
  return re.test(String(date))
}

export const validateSpecCharacters = text => {
  if(text) {
    const re = /^[а-яА-ЯёЁa-zA-Z0-9 ]+$/g
    return text.length > 0 ? re.test(String(text)) : true
  }
  return false
}

export const validateDescription = text => {
  if(text) {
    const re = /^[a-zA-Zа-яА-Я0-9-_\.\,\!\?\№()\s]*$/
    return text.length > 0 ? re.test(String(text)) : true
  }
  return false
}

export const validateExtension = name => {
  const re = /\.(xls|doc|docx|xlsx|)$/i
  return re.test(String(name))
}

export const validateFile = obj => {
  const re = /\.(xls|doc|docx|xlsx|)$/i
  return re.test(String(obj.name)) && obj.size <= 5242880
}

export const validatePassword = pass => {
  return pass.length >= 6
}
