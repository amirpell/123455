import React , {useState} from 'react'
import  "../layout.css"
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useSelector } from 'react-redux'
function Layout({children}) {
    
        if(!localStorage.loaded) {
            localStorage.setItem('loaded', 'yes')
            window.location.reload();
        }
    
    const navigate = useNavigate();
    const [collapsed , setCollapsed] = useState(false);
    const {user} = useSelector((state) => state.user)
    const location = useLocation();
    
 const userMenu =[
    {
        name:'Home'
        ,path:'/',
        icon:'ri-home-line'
        
    },
    {
        name:'My order'
        ,path:'/page',
        icon:'ri-file-list-line'
    }
    ,{
        name:'Profile'
        ,path:'/profile',
        icon:'ri-user-line'
    },
    
 ];
 const adminMenu =[
    {
        name:'Home'
        ,path:'/',
        icon:'ri-home-line'
    }
    ,{
        name:'users'
        ,path:'/AdminUsers',
        icon:'ri-user-line'
    },{
        name:'Add user'
        ,path:'/adduser',
        icon:'ri-user-line'
    }
    
 ];


 const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  

    return (
    <div className='main'>
      <div className='d-flex layout'>
    <div className={`sidebar ${collapsed && 'sidebar-collapsed'}`}>

        
        <div className='sidebar-header'>
            <h1>APP</h1>
        </div>
        <div className='menu'>
            {menuToBeRendered.map((menu) => {
                const isActive = location.pathname === menu.path
                return <div className={`menu-item ${isActive && 'active-menu-item'}`}>
                    <i className={menu.icon}></i>

                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}

                </div>
            })}
 <div className='menu-item' onClick={() => {
    localStorage.clear();
    navigate("/login");
 }}>
            <i className='ri-logout-circle-line'></i>

         {!collapsed && <Link to="/login">logout</Link>}

                </div>
         
        </div>
    
    </div>

    <div className='content'>
    
    <div className='header'>
   {collapsed  ?(
    < i className="ri-menu-2-fill header-action-icon"onClick={()=> setCollapsed(false)} ></i>


   ):(
    < i className="ri-close-fill header-action-icon"onClick={()=> setCollapsed(true)}></i>
   )
    

} 

<Link className='anchor' to="/pro">{user?.name}{user?.email}</Link>
     </div>
        <div className='body'>
        {children}
    </div>
    </div>
      </div>
    </div>
  )
}

export default Layout
