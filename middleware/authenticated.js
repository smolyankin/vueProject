/**
 * redirect user to main if hasn't token
 * @param store
 * @param redirect
 * @returns {*}
 */
export default function({ store, redirect }) {
  const token = store.getters['user/getToken']
  if (!token) {
    return redirect('/login')
  }
}
