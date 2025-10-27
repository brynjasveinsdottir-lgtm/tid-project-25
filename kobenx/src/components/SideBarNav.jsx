import { Link } from 'react-router-dom'
import { SideBarData } from './SideBarData'
import './SideBarStyle.css'

export default function SideBarNav() {
    
    return (
        <aside className='sidebar'>
            <div className='sidebar-logo'>
                <Link to='/'>
                    <h1 className='logo'> købenx </h1>
                </Link>
            </div>

            <ul className='sidebar-title-list'>
                {SideBarData.map((item, index) => (
                    <li key={index} className='sidebar-links'>
                        <Link to={item.path}>
                            <img src={item.icon} className='sidebar-icons' />
                            <span className='sidebar-item-text'> {item.title} </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div>
                <p className='sidebar-profile'> @username </p>
            </div>
        </aside>
    )
}