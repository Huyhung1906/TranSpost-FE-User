import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL as string

// Kiểu phản hồi chung từ API
export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

// Thông tin hành khách đi kèm mỗi vé
export interface Passenger {
  name: string
  phone: string
  email: string
  pickup_point?: string // 👈 Thêm pickup_point nếu cần
}

/**
 * Gửi yêu cầu tạo hóa đơn mới từ danh sách vé và hành khách
 * @param ticketIds Danh sách ID vé
 * @param totalAmount Tổng tiền
 * @param paymentMethod Phương thức thanh toán (vd: 'vnpay')
 * @param passengers Danh sách hành khách tương ứng từng vé
 * @returns Kết quả tạo hóa đơn
 */
export async function createInvoice(
  ticketIds: number[],
  totalAmount: number,
  paymentMethod: string,
  passengers: Passenger[]
): Promise<ApiResponse<any>> {
  const payload = {
    ticket_ids: ticketIds,
    total_amount: totalAmount,
    payment_method: paymentMethod,
    passengers
  }

  const response = await axios.post<ApiResponse<any>>(`${API_BASE}/invoice/create/`, payload)
  return response.data
}

/**
 * Gửi yêu cầu lấy URL thanh toán VNPAY cho hóa đơn
 * @param invoiceId Mã hóa đơn
 * @returns Đối tượng chứa payment_url
 */
export async function getVnpayPaymentUrl(invoiceId: number): Promise<ApiResponse<{ payment_url: string }>> {
  const response = await axios.post<ApiResponse<{ payment_url: string }>>(
    `${API_BASE}/invoice/vnpay-url/`,
    { invoice_id: invoiceId }
  )
  return response.data
}
export const getUserInvoices = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE}/invoice/list/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.data
  } catch (error) {
    console.error("Lỗi khi gọi API hóa đơn:", error)
    throw error
  }
}