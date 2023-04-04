import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../pages/apis/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";

function DefaultLayout({children}) {
    const user = JSON.parse(localStorage.getItem('user'));

    const [collapsed, setCollapsed] = React.useState(false);

    const dispatch = useDispatch();

    const [menuToRender, setMenuToRender] = React.useState([]);

    const navigate = useNavigate();

    const userMenu = [
        {
            title: 'Dashboard',
            onClick: () => navigate('/dashboard'),
            icon: <i className="ri-home-2-line"></i>,
        },
        {
            title: "Applied jobs",
            onClick: () => navigate('/applied-jobs'),
            icon: <i className="ri-file-upload-line"></i>,
        },
        {
            title: "Posted jobs",
            onClick: () => navigate('/posted-jobs'),
            icon: <i className="ri-file-add-line"></i>,
        },
        {
            title: "Profile",
            onClick: () => navigate('/profile'),
            icon: <i className="ri-user-line"></i>,
        },
        {
            title: "Logout",
            onClick: () => {
                localStorage.removeItem("user");
                navigate("/login");
              },
            icon: <i className="ri-logout-box-line"></i>,
        },
    ]

    const adminMenu = [
        {
            title: 'Dashboard',
            onClick: () => navigate('/dashboard'),
            icon: <i className="ri-home-2-line"></i>,
        },
        {
            title: "Jobs",
            onClick: () => navigate('/admin/jobs'),
            icon: <i className="ri-pages-line"></i>,
        },
        {
            title: "Users",
            onClick: () => navigate('/admin/users'),
            icon: <i className="ri-team-fill"></i>,
        },
        {
            title: "Logout",
            onClick: () => {
                localStorage.removeItem("user");
                navigate("/login");
              },
            icon: <i className="ri-logout-box-line"></i>,
        },
    ];

    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const userId = JSON.parse(localStorage.getItem('user')).id;

            const response = await getUserProfile(userId);
            dispatch(HideLoading())
            if (response.data?.isAdmin === true) {
                setMenuToRender(adminMenu);
            } else {
                setMenuToRender(userMenu);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="layout">
            <div className="sidebar justify-content-between flex">
                <div className="menu" style={{width: collapsed ? "35px" : "150px"}}>
                    {menuToRender.map((item, index) => {
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