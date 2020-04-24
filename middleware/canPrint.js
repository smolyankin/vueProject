/**
 * check can print
 * @param store
 * @param redirect
 * @returns {*}
 */
export default function({ store, redirect }) {
  const hasPermission = store.getters['user/hasPermission']
  if (!hasPermission('Print')) {
    return redirect('/')
  }
}
