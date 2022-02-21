
const navLinkTo = (his, url = '', query = {}) => {
    let search = '';
    if (Object.keys(query)[0]) {
        search = '?';
        Object.keys(query).forEach((e, i) => {
            search += `${i > 0 ? '&' : ''}${e}=${query[e]}`
        })
    }
    console.log(`/${url}${search}`);
    his.push({ pathname: `/${url}${search}` });
}
export default navLinkTo;