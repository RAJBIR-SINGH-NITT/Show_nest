import { create } from 'zustand'

interface SeatSelectionState {
  selectedSeats: string[]
  addSeat: (seatId: string) => void
  removeSeat: (seatId: string) => void
  clearSeats: () => void
}

export const useSeatSelectionStore = create<SeatSelectionState>((set) => ({
  selectedSeats: [],
  addSeat: (seatId) => set((state) => ({ selectedSeats: [...state.selectedSeats, seatId] })),
  removeSeat: (seatId) => set((state) => ({ selectedSeats: state.selectedSeats.filter((id) => id !== seatId) })),
  clearSeats: () => set({ selectedSeats: [] }),
}))
