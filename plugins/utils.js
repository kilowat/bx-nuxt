export default (context, inject) => {
  const api = (uri) => {
    return 'http://192.168.1.48/api'+ uri;
  };

  inject('api', api)

}
