import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl?: string | null
  quantity: number
  // Info penting buat grouping & checkout
  umkmId: string
  umkmName: string
  umkmPhone: string 
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  // Selector helpers
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === newItem.id)

        if (existingItem) {
          // Kalau barang udah ada, tambah qty-nya aja
          set({
            items: currentItems.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          // Kalau belum ada, push barang baru
          set({ items: [...currentItems, { ...newItem, quantity: 1 }] })
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
            // Kalau qty 0, hapus aja
            get().removeItem(id)
            return
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'marketplace-cart-storage', // Nama key di LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)