import { Store } from './Store'
import dayjs from "dayjs";

export const getAge = (dateString) => {
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export const activeRoles = () => {
  const state = Store.getState()
  console.log(state)
  return state.userReducer.activeRoles
}

export const capitalize = (word) => {
    return word.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

export const getInitials = (name) => {
    if (name === '' || name === null) {
        return 'N/A'
    }
    // eslint-disable-next-line prefer-regex-literals
    const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

    const initials = [...name.matchAll(rgx)] || []
    return ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase()
}

export const completeExport = (data, filename = 'report') => {
    const extension = data.type.split('/')[1] === 'pdf' ? 'pdf' : 'xlsx';
    if (extension === 'pdf'){
        const blobURL = URL.createObjectURL(new Blob([data], {type: 'application/pdf'}));
        const iframe =  document.createElement('iframe');
        document.body.appendChild(iframe);

        iframe.style.display = 'none';
        iframe.src = blobURL;
        iframe.onload = function() {
            setTimeout(function() {
                iframe.focus();
                iframe.contentWindow.print();
            }, 1);
        };
    }else{
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(new Blob([data]))
        link.setAttribute('download', `${filename + '.' + extension}`)
        document.body.appendChild(link)
        link.click()
    }
}

export const formatDate = (date) => {
    return dayjs(date).format('MMM Do YY')
}
