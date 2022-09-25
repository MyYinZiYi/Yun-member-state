
const TOKEN_KEY = "token"
const USER_INFO_KEY = "userInfo"


export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const setUserInfo = (userInfo) => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

export const getUserInfo = () => {
    if(localStorage.getItem(USER_INFO_KEY)==="undefined"){
        return "{}"
    }
    return JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}")
}

export const removeTokenAndUserInfo = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_INFO_KEY)
} 