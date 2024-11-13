<script setup>
import Link from '@/components/Link.vue'
import Product from '@/components/Product.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
</script>

<template>
  <main>
    <Link to="new-product">New Product</Link>
    <h1 class="text-4xl font-black my-10">Products</h1>

    <div v-if="productsStore.noResults">
      <p class="flex justify-center font-bold">No products found</p>
    </div>

    <ul v-else role="list" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      <Product
        v-for="product in productsStore.productsCollection"
        :key="product.id"
        :product="product"
      />
    </ul>
  </main>
</template>
