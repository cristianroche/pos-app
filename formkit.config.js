import { generateClasses } from '@formkit/themes'

const config = {
  config: {
    classes: generateClasses({
      global: {
        label: 'block mb-1 font-bold text-lg',
        message: 'text-red-500 mb-5',
        wrapper: 'space-y-2 mb-3',
        input: 'w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400',
      },
      file: {
        noFiles: 'block my-2',
        fileItem: 'hidden',
      },
      submit: {
        input:
          '$reset w-full p-2 bg-green-400 font-bold uppercase rounded hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed',
      },
    }),
  },
}

export default config
