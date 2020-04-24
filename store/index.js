const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  async nuxtServerInit({ commit, dispatch, getters }, { req }) {
    let auth = null

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = parsed.auth
        if (auth) {
          this.$axios.setToken(auth, 'Bearer')
          const user = getters['user/getUser']
          if (!user) {
            await dispatch('user/getMe')
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
    commit('user/setAuth', auth)
  }
}
