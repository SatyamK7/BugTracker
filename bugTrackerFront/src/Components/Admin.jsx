import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  /* ───────────────────────────────────────────────────────
     Fetch all projects
  ────────────────────────────────────────────────────────*/
  const handleProject = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/projects"
      );
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  /* ───────────────────────────────────────────────────────
     Delete a single project by id  ❗ pass id from button
  ────────────────────────────────────────────────────────*/
/* DELETE handler ─ now optimistic */
const removeProject = async (id, e) => {
  // keep <Link> from firing
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // 1️⃣  optimistic UI update
  setProjects(prev => prev.filter(p => p.id !== id));

  try {
    // 2️⃣  call backend
    await axios.delete(
      `http://localhost:8080/api/projects/deleteProject/${id}`
    );
  } catch (err) {
    console.error("Error deleting project:", err);
    // 3️⃣  rollback if server fails (simplest: refetch list)
    handleProject();
  }
};



  /* ───────────────────────────────────────────────────────
     Fetch all users
  ────────────────────────────────────────────────────────*/
  const handleUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/users");
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete('http://localhost:8080/api/users/{id}')
  }

    /* ───────────────────────────────────────────────────────
     Add a users
  ────────────────────────────────────────────────────────*/
  
  const [userPayload ,setUserPayload] = useState ({
    username:"",
    email:'',
    password:''
  })

  const addUser = async () => {
    try {
      await axios.post('http://localhost:8080/api/users', userPayload);
      setUserPayload({ username: '', email: '', password: '' }); // Clear form
      handleUsers(); // Refresh users list
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  
    /* ───────────────────────────────────────────────────────
     Add a project
  ────────────────────────────────────────────────────────*/
  const [projectPayload,setProjectPayload] = useState({
    name:'',
    description: ''

  })
const addProject = async () => {
  await axios.post('http://localhost:8080/api/projects', projectPayload);
  setProjectPayload({ description: '', name: '' });
  handleProject();
  // setProjects(); // Removed to prevent projects from being set to undefined
}

  /* ───────────────────────────────────────────────────────
     JSX
  ────────────────────────────────────────────────────────*/
  return (
    <div className="bg-slate-800 min-h-screen p-8 text-white">
      <h1 className="text-2xl mb-8">Admin Dashboard</h1>

      {/* action buttons */}
      <div className="flex flex-row gap-4 mb-8">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleProject}
        >
          Load Projects
        </button>

        
      </div>

      {/* ─── Projects table ─────────────────────────────── */}
      {projects.length > 0 && (
        <div className="overflow-x-auto mb-12">
          <table className="min-w-full bg-white text-gray-800 rounded-md overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-t border-gray-200 hover:bg-gray-100"
                >
                  {/* full‑row link to detail page */}
                  <td className="px-6 py-4">
                    <Link to={`/projects/${project.id}`}>{project.id}</Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/projects/${project.id}`}>{project.description}</Link>
                  </td>

                  {/* delete button */}
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={(e) => removeProject(project.id, e)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Project</h2>

  

  {/* Name Field */}
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
    <input
      type="text"
      placeholder="Enter project name"
      value={projectPayload.name}
      onChange={e =>
        setProjectPayload(prev => ({ ...prev, name: e.target.value }))
      }
      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Description Field */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
    <input
      type="text"
      placeholder="Enter description"
      value={projectPayload.description}
      onChange={e =>
        setProjectPayload(prev => ({ ...prev, description: e.target.value }))
      }
      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Add Button */}
  <div className="text-center">
    <button
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      onClick={addProject} // Make sure this function exists
    >
      Add
    </button>
  </div>
</div>

        </div>
      )}

      <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleUsers}
        >
          Load Users
        </button>

      {/* ─── Users table ───────────────────────────────── */}
      {users.length > 0 && (
        <>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white text-gray-800 rounded-md overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Edit</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-t border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">{u.id}</td>
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.role}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        // onClick={editUsers}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add User form only visible when users are loaded, below the table */}
          <div className="mt-8 max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-gray-800">
            <h2 className="text-xl font-semibold mb-6 text-center">Add User</h2>
            <form onSubmit={e => { e.preventDefault(); addUser(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
                <input
                  
                  type="text"
                  placeholder="Enter username"
                  value={userPayload.username}
                  onChange={e => setUserPayload(prev => ({ ...prev,username:e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input
                  
                  type="email"
                  placeholder="user@example.com"
                  value={userPayload.email}
                  onChange={e => setUserPayload(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={userPayload.password}
                  onChange={e => setUserPayload(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
