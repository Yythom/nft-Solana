
const paging = async (
    request = { params: null, http: Function.prototype },
    page,
    callback,
    method = 'POST',
) => {
    const result = await request.http({ ...request.params, page: page + 1, }, method)
    callback(result)
}

const initing = async (
    request = { params: null, http: Function.prototype },
    callback,
    method = 'POST',
) => {
    const result = await request.http({ ...request.params, page: 1, pageSize: 10, }, method)
    // console.log('result-result-result-result', result);
    callback(result)
}

export { initing }
export default paging