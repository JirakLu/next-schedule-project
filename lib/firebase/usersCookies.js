import Cookies from 'js-cookie'

export const getUserFromCookie = () => {
    const cookie = Cookies.get('auth')

    if (!cookie) {
        return
    }

    return JSON.parse(cookie)
}

export const setUserCookie = (user) => {
    Cookies.set('auth', JSON.stringify(user), {
        expires: 1 / 24,
    })

}

export const removeUserCookie = () => Cookies.remove('auth')