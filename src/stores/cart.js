import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { collection, addDoc, doc, runTransaction } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

import { useCouponsStore } from './coupons'
import { getCurrentDate } from '@/helpers'

export const useCartStore = defineStore('cart', () => {
  const couponsStore = useCouponsStore()
  const db = useFirestore()

  const items = ref([])
  const subtotal = ref(0)
  const taxes = ref(0)
  const total = ref(0)

  const MAX_PRODUCTS = 5
  const TAX_RATE = 0.1

  watchEffect(() => {
    subtotal.value = items.value.reduce((total, item) => total + item.price * item.quantity, 0)
    taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2))
    total.value = Number((subtotal.value + taxes.value - couponsStore.discount).toFixed(2))
  })

  const addItem = (item) => {
    const index = isItemInCart(item.id)

    if (index >= 0) {
      if (isProductAvailable(item, index)) {
        alert(`You can only add ${MAX_PRODUCTS} items of the same product`)
        return
      }
      items.value[index].quantity++
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id })
    }
  }

  const updateQuantity = (id, quantity) => {
    items.value = items.value.map((item) => (item.id === id ? { ...item, quantity } : item))
  }

  const removeItem = (id) => {
    items.value = items.value.filter((item) => item.id !== id)
  }

  const checkout = async () => {
    try {
      await addDoc(collection(db, 'sales'), {
        items: items.value.map((item) => {
          const { availability, category, ...values } = item
          return values
        }),
        subtotal: subtotal.value,
        taxes: taxes.value,
        discount: couponsStore.discount,
        total: total.value,
        date: getCurrentDate(),
      })

      // Update product availability
      items.value.forEach(async (item) => {
        const productRef = doc(db, 'products', item.id)
        await runTransaction(db, async (transaction) => {
          const product = (await transaction.get(productRef)).data()
          const availability = product.availability - item.quantity
          transaction.update(productRef, { availability })
        })
      })

      // Reset cart and coupons
      $reset()
      couponsStore.$reset()
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const $reset = () => {
    items.value = []
    subtotal.value = 0
    taxes.value = 0
    total.value = 0
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id)

  const isProductAvailable = (item, index) => {
    return (
      items.value[index].quantity >= item.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    )
  }

  const isEmpty = computed(() => items.value.length === 0)

  const checkProductAvailability = computed(() => {
    return (product) => (product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS)
  })

  return {
    addItem,
    removeItem,
    checkout,
    checkProductAvailability,
    updateQuantity,
    isEmpty,
    items,
    subtotal,
    taxes,
    total,
  }
})
