import React, { createContext, useState, useEffect } from "react";
import { getAllUsers } from "../services/UsersServices";
import useAuthContext from "../hooks/UseAuthContext";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAdmin, token } = useAuthContext();

  // List all users
  useEffect(() => {
    if (!isAdmin) return; // Only if the user is an admin

    const controller = new AbortController();
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getAllUsers(token, controller.signal);
        setUsers(response.data.items.$values);
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Fetch canceled");
          return;
        }
        console.log(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    // Cleanup function to cancel request on component unmount
    return () => controller.abort();
  }, [isAdmin, token]);

  // Delete a user by ID
  const DeleteUserByID = (id) => {
    setUsers((prevUsers) => {
      return prevUsers.filter((user) => user.userId !== id);
    });
  };

  return (
    <UsersContext.Provider value={{ users, isLoading, error, DeleteUserByID }}>
      {children}
    </UsersContext.Provider>
  );
};
