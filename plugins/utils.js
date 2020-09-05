export default (context, inject) => {
  const api = (uri) => {
    if (uri[0] !== '/') {
      uri = '/' + uri;
    }
    return '/api'+ uri;
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

  const makeCanonical = (url) => {
    if (context.req != undefined)
      return { rel: 'canonical', href: 'http://localhost:3000/' + url }
    else {
      return {};
    }
  }

  inject('makeCanonical', makeCanonical);
}

