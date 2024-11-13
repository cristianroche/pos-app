import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useCartStore } from './cart'

export const useCouponsStore = defineStore('coupon', () => {
  const cartStore = useCartStore()

  const couponInput = ref('')
  const couponValidationMessage = ref('')
  const discountPercentage = ref(0)
  const discount = ref(0)

  const VALID_COUPONS = [
    {
      code: '10OFF',
      discount: 0.1,
    },
    {
      code: '20OFF',
      discount: 0.2,
    },
  ]

  watch(discountPercentage, (value) => {
    discount.value = (cartStore.total * discountPercentage.value).toFixed(2)
  })

  const applyCoupon = async () => {
    if (VALID_COUPONS.some((coupon) => coupon.code === couponInput.value)) {
      couponValidationMessage.value = 'Appliyng coupon...'

      setTimeout(() => {
        discountPercentage.value = VALID_COUPONS.find(
          (coupon) => coupon.code === couponInput.value,
        ).discount
        couponValidationMessage.value = 'Coupon applied'
      }, 3000)
    } else {
      couponValidationMessage.value = 'Invalid coupon code'
    }

    setTimeout(() => {
      couponValidationMessage.value = ''
    }, 5000)
  }

  const $reset = () => {
    couponInput.value = ''
    couponValidationMessage.value = ''
    discountPercentage.value = 0
    discount.value = 0
  }

  const couponApplied = computed(() => discountPercentage.value > 0)

  return {
    couponInput,
    applyCoupon,
    couponValidationMessage,
    discount,
    couponApplied,
    $reset,
  }
})
