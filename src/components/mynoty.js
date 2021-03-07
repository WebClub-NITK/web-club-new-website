import Noty from 'noty';
class mynoty{
    show(msg,type){
        let noty1 = new Noty({
            text: msg,
            layout: "topRight",
            theme: "bootstrap-v4",
            type: type===1?'success':'error'
          }).show()
          setTimeout(() => {
            noty1.close();
          }, 8000);
    }
}
var instance = new mynoty();
export default instance;