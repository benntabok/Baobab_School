import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-white shadow-md flex justify-between items-center">
      <h1 className="text-crimson font-bold text-xl">Baobab School</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-crimson transition">Home</Link>
        <Link to="/dashboard" className="hover:text-crimson transition">Dashboard</Link>
        <Link to="/lab" className="hover:text-crimson transition">The Lab</Link>
      </div>
    </nav>
  );
};

export default Navbar;