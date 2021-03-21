class urlApi {
    webDomain() {
        return 'https://webclub.nitk.ac.in'
    }
    backendDomain() {
        // return 'http://bharatrajput2409.pythonanywhere.com'
        return 'http://wocnitk.pythonanywhere.com'
    }
}
var instance = new urlApi();
export default instance;
