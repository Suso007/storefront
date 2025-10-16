// Seller Authentication utility functions

export interface Seller {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: string;
  address?: string;
  avatar?: string;
}

export const isSellerAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  const isLoggedIn = localStorage.getItem("isSellerLoggedIn");
  return isLoggedIn === "true";
};

export const getSeller = (): Seller | null => {
  if (typeof window === "undefined") return null;
  const sellerData = localStorage.getItem("seller");
  
  if (!sellerData) return null;
  
  try {
    return JSON.parse(sellerData) as Seller;
  } catch (error) {
    console.error("Error parsing seller data:", error);
    return null;
  }
};

export const setSeller = (seller: Seller): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("seller", JSON.stringify(seller));
  localStorage.setItem("isSellerLoggedIn", "true");
};

export const logoutSeller = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("seller");
  localStorage.removeItem("isSellerLoggedIn");
};

export const loginSeller = (email: string, password: string): Promise<Seller> => {
  // Simulate API call - replace with actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock successful login
      const seller: Seller = {
        businessName: "Artisan Workshop",
        ownerName: "Jane Smith",
        email: email,
        phone: "+1 234 567 8900",
        businessType: "Pottery & Ceramics",
        address: "456 Craft Lane, Art District",
      };
      
      setSeller(seller);
      resolve(seller);
    }, 1500);
  });
};

export const registerSeller = (
  businessName: string,
  ownerName: string,
  email: string,
  password: string,
  businessType: string,
  phone: string,
  address?: string
): Promise<Seller> => {
  // Simulate API call - replace with actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock successful registration
      const seller: Seller = {
        businessName: businessName,
        ownerName: ownerName,
        email: email,
        phone: phone,
        businessType: businessType,
        address: address,
      };
      
      setSeller(seller);
      resolve(seller);
    }, 1500);
  });
};
