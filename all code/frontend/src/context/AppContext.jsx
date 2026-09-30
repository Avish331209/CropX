import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_FARMERS, 
  INITIAL_BUYERS, 
  INITIAL_COMPLAINTS, 
  INITIAL_CATEGORIES 
} from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { api, clearToken, getToken } from '../utils/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Language State ('en' | 'ta')
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('agrilink_lang') || 'en';
  });

  // Translation helper function
  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // 2. Auth & Role State
  // Role can be 'guest', 'farmer', 'buyer', 'admin'
  const [role, setRole] = useState(() => {
    return localStorage.getItem('agrilink_role') || 'guest';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agrilink_user');
    if (saved) return JSON.parse(saved);
    return {
      id: "FARM-001",
      name: "Murugan R.",
      email: "murugan@salemfarm.in",
      phone: "+91 94431 87654",
      farmName: "Green Valley Farms",
      location: "Salem",
      district: "Salem",
      state: "Tamil Nadu",
      mainCategory: "Vegetables",
      address: "45 Gandhi Road, Fairlands",
      city: "Salem",
      pincode: "636016"
    };
  });

  // 3. Products State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // 4. Orders State
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // 5. Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('agrilink_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // 6. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('agrilink_wishlist');
    return saved ? JSON.parse(saved) : ["PROD-101", "PROD-104"];
  });

  // 7. Complaints / Disputes State
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);

  // 8. Categories State
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  // 9. Farmers & Buyers Directories
  const [farmers, setFarmers] = useState(INITIAL_FARMERS);

  const [buyers, setBuyers] = useState(INITIAL_BUYERS);

  // 10. Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, type: "order", title: "New Order Received!", message: "Order #ORD-9821 for 20kg Tomatoes", date: "10 mins ago", read: false, forRole: "farmer" },
    { id: 2, type: "system", title: "Payment Received", message: "₹3,350 credited for Order #ORD-9822", date: "1 hour ago", read: false, forRole: "farmer" },
    { id: 3, type: "order", title: "Order Shipped", message: "Your order #ORD-9821 is out for delivery", date: "2 hours ago", read: false, forRole: "buyer" },
    { id: 4, type: "complaint", title: "New Buyer Complaint", message: "Complaint #CMP-701 submitted for Damaged Product", date: "3 hours ago", read: false, forRole: "admin" }
  ]);

  // Voice Assistant Modal state
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('agrilink_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('agrilink_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('agrilink_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('agrilink_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('agrilink_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Load data from the backend (MongoDB). What you may load depends on who is logged in.
  const loadData = useCallback(async () => {
    try {
      setProducts(await api('/products'));
      setCategories(await api('/categories'));
      if (role === 'guest') return;
      if (!getToken()) { logoutUser(); return; }           // role saved but no login token
      setOrders(await api('/orders'));
      setComplaints(await api('/complaints'));
      if (role === 'admin') {
        setFarmers(await api('/farmers'));
        setBuyers(await api('/buyers'));
      }
    } catch (err) {
      if (err.status === 401) logoutUser();                // token expired
      else console.error('Could not load data from server:', err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  useEffect(() => { loadData(); }, [loadData]);

  // Actions
  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  const switchRole = (newRole, userData = null) => {
    setRole(newRole);
    if (userData) {
      setUser(userData);
    } else {
      if (newRole === 'farmer') {
        setUser({
          id: "FARM-001",
          name: "Murugan R.",
          email: "murugan@salemfarm.in",
          phone: "+91 94431 87654",
          farmName: "Green Valley Farms",
          location: "Salem",
          district: "Salem",
          state: "Tamil Nadu",
          mainCategory: "Vegetables"
        });
      } else if (newRole === 'buyer') {
        setUser({
          id: "BUYER-101",
          name: "Rajesh Kumar",
          email: "rajesh.kumar@gmail.com",
          phone: "+91 98765 43210",
          city: "Salem",
          state: "Tamil Nadu",
          address: "45 Gandhi Road, Fairlands",
          pincode: "636016"
        });
      } else if (newRole === 'admin') {
        setUser({
          id: "ADM-001",
          name: "AgriLink System Administrator",
          email: "admin@agrilink.gov.in"
        });
      }
    }
  };

  function logoutUser() {
    clearToken();
    setRole('guest');
    localStorage.setItem('agrilink_role', 'guest');
  }

  // Save profile changes to the database
  const updateProfile = async (changes) => {
    const updated = await api('/me', { method: 'PATCH', body: changes });
    setUser((prev) => ({ ...prev, ...updated }));
    return updated;
  };

  // Farmer Actions  (all of these save to MongoDB through the backend)
  const pushNote = (n) =>
    setNotifications((prev) => [{ id: Date.now() + Math.random(), read: false, date: "Just now", ...n }, ...prev]);

  const addProduct = async (newProdData) => {
    const newProd = await api('/products', { method: 'POST', body: newProdData });
    setProducts((prev) => [newProd, ...prev]);
    pushNote({ type: "product", title: "New Product Listed", message: `${newProd.name} listed by ${newProd.farmerName}`, forRole: "admin" });
    return newProd;
  };

  const editProduct = async (id, updatedData) => {
    const saved = await api(`/products/${id}`, { method: 'PATCH', body: updatedData });
    setProducts((prev) => prev.map((p) => (p.id === id ? saved : p)));
  };

  const deleteProduct = async (id) => {
    try {
      await api(`/products/${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Buyer Actions
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
    }
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Sends one order per cart item. The server checks stock and calculates the prices.
  // Returns the first order id. Throws an Error (with a readable message) if something fails.
  const placeOrder = async (orderDetails) => {
    const created = [];
    for (const [index, item] of cart.entries()) {
      const order = await api('/orders', {
        method: 'POST',
        body: {
          productId: item.id,
          quantity: item.quantity,
          deliveryFee: index === 0 ? 50 : 0, // delivery fee is charged once per checkout
          deliveryAddress: orderDetails.deliveryAddress,
          city: orderDetails.city,
          pincode: orderDetails.pincode,
          mobile: orderDetails.mobile,
          paymentMethod: orderDetails.paymentMethod,
          upiApp: orderDetails.upiApp,
        },
      });
      created.push(order);
    }
    setOrders((prev) => [...created, ...prev]);
    clearCart();
    setProducts(await api('/products')); // refresh stock numbers
    pushNote({ type: "order", title: "Order Placed Successfully!", message: `Order for ${created.map((o) => o.productName).join(', ')} placed!`, forRole: "buyer" });
    pushNote({ type: "order", title: "New Incoming Order!", message: `New order received from ${user.name || 'Buyer'}`, forRole: "farmer" });
    return created[0]?.id;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const saved = await api(`/orders/${orderId}/status`, { method: 'PATCH', body: { status: newStatus } });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? saved : o)));
      if (newStatus === 'Cancelled') setProducts(await api('/products'));
    } catch (err) {
      alert(err.message);
    }
  };

  // Complaint Actions
  const submitComplaint = async (complaintData) => {
    const saved = await api('/complaints', { method: 'POST', body: complaintData });
    setComplaints((prev) => [saved, ...prev]);
    pushNote({ type: "complaint", title: "Dispute Raised", message: `Complaint #${saved.id} filed for Order #${saved.orderId}`, forRole: "admin" });
    return saved;
  };

  const resolveComplaint = async (complaintId, action) => {
    // action: 'Approved' | 'Rejected' | 'Resolved'
    try {
      const { complaint, order } = await api(`/complaints/${complaintId}/status`, { method: 'PATCH', body: { action } });
      setComplaints((prev) => prev.map((c) => (c.id === complaintId ? complaint : c)));
      if (order) setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)));
    } catch (err) {
      alert(err.message);
    }
  };

  // Admin Actions
  const setFarmerStatus = async (id, status) => {
    try {
      const saved = await api(`/farmers/${id}/status`, { method: 'PATCH', body: { status } });
      setFarmers((prev) => prev.map((f) => (f.id === id ? { ...f, ...saved } : f)));
    } catch (err) { alert(err.message); }
  };

  const setBuyerStatus = async (id, status) => {
    try {
      const saved = await api(`/buyers/${id}/status`, { method: 'PATCH', body: { status } });
      setBuyers((prev) => prev.map((b) => (b.id === id ? saved : b)));
    } catch (err) { alert(err.message); }
  };

  const addCategory = async (name) => {
    try {
      const saved = await api('/categories', { method: 'POST', body: { name } });
      setCategories((prev) => [...prev, saved]);
    } catch (err) { alert(err.message); }
  };

  const removeCategory = async (id) => {
    try {
      await api(`/categories/${id}`, { method: 'DELETE' });
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) { alert(err.message); }
  };

  // Text-To-Speech helper
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
        role,
        switchRole,
        user,
        setUser,
        logoutUser,
        updateProfile,
        setFarmerStatus,
        setBuyerStatus,
        addCategory,
        removeCategory,
        products,
        addProduct,
        editProduct,
        deleteProduct,
        orders,
        updateOrderStatus,
        placeOrder,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        wishlist,
        toggleWishlist,
        complaints,
        submitComplaint,
        resolveComplaint,
        categories,
        setCategories,
        farmers,
        setFarmers,
        buyers,
        setBuyers,
        notifications,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        speakText
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
