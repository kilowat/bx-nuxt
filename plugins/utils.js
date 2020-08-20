export default (context, inject) => {
  const api = (uri) => {
    if (uri[0] !== '/') {
      uri = '/' + uri;
    }
    return 'http://192.168.1.48/api'+ uri;
  };

  inject('api', api)

  const makeParamRequest = (queryParams, fnc) => {
    let query = Object.assign({}, context.route.query);
    for (let i in queryParams) {
      query[i] = queryParams[i];
    }
    context.app.router.push({
        path: context.route.path,
        query: query,
    }, async()=>{
      fnc(context.route.fullPath );
    });
  }

  inject('makeParamRequest', makeParamRequest);
}
