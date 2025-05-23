const removePassword = (user) => {
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const removePasswords = (users) => users.map(removePassword);

export { removePassword, removePasswords };
