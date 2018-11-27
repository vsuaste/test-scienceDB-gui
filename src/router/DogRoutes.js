import dogs from '@/components/dogs'
import DogCreate from '@/components/DogCreateForm'
import DogEdit from '@/components/DogEditForm'
import DogUploadCsv from '@/components/DogUploadCsvForm'

export default [
    {
      path: '/dogs',
      name: 'dogs',
      component: dogs,
    },
    {
      path: '/dog/:id',
      name: 'DogEdit',
      component: DogEdit,
    },
    {
      path: '/dog',
      name: 'DogCreate',
      component: DogCreate,
    },
    {
      path: '/dogs/upload_csv',
      name: 'DogUploadCsv',
      component: DogUploadCsv
    }
  ]
