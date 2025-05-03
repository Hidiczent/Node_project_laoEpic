import { Router } from 'express';
import { 
    createPayment, 
    getPayments, 
    getPaymentById, 
    updatePayment, 
    deletePayment 
} from '../controllers/paymentController';

const router = Router();

// Route สำหรับสร้าง payment ใหม่
router.post('/createPayment', createPayment);

// Route สำหรับดึงข้อมูล payment ทั้งหมด
router.get('/getsPayment', getPayments);

// Route สำหรับดึงข้อมูล payment โดยใช้ id
router.get('/get/:id', getPaymentById);

// Route สำหรับอัปเดต payment ตาม id
router.put('/put/:id', updatePayment);

// Route สำหรับลบ payment ตาม id
router.delete('/delete/:id', deletePayment);

export default router;
