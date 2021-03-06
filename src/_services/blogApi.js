import axios from 'axios';
import jssoup from 'jssoup';
// import Noty from 'noty';
import "../../node_modules/noty/lib/themes/bootstrap-v4.css";
import "../../node_modules/noty/lib/noty.css";
import urlApi from './urlApi'
import mynoty from '../components/mynoty'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";// these two lines are of no use but me be used when we try to send csrf_token with post requset
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";//csrf_token

class BlogApi {
  async postBlog(url, data, blog_id) {
    let soup = new jssoup(data)
    let heading = soup.find('h1')
    if (heading === undefined) {
      heading = soup.find('h2')
      if (heading === undefined) {
        mynoty.show("System could not auto-detect heading please enclose heading in h1 or h2 tag", 2)
        return;
      }
    }
    let sample_text = soup.find('p')
    if (sample_text === undefined) {
      mynoty.show("System could not auto-detect sample text first paragraph will be taken as sample text", 2)
      return;
    }
    await sample_text.extract()
    await heading.extract();
    data = soup.prettify()
    // console.log(data)
    sample_text = sample_text.text
    // console.log(sample_text)
    heading = heading.text
    // console.log(heading)
    let tag_list = []
    data = data.replace(/#[a-zA-Z_-]+/g, function (x) {
      tag_list.push(x.substr(1));
      return '';
    })
    // console.log(tag_list)
    if (tag_list.length === 0) {
      mynoty.show("Please include some topic tag i.e #Programming #ML #DSA", 2)
      return;
    }
    let token = await localStorage.getItem('token');
    let data_to_send = {
      content: data,
      heading: heading,
      sample_text: sample_text,
      tag_list: tag_list,
      blogId: blog_id,
      token: token
    }
    mynoty.show("Wait while you blog get posted", 1)
    axios.post(url, data_to_send)
      .then(response => {
        if (response.status === 200) {
          mynoty.show(response.data, 1)
          window.location.href = urlApi.webDomain() + '/new#/blogs'
        }

      })
      .catch(error => {
        if (error.response!==undefined && error.response.status === 401) {
          // console.log(error.response);
          mynoty.show(error.response.data, 2)
        } else if (error.response!==undefined && error.response.status === 403) {
          // console.log(error.response)
          mynoty.show(error.response.data, 2)
        } else {
          mynoty.show("Oops Something Went Wrong", 2)
        }
      })
      return undefined;
  }
  async loadBlogWithId(blogid) {
    let res = await fetch(urlApi.backendDomain() + '/getblogs/' + blogid)
    res = await res.json()
    return res
  }
  async loadBlogs() {
    let res = await fetch(urlApi.backendDomain() + '/getblogs');
    res = await res.json()
    return res;
  }
  async deleteBlog(id,user_email){
    axios.post(urlApi.backendDomain()+'/deleteblog',{
      blogid:id,
      user_email:user_email,
      token:await localStorage.getItem('token')
    })
    .then((res)=>{
      if(res.status===200){
        mynoty.show(res.data,1);
        window.location.href = urlApi.webDomain() + '/new#/blogs'
      }
    })
    .catch((error)=>{
      console.log(error)
      if(error.response!==undefined && (error.response.status===403 || error.response.status==401)){
        mynoty.show(error.response.data, 2)
      }else{
        mynoty.show("Oops Something Went Wrong", 2)
      }
    })
  }
}

var instance = new BlogApi();
export default instance;
