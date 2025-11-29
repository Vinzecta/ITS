const API_BASE = "http://localhost/ITS/Backend/src/Endpoint/signup";

export const registerService = {
  async registerStudent(email, password) {
    try {
      const res = await fetch(`${API_BASE}/student_register.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      
      return data
    } catch (error) {
      throw error;
    }
  },

  async registerTeacher(email, password) {
    try {
      const res = await fetch(`${API_BASE}/teacher_register.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      
      return data
    } catch (error) {
      throw error;
    }
  }
};
