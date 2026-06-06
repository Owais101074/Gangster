const API_URL = "http://localhost:5000/api";

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const getProductById = async (id: string | undefined) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  return res.json();
};

export const createOrder = async (orderData: any) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  return res.json();
};

export const getDashboardStats = async (token: string) => {
  const res = await fetch(`${API_URL}/orders/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getOrders = async (token: string) => {
  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const updateOrderStatus = async (
  id: string,
  status: string,
  token: string
) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
};

export const createProduct = async (product: any, token: string) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  return res.json();
};

export const uploadProductImages = async (
  files: FileList,
  token: string
) => {
  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append("images", file);
  });

  const res = await fetch(
  `${API_URL}/upload/product-images`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return res.json();
};

export const userSignup = async (data: any) => {
  const res = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const userLogin = async (data: any) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const adminLogin = async (data: any) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};