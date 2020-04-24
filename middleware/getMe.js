/**
 * get user if has token (for get fresh user info)
 * @param store
 * @param redirect
 * @returns {*}
 */
export default function({ store, redirect }) {
  const token = store.getters['user/getToken']
  if (token) {
    store.dispatch('user/getMe') // todo it's better to implement socket/push
  }
}
