import dayjs from "dayjs";

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
    if (extension === 'pdf') {
        const blobURL = URL.createObjectURL(new Blob([data], {type: 'application/pdf'}));
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);

        iframe.style.display = 'none';
        iframe.src = blobURL;
        iframe.onload = function () {
            setTimeout(function () {
                iframe.focus();
                iframe.contentWindow.print();
            }, 1);
        };
    } else {
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

export const thicknesses = [
    {
        id: '0.5mm',
        name: '0.5mm'
    },
    {
        id: '0.53mm',
        name: '0.53mm'
    },
    {
        id: '0.6mm',
        name: '0.6mm'
    },
    {
        id: '1mm',
        name: '1mm'
    },
    {
        id: '1.4mm',
        name: '1.4mm'
    },
    {
        id: '1.5m',
        name: '1.5m'
    },
    {
        id: '1.6mm',
        name: '1.6mm'
    },
    {
        id: '1.8mm',
        name: '1.8mm'
    }
]
