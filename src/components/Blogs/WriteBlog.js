import React from "react";
import "../../styles/home.css";
import "../../styles/blog.css";
import imageUrl from "../../assets/images/blog_img.png";
import googlelogo from "../../assets/images/google-logo.svg";
import Nav from "../Nav/Nav";
import Helmet from "react-helmet";
import GoogleLogin from "react-google-login";
import AuthApi from "../../_services/AuthApi";
import { Redirect } from "react-router";

class WriteBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToEditor: 0,
        };
    }

    responseGoogle = async (response) => {
        var data = {
            token: response.tokenId,
        };
        let res = await AuthApi.login(data);
        if (res === true) {
            this.props.login();
            this.setState({
                redirectToEditor: true,
            });
        } else {
            this.props.logout();
        }
    };

    render() {
        const { redirectToEditor } = this.state;

        return (
            <div>
                <Helmet>
                    <title>Write a Blog</title>
                </Helmet>
                <div>
                    {redirectToEditor && <Redirect to={"/blog/editor"} />}
                    <div>
                        <Nav sticky="false" transp="false" />
                        <div
                            className="main-image center-flex"
                            style={{ background: "white" }}
                        >
                            <div
                                className="title-container px-4"
                                style={{ width: "100%" }}
                            >
                                <h1 className="main-title-blogs">
                                    Write an
                                    <br />
                                    Inspiring
                                    <br />
                                    Blog
                                </h1>
                                <GoogleLogin
                                    clientId="450857265760-h4n07vma47ofqrna2ktclm5rvgg3f24l.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    render={(renderProps) => (
                                        <button
                                            className="my-btn d-flex flex-row"
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                        >
                                            <img
                                                style={{ width: "30px" }}
                                                alt="google logo"
                                                src={googlelogo}
                                            />
                                            <span style={{ paddingTop: "4px" }}>
                                                Write Blog
                                            </span>
                                        </button>
                                    )}
                                    cookiePolicy={"single_host_origin"}
                                />
                                {/* <button onClick={this.addAllUser}>tempbutton</button> */}
                            </div>
                            <img
                                className="bg-image"
                                width="700"
                                src={imageUrl}
                                alt="background"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default WriteBlog;
