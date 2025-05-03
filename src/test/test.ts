import bcryptjs from "bcryptjs";

async function testHashing() {
  const plainPassword = "admin1234";
  
  // สร้างการแฮช
  const hashedPassword = await bcryptjs.hash(plainPassword, 10);
  console.log("Hashed password:", hashedPassword);
  
  // เปรียบเทียบรหัสผ่านกับการแฮชที่สร้างขึ้นใหม่
  const isMatch = await bcryptjs.compare(plainPassword, hashedPassword);
  console.log("Password match test (should be true):", isMatch);
}

testHashing();
