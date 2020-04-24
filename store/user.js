import qs from 'qs'
import UserRoleType from '~/helpers/UserRoleType'

const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  user: null,
  auth: null,
  usersWithoutRole: []
})

export const mutations = {
  setAuth(state, token) {
    state.auth = token
  },
  setUser(state, data) {
    state.user = data
  },
  setUsersWithoutRole(state, data) {
    state.usersWithoutRole = data
  }
}

export const getters = {
  /**
   * get user token
   * @param state
   * @returns {*|null|string|boolean}
   */
  getToken: (state) => {
    return state.auth
  },
  /**
   * get user
   * @param state
   * @returns {Object}
   */
  getUser: (state) => {
    return state.user
  },
  /**
   * user is authenticated
   * @param state
   * @returns {boolean}
   */
  isAuthenticated: (state) => {
    return state.user !== null && state.auth !== null
  },
  /**
   * users without role
   * @param state
   * @returns {getters.usersWithoutRole|(function(*))|*|Array}
   */
  usersWithoutRole: (state) => {
    return state.usersWithoutRole
  },
  /**
   * check has permission
   * @param state
   * @returns {getters.hasPermission|(function(*))|*|Boolean}
   */
  hasPermission: (state) => {
    if (state.user === null || state.user.userRoleTypes === null) {
      return (x) => false
    }
    return (x) =>
      state.user.userRoleTypes.includes(UserRoleType.getByName(x).id)
  }
}

export const actions = {
  /**
   * login/get token from api
   * @param commit
   * @param state
   * @param dispatch
   * @param data
   * @returns {Promise<any>}
   */
  async login({ commit, state, dispatch }, data) {
    Cookie.set('')
    commit('setAuth', null)
    const response = await this.$axios.$post(
      '/auth/token',
      qs.stringify(data),
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
    )
    commit('setAuth', response.access_token)
    Cookie.set('auth', response.access_token)
    this.$axios.setToken(response.access_token, 'Bearer')
    await dispatch('getMe')
    return response
  },

  /**
   * get current user info
   * @param commit
   * @returns {Promise<any>}
   */
  async getMe({ commit }) {
    const response = await this.$axios.$get('/user/me')
    commit('setUser', response)
    return response
  },

  /**
   * logout from client
   * @param commit
   */
  logOut({ commit }) {
    commit('setAuth', null)
    commit('setUser', null)
    Cookie.remove('auth')
    this.$router.push('/')
    this.$axios.setToken(false)
  },

  /**
   * new user registration
   *
   * @param commit
   * @param {string} name
   * @param {string} email
   * @param {string} password hash
   * @returns {Promise<any>}
   */
  async register({ commit }, { name, email, password }) {
    try {
      const data = {
        name,
        email,
        password
      }
      return await this.$axios.$post('/user', data)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      throw e
    }
  },

  /**
   * get users without role
   *
   * @param state
   * @param commit
   * @returns {Promise<void>}
   */
  async fetchUsersWithoutRole({ state, commit }) {
    try {
      const users = await this.$axios.$get(`/user/available`)
      commit('setUsersWithoutRole', users)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    }
  }
}
