export default function ({ $axios, store }) {
  $axios.onRequest( (config) => {
    if (store.state.jwt.token) {
      config.headers.common['Authorization'] = `Bearer ${store.state.jwt.token}`
    }
  })
}