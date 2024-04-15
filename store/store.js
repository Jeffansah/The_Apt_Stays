import { addDays } from "date-fns";
import { create } from "zustand";

export const useBookingStore = create((set) => ({
  booking: {
    destination: null,
    date: [
      {
        startDate: new Date(),
        endDate: addDays(
          new Date(new Date().setDate(new Date().getDate() + 1)),
          0
        ),
      },
    ],
    options: {
      adult: 1,
      children: 0,
      room: 1,
    },
  },
  loading: false,
  totalPrice: null,
  cartIsFilled: false,
  setCartIsFilled: (cartIsFilled) =>
    set((state) => ({ ...state, cartIsFilled })),
  setLoading: (loading) => set((state) => ({ ...state, loading })),
  setDestination: (destination) =>
    set((state) => ({ booking: { ...state.booking, destination } })),
  setDate: (date) => set((state) => ({ booking: { ...state.booking, date } })),
  setAdult: (adult) =>
    set((state) => ({
      booking: {
        ...state.booking,
        options: { ...state.booking.options, adult },
      },
    })),
  setChildren: (children) =>
    set((state) => ({
      booking: {
        ...state.booking,
        options: { ...state.booking.options, children },
      },
    })),
  setRoom: (room) =>
    set((state) => ({
      booking: {
        ...state.booking,
        options: { ...state.booking.options, room },
      },
    })),
}));

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ user })),
}));
