import axios from 'axios';

describe('User Registration', () => {
  it('should register a new admin user successfully', async () => {
    const response = await axios.post('http://localhost:5000/users/register', {
      first_name: 'Jimmy',
      lastname: 'Sengdavong',
      password: 'admin12345789',
      phone_number: '02059955001',
      email: 'jimmy@gmail.com',
      role: 'admin'
    });

    // แสดงผลลัพธ์ที่ต้องการตรวจสอบเท่านั้น
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('message', 'User created successfully');
    expect(response.data).toHaveProperty('token');
  });

  it('should return an error for missing fields', async () => {
    try {
      await axios.post('http://localhost:5000/users/register', {
        first_name: 'Jimmy',
        lastname: '',
        password: 'admin12345789',
        phone_number: '',
        email: 'jimmy@gmail.com',
        role: 'admin'
      });
    } catch (error: any) {
      // ตรวจสอบให้แน่ใจว่า error.response มีข้อมูลที่ต้องการ
      expect(error.response?.status).toBe(400);
      expect(error.response?.data).toHaveProperty('error', 'Missing required fields');
    }
  });
});
