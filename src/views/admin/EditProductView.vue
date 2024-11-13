<script setup>
import { watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'
import Link from '@/components/Link.vue'
import { useProductsStore } from '@/stores/products'
import useImage from '@/composables/useImage'

const { onFileChange, imageUrl, isImageUploaded } = useImage()
const products = useProductsStore()

const route = useRoute()
const router = useRouter()
const db = useFirestore()
const docRef = doc(db, 'products', route.params.id)
const product = useDocument(docRef)

watch(product, () => {
  if (!product.value) router.push({ name: 'products' })
  Object.assign(formData, product.value)
})

const formData = reactive({
  name: '',
  category: '',
  price: '',
  availability: '',
  image: '',
})

const submitHandler = async (data) => {
  try {
    await products.updateProduct(docRef, { ...data, url: imageUrl })
    router.push({ name: 'products' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <Link to="products"> Back </Link>
    <h1 class="text-4xl my-10 font-extrabold">Edit Product</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mx-auto mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit
          type="form"
          :value="formData"
          submit-label="Save Changes"
          incomplete-message="Could not be sent, please check your messages"
          @submit="submitHandler"
          :actions="false"
        >
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Product Name"
            validation="required"
            v-model.trim="formData.name"
            :validation-messages="{ required: 'Product name is required' }"
          />

          <FormKit
            type="select"
            label="Category"
            name="category"
            validation="required"
            v-model.number="formData.category"
            :validation-messages="{ required: 'Product category is required' }"
            :options="products.categoryOptions"
          />

          <FormKit
            type="number"
            label="Price"
            name="price"
            placeholder="Product Price"
            step="1"
            min="1"
            v-model.number="formData.price"
          />

          <FormKit
            type="number"
            label="Available"
            name="availability"
            placeholder="Available Products"
            v-model.number="formData.availability"
            step="1"
            min="0"
          />

          <div v-if="isImageUploaded">
            <p class="font-black">New Image</p>
            <img :src="imageUrl" alt="New Product Image" class="w-52" />
          </div>

          <div v-else>
            <p class="font-black">Current Image</p>
            <img :src="formData.image" :alt="'Image of' + formData.image" class="w-52" />
          </div>

          <FormKit
            type="file"
            label="Change Image"
            name="image"
            multiple="false"
            accept=".jpg"
            @change="onFileChange"
          />

          <FormKit type="submit">Save Changes</FormKit>
        </FormKit>
      </div>
    </div>
  </div>
</template>
