import React, { Component } from 'react'
import { Link } from "react-router-dom";
class BlogCard extends Component {
    constructor(props) {
        super(props)
        this.htmlContent = React.createRef()
        // this.htmlHeading = React.createRef()
        this.headingFirstChar = React.createRef()
        this.state = {
            tagList:[],
            heading:''
        } 
    }
    componentDidMount = () => {
        this.htmlContent.current.innerHTML = this.props.sample_text;
        // this.htmlHeading.current.innerHTML = this.props.heading;
        let counter=0;
        let htmlTagList=this.props.tagList.map(element=>{
            return <li className="list-inline-item" key={counter++} style={{background:this.props.color}}>{element}</li>
        })
        let temp_heading=this.props.heading;
        temp_heading=temp_heading.replace(/\s+/g,' ');
        temp_heading=temp_heading.replace(/\s/g,'-');  
        this.headingFirstChar.current.innerHTML=temp_heading[0]
        this.setState({
            tagList:htmlTagList,
            heading:temp_heading
        })
    }
    render() {
        return (
            <>
                <div className="col-12 m-0">
                    <div className="blog-card my-2">
                        <div className="meta">
                            <div className="photo" style={{background:this.props.color}}><span ref={this.headingFirstChar}></span></div>
                            <ul className="details">
                                <li className="author py-3">{this.props.writer}</li>
                                <li className="date">{this.props.date}</li>
                            </ul>
                        </div>
                        <div className="description">
                            <h1 className="py-2" >{this.props.heading}</h1>
                            <p ref={this.htmlContent}> </p>
                            <ul className="tags list-inline">
                                {this.state.tagList}                                
                            </ul>
                            <p className="read-more">
                                <Link to={"/blogs/" +this.state.heading + "?id="+this.props.blogsid}>Read More</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default BlogCard
