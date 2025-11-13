import { NavLink } from 'react-router-dom'
import { SideBarData } from './SideBarData'
import './SideBarStyle.css'
import './ProfileInfo/ProfileInfo.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Parse from 'parse'
import {useEffect, useState} from 'react'
import Button from './Button'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function SideBarNav() {

   

    async function logOutUser() {
        Parse.User.logOut().then(() => {
            const currentUser = Parse.User.current();
        });
        window.location.reload();
    }


    //Adding code to get profile information
    const currentUser = Parse.User.current();
    const [user, setUser] = useState(null); ;



    useEffect(() => {
        async function getUser() {
            const UserInfo = Parse.Object.extend("UserPublic");
            const query = new Parse.Query(UserInfo);
            query.equalTo("userIdPrivate", currentUser);
            const object = await query.first();
            console.log("object:",object)
            console.log("id",object.id)
            console.log("username", object.get("username"))
            console.log("private id", object.get("userIdPrivate").id)
            console.log("full name", object.get("firstName"))
            setUser(object);

        }

        getUser()
    }, [])

    //end of added code for profile information





    
    return (
        <aside className='sidebar'>
            <div className='sidebar-logo'>
                <NavLink to='/'>
                    <h1 className='logo'> købenx </h1>
                </NavLink>
            </div>

            <ul className='sidebar-title-list'>
                {SideBarData.map((item, id) => {
                    
                    const IconComponent = item.icon;

                    return (
                        <li key={id} className='sidebar-links'>
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
                    <ProfileInfo userInfo={user}/>
                </NavLink>
            </div>

            <div>
                <Button variant='destructive' onClick={logOutUser}> <LogoutOutlinedIcon fontSize='20'/>Log out</Button>
            </div>
        </aside>
    )
}