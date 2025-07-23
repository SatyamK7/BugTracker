import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function BugForm() {
  const { id: projectId } = useParams();
  const [developers, setDevelopers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    image: null,
    reporterId: "",
    assignedToId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users and filter developers
    axios.get("http://localhost:8080/api/users")
      .then(res => {
        const devs = res.data.filter(u => u.role === "DEVELOPER");
        setDevelopers(devs);
      })
      .catch(() => setDevelopers([]));
  }, []);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "image") {
      setForm(f => ({ ...f, image: files[0] }));
    } else {
      setForm(f => ({ ...f, [id]: value }));
    }
  };

  const addBug = async (e) => {
    e.preventDefault();

    // Only extract the file name if an image is selected
    let screenshotPath = "";
    if (form.image) {
      screenshotPath = form.image.name;
    }

    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      screenshotPath: screenshotPath,
      reporterId: form.reporterId,
      assignedToId: form.assignedToId,
      projectId: projectId,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/bugs", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const bugId = response.data.id;

      // Assign the bug to the developer if needed
      if (form.assignedToId && bugId) {
        await axios.post(`http://localhost:8080/api/assignments`, {
          bugId: bugId,
          userId: form.assignedToId,
        });
      }

      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error("Error adding or assigning bug:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-200">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-10">
        {/* Left side: Form fields */}
        <form onSubmit={addBug} className="flex-1 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center tracking-tight">Add New Bug</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Bug title"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Bug description"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="status">Status</label>
                <select
                  id="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select status</option>
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="image">Screenshot (filename only)</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {form.image && (
                  <div className="text-xs text-gray-500 mt-1">Selected: {form.image.name}</div>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="reporterId">Reporter ID</label>
                <input
                  type="number"
                  id="reporterId"
                  value={form.reporterId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Reporter user ID"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="assignedToId">Assigned To</label>
                <select
                  id="assignedToId"
                  value={form.assignedToId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Developer</option>
                  {developers.map(dev => (
                    <option key={dev.id} value={dev.id}>{dev.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 flex items-end">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 mb-20 rounded-lg hover:bg-blue-700 transition"
                >
                  Submit Bug
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BugForm;