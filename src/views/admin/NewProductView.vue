<script setup>
import { reactive } from 'vue'
import Link from '@/components/Link.vue'

import useImage from '@/composables/useImage'
import { useProductsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const { onFileChange, isImageUploaded, imageUrl } = useImage()

const productsStore = useProductsStore()

const router = useRouter()

const formData = reactive({
  name: '',
  image: null,
  category: '',
  price: '',
  availability: '',
})

const submitHandler = async (formData) => {
  const { image, ...values } = formData

  try {
    await productsStore.addProduct({ ...values, image: imageUrl.value })
    router.push({ name: 'products' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <Link to="products">Back</Link>
    <h1 class="text-4xl font-black my-10">New Product</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit
          type="form"
          submit-label="Add Product"
          incomplete-message="Could not be sent, please check your messages"
          @submit="submitHandler"
          :value="formData"
        >
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Product Name"
            validation="required"
            :validation-messages="{ required: 'Product name is required' }"
            v-model="formData.name"
          />

          <FormKit
            type="file"
            label="Product Image"
            name="image"
            accept=".jpg"
            validation="required"
            :validation-messages="{ required: 'Product image is required' }"
            @change="onFileChange"
          />

          <div v-if="isImageUploaded">
            <p class="font-black">Preview</p>
            <img :src="imageUrl" alt="Product Image" class="w-40 h-40 object-cover rounded-lg" />
          </div>

          <FormKit
            type="select"
            label="Category"
            name="category"
            validation="required"
            :validation-messages="{ required: 'Product category is required' }"
            :options="productsStore.categoryOptions"
            v-model.number="formData.category"
          />

          <FormKit
            type="number"
            label="Price"
            name="price"
            placeholder="Product Price"
            validation="required"
            :validation-messages="{ required: 'Product price is required' }"
            min="1"
            v-model.number="formData.price"
          />

          <FormKit
            type="number"
            label="Available"
            name="availability"
            placeholder="Product Availability"
            validation="required"
            :validation-messages="{ required: 'Product availability is required' }"
            min="1"
            v-model.number="formData.availability"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
