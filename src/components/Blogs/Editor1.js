import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router";

export default () => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" }
            ],
            ["link", "image"],
            ["clean"]
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image"
    ];
    const [value, setValue] = useState("");
    const history = useHistory();

    return (
        <>
        <Nav sticky="true" transp="false" />
            <ReactQuill
                theme="snow"
                value={value}
                onChange={x}
                modules={modules}
                formats={formats}
                bounds={".app"}
                placeholder={'Type here...'}
            />
        </>
    );
};
