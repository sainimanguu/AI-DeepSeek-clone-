import React from 'react'
import { Hash, House, Eraser, SquarePen, Image, Scissors, Users, File } from 'lucide-react'
import { useUser, useClerk } from '@clerk/clerk-react'
import { NavLink } from 'react-router-dom'

const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Image', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: File },
    { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser()
    const { signOut, openUserProfile } = useClerk()

    return (
        <div
            className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:translate-x-full'
                } transition-all duration-300 ease-in-out`}
        >
            <div className="w-full">

                <div className="flex flex-col items-center py-4">
                    <img src={user.imageUrl} alt="User" className="w-14 h-14 rounded-full" />
                    <h1 className="mt-1 text-center font-medium text-gray-800">{user.fullName}</h1>
                </div>


                <div className="flex flex-col gap-1 px-2">
                    {navItems.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={() => setSidebar(false)}
                            className={({ isActive }) =>
                                `px-3.5 py-2.5 flex items-center gap-3 rounded-lg font-medium text-sm ${isActive
                                    ? 'bg-linear-to-r from-[#3C81F6] to-[#9234EA] text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                                    <span>{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
