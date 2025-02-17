import { useState, useEffect } from "react";

import { UserTable } from "./components/UserTable";
import { UserFilters } from "./components/UserFilters";
import { Pagination } from "./components/Pagination";
import { UserForm } from "./components/UserForm";

import showToast from "./utils/toast";

import type { User, UserFilters as Filters } from "./types/user";

const ITEMS_PER_PAGE = 10;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    gender: "",
    isActive: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User>();

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.users);
      setUsers(data.users);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        showToast("User deleted successfully", "success");
        setUsers((prev) => prev?.filter((user) => user._id !== userId));
      } else {
        showToast("Failed to delete user", "error");
      }
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleSubmit = async (data: User) => {
    const payload = {
      name: data.name,
      email: data.email,
      age: data.age,
      gender: data.gender,
      hobbies: data.hobbies,
      bio: data.bio,
      isActive: data.isActive,
    };

    if (editingUser && editingUser._id) {
      // Update existing user
      const response = await fetch(
        `http://localhost:3000/users/${editingUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        setUsers((prev) =>
          prev?.map((user) => (user._id === editingUser._id ? data : user))
        );
        setEditingUser(undefined);
        showToast("User updated successfully", "success");
      } else {
        showToast("Failed to update user", "error");
      }
    } else {
      // Create new user
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const newUser = await response.json();
        setUsers((prev) => [newUser, ...(prev || [])]);
        showToast("User added successfully", "success");
      } else {
        showToast("Failed to add user", "error");
      }
    }
    setIsFormOpen(false);
  };
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter and sort users
  const filteredUsers =
    (users.length > 0 &&
      users.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          user.email.toLowerCase().includes(filters.search.toLowerCase());
        const matchesGender = !filters.gender || user.gender === filters.gender;
        const matchesStatus =
          filters.isActive === null || user.isActive === filters.isActive;
        return matchesSearch && matchesGender && matchesStatus;
      })) ||
    [];

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers =
    filteredUsers &&
    filteredUsers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <button
            onClick={() => {
              setIsFormOpen(true);
              setEditingUser(undefined);
            }}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Add New User
          </button>
        </div>

        <UserFilters filters={filters} onFilterChange={setFilters} />

        {paginatedUsers.length === 0 ? (
          <p className="mt-6 text-lg text-gray-900">No users found</p>
        ) : (
          <>
            <UserTable
              users={paginatedUsers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
        <UserForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingUser(undefined);
          }}
          onSubmit={handleSubmit}
          initialData={editingUser}
        />
      </div>
    </div>
  );
}

export default App;
