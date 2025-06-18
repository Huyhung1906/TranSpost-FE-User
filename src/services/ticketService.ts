import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL as string

export interface ReleaseTicketResponse {
  status: number
  message: string
}
export async function releaseTickets(ticketIds: number[]): Promise<ReleaseTicketResponse> {
  if (!Array.isArray(ticketIds) || ticketIds.length === 0) {
    throw new Error('Danh sách vé không hợp lệ.')
  }
  const response = await axios.post<ReleaseTicketResponse>(`${API_BASE}/invoice/release/`, {
    ticket_ids: ticketIds
  })
  return response.data
}
