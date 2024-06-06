import { z } from 'zod';
import { PaymentMethod } from '../../utils/interfaces/enum';


export const orderInformationSchema = z.object({
  fullName: z.string().trim().min(1, { message: 'Full name is required' }),
  email: z.string().trim().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  address: z.string().trim().min(1, { message: 'Address is required' }),
  phone: z.string().trim().min(1, { message: 'Phone is required' }),
  paymentMethod: z.enum([PaymentMethod.Cod, PaymentMethod.Paypal], {
    errorMap: () => ({ message: 'Invalid payment method' }),
  }),
})
