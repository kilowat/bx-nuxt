export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.getters['user/getUser'].isAuthorized) {
    return redirect('/login')
  }
}
