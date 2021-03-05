import axios from 'axios';
import urlApi from './urlApi'
import spreadSheetApi from './spreadSheetApi'
import { membersWorkSheetId } from '../environment'
import '../styles/mynoty.css'
import Noty from 'noty'

class authApi {
    async login(data) {
        var login_status = false;
        // console.log(data.token)
        var res = await axios.post(urlApi.backendDomain() + '/googlelogin',{token: data.token});
        console.log(res)
            // .then((res) => {
            //     if (res.status === 200) {
            //         localStorage.setItem('token', data.token)
            //         login_status = true;
            //         let noty1 = new Noty({
            //             text: "System could not auto-detect heading please enclose heading in h1 or h2 tag",
            //             layout: "topRight",
            //             theme: "bootstrap-v4",
            //             type: 'error'
            //         }).show()
            //         setTimeout(() => {
            //             noty1.close();
            //         }, 8000);
            //     }
            // })
            // .catch((error) => {
            //     if (error.response.status === 401) {
            //         console.log("401")
            //         let noty1 = new Noty({
            //             text: "Invalid Login Credentials",
            //             layout: "topRight",
            //             theme: "bootstrap-v4",
            //             type: 'error'
            //         }).show()
            //         setTimeout(() => {
            //             noty1.close();
            //         }, 8000);
            //     }
            //     if (error.response.status === 403) {
            //         console.log("forbiden")
            //         let noty1 = new Noty({
            //             text: "You Are Not Unauthorized To Write Blogs",
            //             layout: "topRight",
            //             theme: "bootstrap-v4",
            //             type: 'error'
            //         }).show()
            //         setTimeout(() => {
            //             noty1.close();
            //         }, 8000);
            //     }
            //     console.log(error.response.status)
            //     console.log("error");
            // })
        return login_status;
    }
    async requestRefToken() {

    }
}
var instance = new authApi()
export default instance;