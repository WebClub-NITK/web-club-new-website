import axios from 'axios';
import urlApi from './urlApi'
import spreadSheetApi from './spreadSheetApi'
import { membersWorkSheetId } from '../environment'
import '../styles/mynoty.css'
import Noty from 'noty'
import mynoty from './../components/mynoty'

class authApi {
    async login(data) {
        var login_status = false;
        await axios.post(urlApi.backendDomain() + '/googlelogin',
            {
                token: data.token
            })
            .then(async(res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user_email',res.data)
                    login_status = true;
                    mynoty.show("Logged In Successfully",1);
                }
            })
            .catch((error) => {
                localStorage.removeItem('token');
                localStorage.removeItem('user_email')
                if ( error.response!==undefined && error.response.status === 401) {
                    mynoty.show("Invalid Login Credentials",2);
                }else if (error.response!==undefined && error.response.status === 403) {
                    mynoty.show("You Are Not Unauthorized To Write Blogs",2);
                } else {
                    mynoty.show("Oops Something Went Wrong",2);
                }
            })
        return login_status;
    }
    async validateToken(){ //return true false only
        let login=false;
        let token = await localStorage.getItem('token');
        if(token===null){
            return false;
        }
        await axios.post(urlApi.backendDomain()+'/googlelogin',{token:token})
        .then((res)=>{
            if(res.status==200){
                login=true
                localStorage.setItem('user_email',res.data)
            }
        })
        .catch(()=>{
            // console.log("User not logedIn");
        })
        return login;
    }
}
var instance = new authApi()
export default instance;