import axios from "axios";

export default class ApiResolverUtil {
    endpoint = ""

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    async request(url: string, method: string, data: any, jwt?: string) {
        url = `${apiConf.endpoint}/${this.endpoint}/${url}`
        return await (new Promise((resolve, reject) => axios({
            url,
            method,
            data,
            headers: {
                "Authorization": `Bearer ${jwt}`,
            }
        }).then(async (response: any) => {
            resolve(response)
        }).catch(async (error: any) => {
            reject(error)
        })))
    }
}