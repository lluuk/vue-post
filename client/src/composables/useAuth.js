import Vue from 'vue';
import VueCompositionAPI, {
    reactive,
    computed,
    watch
} from '@vue/composition-api'
import axios from 'axios'

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);

// export function useAuth () {
//state
const state = reactive({
    token: localStorage.getItem("token"),
    user: null,
})

//mutation
function setUser(user) {
    state.user = user
}

function setToken(token) {
    state.token = token
}

//action
async function login(user) {
    try {
        const {
            data
        } = await axios({
            url: '/login',
            data: user,
            method: 'POST'
        })
        setAuthUser(data.user, data.token)
    } catch (e) {
        removeAuthUser()
    }
}

async function signup(user) {
    try {
        const {
            data
        } = await axios({
            url: '/me',
            data: user,
            method: 'POST'
        })
        setAuthUser(data.user, data.token)
    } catch (e) {
        removeAuthUser()
    }
}

async function logout() {
    await axios({
        url: '/logout',
        method: 'POST'
    })
    removeAuthUser()
}

async function getUser() {
    try {
        const {
            data
        } = await axios({
            url: '/me',
            method: 'GET'
        })
        setUser(data)
    } catch (e) {
        removeAuthUser()
    }
}

//getter
const isLoggedIn = computed(() => !!state.token)
const userData = computed(() => state.user)

watch(
    () => state.token,
    (value) => {
        if (value) {
            localStorage.setItem('token', value)
            setToken(value)
        } else {
            localStorage.removeItem('token')
            setToken(null)
        }
    }
)

//utils
function setAuthUser(user, token) {
    setUser(user)
    setToken(token)
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = token
}

function removeAuthUser() {
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
}

export {
    login,
    signup,
    logout,
    getUser,
    isLoggedIn,
    userData,
}
// }