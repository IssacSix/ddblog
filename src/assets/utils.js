import axios from 'axios'
import qs from 'qs'

export default {
    
    get(url, params, cb, err) {
        axios({
            method: 'get',
            url: 'http://10.4.110.11:3000/' + url,
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
            url: 'http://10.4.110.11:3000/' + url,
            data: params
        }).then((res) => {
            cb(res.data.msg)
        }).catch((res) => {
            err(res)
        })
    }
}