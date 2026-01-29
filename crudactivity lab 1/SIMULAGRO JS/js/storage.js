/*=== USERS === */
// Save a user (create or update)
export function saveUser(user) {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === user.id);

  if (index !== -1) {
    users[index] = user; // update
  } else {
    users.push(user); // create
  }

  localStorage.setItem('users', JSON.stringify(users));
}

// Get all users
export function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Save current user in sessionStorage
export function setCurrentUser(user) {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
}

// Get current user
export function getCurrentUser() {
  return JSON.parse(sessionStorage.getItem('currentUser'));
}

// Find user by credentials
export function findUser(email, password) {
  const users = getUsers();

  return users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
}