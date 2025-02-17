import React, { useEffect } from "react";
import { X } from "lucide-react";
import type { User } from "../types/user";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: User;
}

const HOBBY_OPTIONS = [
  "Reading",
  "Gaming",
  "Cooking",
  "Traveling",
  "Sports",
  "Music",
  "Art",
  "Photography",
];

export function UserForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: UserFormProps) {
  const [formData, setFormData] = React.useState<any>({
    name: "",
    email: "",
    age: 18,
    gender: "Male",
    hobbies: [],
    bio: "",
    isActive: true,
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {initialData ? "Edit User" : "Add New User"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                required
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: parseInt(e.target.value) })
                }
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex space-x-4">
                {["Male", "Female", "Other"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.gender === gender}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          gender: gender as "Male" | "Female" | "Other",
                        })
                      }
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2 capitalize">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hobbies
              </label>
              <div className="grid grid-cols-2 gap-2">
                {HOBBY_OPTIONS.map((hobby) => (
                  <label key={hobby} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hobbies.includes(hobby)}
                      onChange={(e) => {
                        const newHobbies = e.target.checked
                          ? [...formData.hobbies, hobby]
                          : formData.hobbies.filter((h: any) => h !== hobby);
                        setFormData({ ...formData, hobbies: newHobbies });
                      }}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="ml-2">{hobby}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={4}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2">Active</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {initialData ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
