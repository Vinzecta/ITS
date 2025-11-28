import logo from "../assets/logo.png"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import course from "../assets/image/course.svg"
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';

export default function AdminMenu() {
    const {pathname} = useLocation()
    const checkUserManagement = (pathname === "/admin-dashboard") || (pathname === "/admin-dashboard/user-management")
    const checkCourseManagement = (pathname === "/admin-dashboard/course-management")

    return (
        <section className="flex flex-col gap-10 border border-[#e4e7ec] w-[15%] h-full">
            <Link to={"/admin-dashboard"} className="flex w-fit !mt-5 !pl-1">
                <img className="w-[50px]" src={logo} alt="Logo" />
                <h1 className="font-bold !my-auto">ITS Management</h1>
            </Link>

            <div className="flex flex-col gap-1">
                <p className="font-light text-xs text-[#344054] !pl-2">Menu</p>
                <div className={`flex gap-1 !py-3 ${checkUserManagement ? "bg-[#E5E7EB]" : "bg-[white]"} hover:bg-[#E5E7EB] cursor-pointer`}>
                    <AccountCircleOutlinedIcon sx={{
                        color: "#344054",
                        marginLeft: "4px",
                    }} />
                    <p className="font-bold text-sm text-[#344054] !my-auto">User Management</p>
                </div>

                <div className={`flex gap-1 !py-3 ${checkCourseManagement ? "bg-[#E5E7EB]" : "bg-[white]"} hover:bg-[#E5E7EB] cursor-pointer`}>
                    <img className="w-[20px] !ml-1" src={course} alt="Course Management" />
                    <p className="font-bold text-sm text-[#344054] !my-auto">Course Management</p>
                </div>
            </div>
        </section>
    )
}