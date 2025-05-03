import axios from 'axios';

describe('User Login', () => {
  it('should login successfully with correct credentials', async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email: 'jimmy@gmail.com',
        password: 'admin12345789'
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('message', 'Login successful');
      expect(response.data).toHaveProperty('token');
    } catch (error) {
      console.error("Error during login test:", error);
      throw error; // Rethrow error เพื่อให้ Jest รับรู้
    }
  });

  it('should return an error for incorrect password', async () => {
    try {
      await axios.post('http://localhost:5000/users/login', {
        email: 'jimmy@gmail.com',
        password: 'wrongpassword'
      });
    } catch (error: any) {
      expect(error.response?.status).toBe(401);
      expect(error.response?.data).toHaveProperty('message', 'Invalid email or password');
    }
  });
});
