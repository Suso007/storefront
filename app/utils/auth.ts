// Authentication utility functions

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true";
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const userData = localStorage.getItem("user");
  
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const setUser = (user: User): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("isLoggedIn", "true");
};

export const logout = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
};

export const login = (email: string, password: string): Promise<User> => {
  // Simulate API call - replace with actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock successful login
      const user: User = {
        name: "John Doe",
        email: email,
        phone: "+1 234 567 8900",
        avatar: "JD",
      };
      
      setUser(user);
      resolve(user);
    }, 1500);
  });
};

export const register = (name: string, email: string, password: string, phone?: string): Promise<User> => {
  // Simulate API call - replace with actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock successful registration
      const avatar = name.split(" ").map((n) => n[0]).join("").toUpperCase();
      const user: User = {
        name: name,
        email: email,
        phone: phone || "",
        avatar: avatar,
      };
      
      setUser(user);
      resolve(user);
    }, 1500);
  });
};
