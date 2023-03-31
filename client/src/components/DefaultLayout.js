import React from "react";
import { useNavigate } from "react-router-dom";

function DefaultLayout({children}) {
    const user = JSON.parse(localStorage.getItem('user'));

    const [collapsed, setCollapsed] = React.useState(false);

    const navigate = useNavigate();

    const userMenu = [
        {
            title: 'Dashboard',
            onClick: () => navigate('/dashboard'),
            icon: <i className="ri-file-list-line"></i>,
        },
        {
            title: "Applied jobs",
            onClick: () => navigate('/applied-jobs'),
            icon: <i className="ri-file-list-line"></i>,
        },
        {
            title: "Posted jobs",
            onClick: () => navigate('/posted-jobs'),
            icon: <i className="ri-file-list-line"></i>,
        },
        {
            title: "Profile",
            onClick: () => navigate('/profile'),
            icon: <i className="ri-file-list-line"></i>,
        },
        {
            title: "Logout",
            onClick: () => {
                localStorage.removeItem("user");
                navigate("/login");
              },
            icon: <i className="ri-file-list-line"></i>,
        },
    ]

    return (
        <div className="layout">
            <div className="sidebar justify-content-between flex">
                <div className="menu" style={{width: collapsed ? "35px" : "150px"}}>
                    {userMenu.map((item, index) => {
                        return <div className="menu-item" onClick={item.onClick} key={index}>
                            <span>{item.icon}</span>
                            {!collapsed && <span>{item.title}</span>}

                        </div>
                    })}
                </div>
                
            </div>
            <div className="content">
                <div className="header justify-content-between d-flex">
                    <div>
                        {collapsed && <i className="ri-menu-unfold-line" onClick={() => setCollapsed(false)}></i> }
                        {!collapsed && <i className="ri-menu-fold-line" onClick={() => setCollapsed(true)}></i>}
                    </div>

                    <span className="logo">JobShark-IT</span>
                    <div className="d-flex gap-1 align-items-center">
                    <i className="ri-file-user-line"></i>
                    <span>{user?.name}</span>
                    </div>
                    
                </div>
                
                <div className="body">{children}</div>

            </div>
        </div>
    )
}

export default DefaultLayout;