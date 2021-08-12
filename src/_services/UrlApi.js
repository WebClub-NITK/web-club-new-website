class UrlApi{
    getBackend(){
        return 'https://wocnitk.pythonanywhere.com' //do not change this.
        //return 'https://wecbackend.nitk.ac.in'
    }
}
const instance =new UrlApi();
export default instance;
