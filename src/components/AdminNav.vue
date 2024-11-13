<script setup>
import { RouterLink } from 'vue-router'
import Link from './Link.vue'
import Logo from './Logo.vue'
</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between absolute top-0 w-full z-10"
  >
    <div>
      <Logo />
    </div>
    <nav>
      <RouterLink :to="{ name: 'products' }" class="rounded text-white font-bold p-2"
        >Products</RouterLink
      >
      <RouterLink :to="{ name: 'sales' }" class="rounded text-white font-bold p-2"
        >Sales</RouterLink
      >
      <Link to="shop">Shop</Link>
    </nav>
  </header>
</template>
