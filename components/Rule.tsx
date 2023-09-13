import React from "react";

const Rule: React.FC = () => {
    return (
        <div className="Rule">
            <details>
                <summary>ルール</summary>
                <p>画面に表示される英単語を入力してください。</p>
                <p>制限時間は30秒です。</p>
                <p>「5回間違える」「制限時間が0になる」とゲームオーバーです。</p>
                <p>正解すると時間が2秒加算されます</p>
                <p>間違えると時間が3秒減少します</p>
            </details>
        </div>
    );
};

export default Rule;