import { update } from 'firebase/database'
import {
  addDoc,
  collection,
  where,
  query,
  limit,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

export const useProductsStore = defineStore('products', () => {
  const db = useFirestore()
  const storage = useFirebaseStorage()

  const selectedCategory = ref(1)

  const categories = [
    { id: 1, name: 'Sweatshirts' },
    { id: 2, name: 'Sneakers' },
    { id: 3, name: 'Glasses' },
  ]
  const q = query(collection(db, 'products'))
  const productsCollection = useCollection(q)

  const addProduct = async (product) => {
    await addDoc(collection(db, 'products'), product)
  }

  const updateProduct = async (docRef, product) => {
    const { image, url, ...values } = product

    if (image.length) {
      await updateDoc(docRef, { ...values, image: url.value })
    } else {
      await updateDoc(docRef, values)
    }
  }

  const deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const docRef = doc(db, 'products', id)
      const docSnap = await getDoc(docRef)

      const { image } = docSnap.data()
      const imageRef = storageRef(storage, image)

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
    }
  }

  const categoryOptions = computed(() => {
    const options = [
      { value: '', label: 'Select a category', attrs: { disabled: true } },
      ...categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    ]
    return options
  })

  const noResults = computed(() => productsCollection.value.length === 0)

  const filteredProducts = computed(() => {
    return productsCollection.value
      .filter((product) => product.category === selectedCategory.value)
      .filter((product) => product.availability > 0)
  })

  return {
    productsCollection,
    filteredProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    categoryOptions,
    categories,
    selectedCategory,
    noResults,
  }
})
