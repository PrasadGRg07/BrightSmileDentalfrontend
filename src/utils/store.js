const read = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const write = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const getAppointments = () => read("appointments");

export const addAppointment = (appt) => {
  const items = getAppointments();
  items.unshift({
    ...appt,
    id: Date.now(),
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  write("appointments", items);
};

export const updateAppointmentStatus = (id, status) => {
  write(
    "appointments",
    getAppointments().map((a) => (a.id === id ? { ...a, status } : a))
  );
};

export const deleteAppointment = (id) => {
  write(
    "appointments",
    getAppointments().filter((a) => a.id !== id)
  );
};

export const getMessages = () => read("messages");

export const addMessage = (msg) => {
  const items = getMessages();
  items.unshift({
    ...msg,
    id: Date.now(),
    read: false,
    createdAt: new Date().toISOString(),
  });
  write("messages", items);
};

export const markMessageRead = (id) => {
  write(
    "messages",
    getMessages().map((m) => (m.id === id ? { ...m, read: true } : m))
  );
};

export const deleteMessage = (id) => {
  write("messages", getMessages().filter((m) => m.id !== id));
};

const ADMIN_EMAIL = "admin@brightsmile.com";
const ADMIN_PASSWORD = "admin123";

export const isAdminLoggedIn = () =>
  localStorage.getItem("adminLoggedIn") === "true";

export const adminLogin = (email, password) => {
  const ok = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
  if (ok) localStorage.setItem("adminLoggedIn", "true");
  return ok;
};

export const adminLogout = () => {
  localStorage.removeItem("adminLoggedIn");
};