import bcrypt from "bcryptjs";
(async () => {
  const plainPassword = "admin123"; // 👈 your chosen password
  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log(hashed);
})();
