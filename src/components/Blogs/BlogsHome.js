import React from "react";
import "../../styles/home.css";
import "../../styles/blog.css";
import Nav from "../Nav/Nav";
import Loader from "react-loader-spinner";
import BlogCard from './BlogCard'
import Helmet from "react-helmet";
import BlogApi from "../../_services/BlogApi";
import ReactPaginate from 'react-paginate';
class BlogHome extends React.Component {
    constructor(props) {
        super(props);
        this.searchResultContainer = React.createRef()
        this.searchForm = React.createRef()
        this.searchInput = React.createRef()
        this.activePageLink = React.createRef()
        this.state = {
            allBlogs: [],
            searchResult: [],
            loaderStatus: true,
            blogsPerPage: 10,
            currentPage: 1,
            redirectToEditor: 0
        };
        this.searchBlogs = this.searchBlogs.bind(this)
    }
    async componentDidMount() {
        let counter = 0;
        let color_arr = ['#6b0504', '#a3320b', '#2e5339', '#e55381', '#1c5d99', '#3f4045', '#9a4c95', '#26532b', '#51344d', '#58641d']; //different color for each card
        let Response = await BlogApi.loadBlogs()
        var blogsList = Response.blogs;
        var temp = blogsList.map(element => {
            let tags = element.tags
            element = element.blog
            // console.log(element);
            return <BlogCard key={element.id} color={color_arr[(counter++) % 10]} blogsid={element.id} tagList={tags} heading={element.heading} date={element.date} writer={element.user_name} sample_text={element.sample_text} />
        });
        this.setState({ allBlogs: temp, loaderStatus: false })
    }
    showSearchContainer = () => { // animation of the blog search by tag div  onclick
        this.searchResultContainer.current.style.display = "block"; //changeing style of blogs search when focus
        this.searchForm.current.style.borderRadius = '10px 10px 0 0';
    }
    hideSearchContainer = () => {
        this.searchResultContainer.current.style.display = "none";//changeing style of blogs search when focus-out
        this.searchForm.current.style.borderRadius = '18px';
    }
    async searchBlogs(event) { //sorting blogs on key press  based on tags linear iterations and swaping
        event.preventDefault();
        let inputValue = this.searchInput.current.value;
        inputValue=inputValue.toLowerCase();
        let temp = this.state.allBlogs
        // console.log(temp)
        let k = 0;
        let inputLen = inputValue.length;
        for (let i = 0; i < temp.length; i++) {
            let tag_list = temp[i].props.tagList
            let flag = 0;
            for (let j = 0; j < tag_list.length; j++) {
                if (tag_list[j].substr(0, inputLen) === inputValue) {
                    flag = 1;
                    break;
                }
            }
            if (flag === 1) {
                let swap_temp = temp[k];
                temp[k] = temp[i];
                temp[i] = swap_temp;
                k++;
            }
        }

        this.setState({ allBlogs: temp }, () => {
            // console.log(this.state.allBlogs)
        })


    }

    handlePageClick = (k) => {
        // console.log(k.selected)
        this.setState({
            currentPage: k.selected + 1
        })
    }

    render() {
        const { blogsPerPage, loaderStatus, allBlogs, currentPage } = this.state
        let loaderContent = null;
        if (loaderStatus) {
            loaderContent = <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
        } else {
            loaderContent = null;
        }
        let blogsEnd = currentPage * blogsPerPage
        let blogsStart = blogsEnd - blogsPerPage;
        let blogstoshow = allBlogs.slice(blogsStart, blogsEnd)
        let noOfPages = allBlogs.length / blogsPerPage;
        return (
            <div>
                <Helmet>
                    <title>Blogs</title>
                </Helmet>
                <div>
                    <div>
                        <Nav sticky="false" transp="false" />
                        <div className="container" >
                            <div className="row">
                                <div className="col-12 px-3 m-0">
                                    <form style={{marginTop: "80px"}} action="#" id="subject_search_form" ref={this.searchForm}>
                                        <input type="search" name="search" ref={this.searchInput} autoComplete="off" id="subject_search_input" placeholder="Search topic tag" onFocus={this.showSearchContainer} onBlur={this.hideSearchContainer} onKeyUp={this.searchBlogs} />
                                        <button type="submit" onClick={this.searchBlogs} className="pl-3"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search_icon" ><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></button>
                                        <div className="search_result_container" ref={this.searchResultContainer}>{this.state.searchResult}</div>
                                    </form>
                                </div>
                                <div className="col-12 text-center" >
                                    {loaderContent}
                                </div>
                                {blogstoshow}
                                <div className="col-12 py-4 d-flex justify-content-center ">
                                    <ReactPaginate pageCount={noOfPages}
                                        onPageChange={this.handlePageClick}
                                        breakClassName={'page-item'}
                                        pageRangeDisplayed={5}
                                        marginPagesDisplayed={5}
                                        breakLinkClassName={'page-link'}
                                        containerClassName={'pagination'}
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}
                                        previousClassName={'page-item'}
                                        previousLinkClassName={'page-link'}
                                        nextClassName={'page-item'}
                                        nextLinkClassName={'page-link'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default BlogHome;
