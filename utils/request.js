import axios from '@/components/xml-packaging/xml-packaging.js'   
import { getToken } from '@/utils/auth'


var $http = new axios({
    // 默认 跟地址
    baseUrl:'http://192.168.2.157:9002',
    // 请求头  默认空
    header:'',
    //  是否开启 请求拦截
    promise:true,
    // token  默认空 
    token:getToken(),
    // 是否开启 解析 jsp 数据格式
    dataType:false, 
})

export default $http

