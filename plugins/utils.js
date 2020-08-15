export default (context, inject) => {
  const getUrlWithQueryParam = (params) => {
    let url = location.href;
    let sUrl = url.split("?");
    let curParamString = "";
    let arrParams = [];

    if (sUrl.length > 1) {
      curParamString = sUrl[1];
    }
    console.log(curParamString);
    if (curParamString.length > 0){
      let tmpS = curParamString.split("&");
      if (tmpS.length > 0 ){
        for (let i in tmpS) {
          let key = tmpS[i].split('=')[0];
          let value = tmpS[i].split('=')[1];
          arrParams.push({ key, value});
        }
      } else {
        let key = curParamString.split('=')[0];
        let value = curParamString.split('=')[1];
        arrParams.push({ key, value});
      }
    }
    
    console.log(arrParams);

    return "";
  }
  inject('getUrlWithQueryParam', getUrlWithQueryParam)

}
