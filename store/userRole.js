export const state = () => ({
  userRoles: [],
  total: null,
  userRole: {}
})

export const getters = {
  /**
   * user roles
   * @param state
   * @returns {getters.userRoles|(function(*))|*|null}
   */
  userRoles: (state) => {
    return state.userRoles
  },
  /**
   * user roles count
   * @param state
   * @returns {getters.userRolesTotal|null|number}
   */
  userRolesTotal: (state) => state.total,
  /**
   * user role
   * @param state
   * @returns {getters.userRole|(function(*))|*|null}
   */
  userRole: (state) => {
    return state.userRole
  }
}

export const mutations = {
  setUserRoles(state, { items, count }) {
    state.userRoles = items
    state.total = count
  },
  setUserRole(state, data) {
    state.userRole = data
  }
}

export const actions = {
  /**
   * get user roles
   * @param state
   * @param commit
   * @param skip
   * @returns {Promise<any>}
   */
  async fetchUserRoles({ state, commit }, skip = 0) {
    try {
      const response = await this.$axios.$get('/userRole', skip)
      commit('setUserRoles', response)
      return response
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      throw e
    }
  },

  /**
   * create new user role
   * @param commit
   * @param data
   */
  async addUserRole({ commit }, data) {
    try {
      await this.$axios.$post(`/userRole`, data)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    }
  },

  /**
   * get user role details by id
   * @param commit
   * @param {int} id
   * @returns {Promise<any>}
   */
  async fetchUserRole({ commit }, id) {
    try {
      const userRole = await this.$axios.$get(`/userRole/${id}`)
      commit('setUserRole', userRole)
      return userRole
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      throw e
    }
  },

  /**
   * update user role
   * @param commit
   * @param data
   */
  async updateUserRole({ commit }, data) {
    try {
      await this.$axios.$put(`/userRole/${data.id}`, data)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    }
  }
}
