import { useFirebaseStorage } from 'vuefire'
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage'
import { uid } from 'uid'
import { computed, ref } from 'vue'

export default function useImage() {
  const storage = useFirebaseStorage()
  const imageUrl = ref(null)

  const onFileChange = (e) => {
    const file = e.target.files[0]
    const fileName = uid() + '.jpg'
    const sRef = storageRef(storage, '/products/' + fileName)

    const uploadTask = uploadBytesResumable(sRef, file)

    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.error(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imageUrl.value = downloadURL
        })
      },
    )
  }

  const isImageUploaded = computed(() => imageUrl.value !== null)

  return {
    onFileChange,
    isImageUploaded,
    imageUrl,
  }
}
