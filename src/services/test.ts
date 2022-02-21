import request from '../http/index'

const login = async (data: any) => {
    const result = await request({
        method: 'post',
        url: '/login',
        data: { order_id: "476715970279375872", type: '1' },
    })
    return result;
}


export {
    login,
}

