<script setup>
import { useCouponsStore } from '@/stores/coupons'

const store = useCouponsStore()
</script>

<template>
  <p class="mt-5 py-5 font-bold border-t border-gray-200">Do you have a coupon?</p>

  <div class="flex">
    <input
      type="text"
      placeholder="add a coupon"
      class="p-2 bg-white border-gray-300 w-full disabled:opacity-50"
      v-model="store.couponInput"
      :disabled="store.couponApplied"
    />
    <button
      class="bg-green-400 p-3 font-bold disabled:opacity-50"
      @click="store.applyCoupon"
      :disabled="store.couponApplied"
    >
      Apply
    </button>
  </div>

  <p class="py-2 text-center text-sm font-extrabold">
    {{ store.couponValidationMessage }}
  </p>
</template>
