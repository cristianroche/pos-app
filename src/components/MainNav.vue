<script setup>
import Link from './Link.vue'
import Logo from './Logo.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between absolutetop-0 w-full z-10"
  >
    <div>
      <Logo />
      <div class="flex gap-5 text-white">
        <h2 class="text-xl font-extrabold">Filters:</h2>

        <div
          class="flex items-center gap-2"
          v-for="category in productsStore.categories"
          :key="category.id"
        >
          <input
            type="radio"
            name="category"
            :value="category.id"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            :checked="category.id === productsStore.selectedCategory"
            @change="productsStore.selectedCategory = +$event.target.value"
          />
          <label for="" class="text-gray-100">{{ category.name }}</label>
        </div>
      </div>
    </div>
    <nav>
      <Link to="sales">Admin</Link>
    </nav>
  </header>
</template>
