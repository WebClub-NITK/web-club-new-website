import axios from 'axios';
import jssoup from 'jssoup';
import Noty from 'noty';
import "../../node_modules/noty/lib/themes/bootstrap-v4.css";
import "../../node_modules/noty/lib/noty.css";
import urlApi from './urlApi'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";// these two lines are of no use but me be used when we try to send csrf_token with post requset
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";//csrf_token
class BlogApi {
  async postBlog(url, data,blog_id) {
    let soup = new jssoup(data)
    let heading = soup.find('h1')
    if (heading == undefined) {
      heading = soup.find('h2')
      if (heading == undefined) {
        new Noty({
          text: "System could not auto-detect heading please enclose heading in h1 or h2 tag",
          layout: "topRight",
          theme: "bootstrap-v4",
          type: 'error'
        }).show()
        return;
      }
    }
    let sample_text = soup.find('p')
    if (sample_text == undefined) {
      new Noty({
        text: "System could not auto-detect sample text first paragraph will be taken as sample text",
        layout: "topRight",
        theme: "bootstrap-v4",
        type: 'error'
      }).show()
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
    if (tag_list.length == 0) {
      new Noty({
        text: "Please include some topic tag i.e #programming #ml",
        layout: "topRight",
        theme: "bootstrap-v4",
        type: 'error'
      }).show()
      return;
    }
    let data_to_send = {
      content: data,
      heading: heading,
      sample_text: sample_text,
      user_name: 'Bharat singh',
      user_email: 'bharatsinghnitk@gmail.com',
      tag_list: tag_list,
      blogId:blog_id
    }
    axios.post(url, data_to_send)
      .then(response => {
        new Noty({
          text: "Blog Published Successfully...",
          layout: "topRight",
          theme: "bootstrap-v4",
          type: 'success'
        }).show()
        window.location.href= urlApi.webDomain()+'/new#/blogs'
      })
      .catch(error => {
        console.log(error);
      })
  }
  // async searchBlogWithTag(inputValue) {
  //   inputValue = inputValue.toLowerCase();
  //   let res = await fetch('http://127.0.0.1:8000/searchBlogWithTag?tagName=' + inputValue)
  //   res = await res.json()
  //   return res.searchedBlogs;
  // }
  async loadBlogWithId(blogid) {
    let res = await fetch(urlApi.backendDomain()+'/getblogs/' + blogid)
    res = await res.json()
    return res
  }
  async loadBlogs() {
    let res = await fetch(urlApi.backendDomain()+'/getblogs');
    res = await res.json()
    return res;
  }
}

var instance = new BlogApi();
export default instance;
