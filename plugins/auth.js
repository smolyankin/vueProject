export default function({ store, $axios }) {
  const token = store.getters['user/getToken']
  if (token) {
    $axios.setToken(token, 'Bearer')
    const user = store.getters['user/getUser']
    if (!user) {
      store.dispatch('user/getMe')
    }
  }
}
