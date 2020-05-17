export const emailRules = [
    value => !!value || 'Required.',
    value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
    },
]

export const requiredRule = [value => !!value || 'Required.']

export const passwordRules = [
    value => !!value || 'Required.',
    value => (value || '').length >= 7 || 'Min 7 characters',
]