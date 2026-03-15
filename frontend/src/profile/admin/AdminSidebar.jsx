import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-5">

      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:text-emerald-500">
            🏠︎ Home
        </Link>
        </li>

        <li>
          <Link to="/profile" className="hover:text-emerald-500">
            👤 Profile
        </Link>
        </li>

        <li>
          <Link to="/profile/admin-dashboard" className="hover:text-emerald-400">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/profile/add-book" className="hover:text-emerald-400">
            Add Book
          </Link>
        </li>

        <li>
          <Link to="/profile/messages" className="hover:text-emerald-400">
            Message
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default AdminSidebar;