import { NavLink } from 'react-router-dom'
import { SideBarData } from './SideBarData'
import './SideBarStyle.css'
import './ProfileInfo/ProfileInfo.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { userA } from "/src/UserInfoData"
import Parse from 'parse'

export default function SideBarNav() {

    async function logOutUser() {
        Parse.User.logOut().then(() => {
            const currentUser = Parse.User.current();
        });
        window.location.reload();
    }
    
    return (
        <aside className='sidebar'>
            <div className='sidebar-logo'>
                <NavLink to='/'>
                    <h1 className='logo'> købenx </h1>
                </NavLink>
            </div>

            <ul className='sidebar-title-list'>
                {SideBarData.map((item, index) => {
                    
                    const IconComponent = item.icon;

                    return (
                        <li key={index} className='sidebar-links'>
                            <NavLink to={item.path}>
                                <IconComponent className='sidebar-icons' />
                                <span className='sidebar-item-text'> {item.title} </span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>

            <div className='sidebar-profile'>
                <NavLink to='/profile'>
                    <ProfileInfo userInfo={userA}/>
                </NavLink>
            </div>

            <div>
                <button className='logout' onClick={logOutUser}>Log out</button>
            </div>
        </aside>
    )
}