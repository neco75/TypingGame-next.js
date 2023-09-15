import React from "react";

const Contact: React.FC = () => {
    return(
        <div className="contact m-2">
            <details>
            <summary className=" text-xl">リンク</summary>
            <a href="https://github.com/neco75/TypingGame-next.js" target="blank">GitHub</a>
            <a href="https://qiita.com/neco75/items/9853b201073b50afe6ea" target="blank">Qiita</a>
            <a href="https://twitter.com/ocen_UoA30C2" target="blank">X (Twitter)</a>
            </details>

            <style>
                {`
                    a {
                        display: block;
                        margin: 10px;
                    }
                    a:hover {
                        color: #00f;
                    }
                `}
            </style>
        </div>
    );
};

export default Contact;