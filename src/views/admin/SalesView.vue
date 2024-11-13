<script setup>
import { ref } from 'vue'
import VueTailwindDatePicker from 'vue-tailwind-datepicker'
import { useSalesStore } from '@/stores/sales'
import SalesDetails from '@/components/SalesDetails.vue'
import { formatCurrency } from '@/helpers'

const salesStore = useSalesStore()

const formatter = ref({
  date: 'MM/DD/YYYY',
  month: 'MMMM',
})
</script>

<template>
  <h1 class="text-4xl font-black my-10 pt-10">Sales Summary</h1>
  <div class="md:flex md:items-start gap-5">
    <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center p-5">
      <VueTailwindDatePicker v-model="salesStore.date" as-single no-input :formatter="formatter" />
    </div>

    <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
      <p v-if="salesStore.isDateSelected" class="text-center text-lg">
        Sales of the date: <span class="font-bold">{{ salesStore.date }}</span>
      </p>

      <p v-else class="text-center text-lg">Select a date</p>

      <div v-if="salesStore.salesCollection.length" class="space-y-5">
        <SalesDetails v-for="sale in salesStore.salesCollection" :key="sale.id" :sale="sale" />
        <p class="text-right text-2xl">
          Total Sales:
          <span class="font-black">{{ formatCurrency(salesStore.totalSalesOfTheDay) }}</span>
        </p>
      </div>

      <p v-else-if="salesStore.noSales" class="text-center text-lg">
        No sales for the selected date
      </p>
    </div>
  </div>
</template>
