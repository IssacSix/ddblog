import axios from 'axios'
axios.defaults.withCredentials = true

export default {
    
    get(url, params, cb, err) {
        axios({
            method: 'get',
            url: 'http://192.168.0.101:3000/' + url,
            data: params
        }).then((res) => {
            cb(res.data.msg)
        }).catch((res) => {
            err(res)
        })
    },

    post(url, params, cb, err) {
        axios({
            method: 'post',
            url: 'http://192.168.0.101:3000/' + url,
            data: params || ''
        }).then((res) => {
            cb(res.data.msg)
        }).catch((res) => {
            err(res)
        })
    }
}