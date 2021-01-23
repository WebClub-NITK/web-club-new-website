import axios from 'axios';
import urlApi from './urlApi'
import spreadSheetApi from './spreadSheetApi'
import  {membersWorkSheetId} from '../environment'

class authApi{
    async login(data){
        // let data = {
        //     username: "bharatrajput",
        //     password: "bharat@1188"
        // }
        let headers = {
            'Content-Type': 'application/json'
        }
        console.log(data.access_token)
        axios.post(urlApi.backendDomain()+'/rest-auth/google/',
        { 
            access_token:data.access_token,
         })
        .then((res)=>{
            if(res.status===200){
                console.log(res.data)
            }
        })
        .catch(async(error)=>{
            if(error.response.status===401){
                let res= await spreadSheetApi.getWorkSheetData(membersWorkSheetId);
                let member=false;
                for(let i=0;i<res.length;i++){
                    if(res[i].email==data.email){
                        member=true;
                        break;
                    }
                }
                if(member==true){

                }
            }
            if(error.response.status===403){
                console.log("access denied")
            }
            console.log(error.response.status)
            console.log("error");
        })
        
        return null;
    }
    async requestRefToken(){

    }
}
var instance = new authApi()
export default instance;