import { useState } from "react";

export default function CreateUserModal() {
    const [showModal, setShowModal] = useState(true);
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        role: "Student"
      });
    const handleCreateUser = async () => {
        try {
            const response = await fetch(
            "http://localhost/ITS/Backend/src/Endpoint/admin_access/create_user.php",
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            }
            );

            const data = await response.json();

            if (!response.ok) {
            alert(data.message || data.error || "Failed to create user");
            return;
            }

            alert("User created successfully!");

            setShowModal(false);
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert("Network error!");
    }
    };
    return(
    <>
        {
            showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center !z-50">
                <div className="bg-white !p-6 rounded-xl shadow-xl w-full max-w-md space-y-4 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-slate-800">Create New User</h3>

                <input
                    type="text"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border !p-2 rounded-lg"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full border !p-2 rounded-lg"
                />

                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border !p-2 rounded-lg"
                />

                <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full border !p-2 rounded-lg"
                >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                </select>

                <div className="flex justify-end gap-3">
                    <button
                    onClick={() => setShowModal(false)}
                    className="!px-4 !py-2 rounded-lg bg-slate-200"
                    >
                    Cancel
                    </button>

                    <button
                    onClick={handleCreateUser}
                    className="!px-4 !py-2 rounded-lg bg-indigo-600 text-white"
                    >
                    Create
                    </button>
                </div>
                </div>
            </div>
            )
        }
    </>
    )
}