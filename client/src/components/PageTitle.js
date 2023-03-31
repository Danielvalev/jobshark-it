import React from "react";

function PageTitle({title}) {
    return (
        <div className="page-title">
            <h4>{title}</h4>
            <div className="divider"></div>
        </div>
    )
}

export default PageTitle;