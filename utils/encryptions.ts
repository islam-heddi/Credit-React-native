import bcrypt from 'bcryptjs';

// --- HASHING A PASSWORD ---
const hashPassword = async (userPassword: string) => {
  try {
    // 10 salt rounds balancing speed and security
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    
    return hashedPassword;
  } catch (error) {
    console.error('Hashing failed:', error);
  }
};

// --- VERIFYING A PASSWORD ---
const verifyPassword = async (enteredPassword: string, storedHash: string) => {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, storedHash);
    return isMatch; // Returns true or false
  } catch (error) {
    console.error('Comparison failed:', error);
  }
};


export {
    hashPassword,
    verifyPassword
};
