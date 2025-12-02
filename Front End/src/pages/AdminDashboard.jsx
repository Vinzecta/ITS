import AdminMenu from "../components/AdminMenu"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminDashboard() {
    const navigate = useNavigate();
  useEffect(() => {
      const adminRender = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
  
        try {
          const response = await fetch("http://localhost/its/admin_render", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': localStorage.getItem('token') || ''
            },
          });
  
          const data = await response.json();
          if (!response.ok) {
            if (data.error) {
              navigate("/invalid-user")
              return;
            } else {
              localStorage.removeItem("token");
              navigate("/login");
              return;
            }
          }
          
        } catch (err) {
          alert(err.message)
        }
      };
  
      adminRender();
    }, []);
    return (
        <>
            <AdminMenu />
        </>
    )
}