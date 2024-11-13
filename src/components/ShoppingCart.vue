<script setup>
import { useCartStore } from '@/stores/cart'
import { useCouponsStore } from '@/stores/coupons'
import ShoppingCartItem from './ShoppingCartItem.vue'
import Ammount from './Ammount.vue'
import { formatCurrency } from '@/helpers'
import CouponForm from './CouponForm.vue'

const cartStore = useCartStore()
const couponsStore = useCouponsStore()
</script>

<template>
  <div>
    <p v-if="cartStore.isEmpty" class="text-xl text-center text-gray-900">Your cart is empty</p>
    <div v-else>
      <p class="text-4xl font-bold text-gray-900">Sales Summary</p>

      <ul role="list" class="mt-6 divide-y divide-gray-200">
        <ShoppingCartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
      </ul>

      <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
        <Ammount>
          <template #label>Subtotal:</template>
          {{ formatCurrency(cartStore.subtotal) }}
        </Ammount>

        <Ammount>
          <template #label>Taxes:</template>
          {{ formatCurrency(cartStore.taxes) }}
        </Ammount>

        <Ammount v-if="couponsStore.couponApplied">
          <template #label>Discount:</template>
          {{ formatCurrency(couponsStore.discount) }}
        </Ammount>

        <Ammount>
          <template #label>Total:</template>
          {{ formatCurrency(cartStore.total) }}
        </Ammount>
      </dl>

      <CouponForm />

      <div class="mt-6">
        <button
          class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 font-bold uppercase"
          @click="cartStore.checkout"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>
