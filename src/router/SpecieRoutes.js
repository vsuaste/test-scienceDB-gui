import species from '@/components/species'
import SpecieCreate from '@/components/SpecieCreateForm'
import SpecieEdit from '@/components/SpecieEditForm'
import SpecieUploadCsv from '@/components/SpecieUploadCsvForm'

export default [
    {
      path: '/species',
      name: 'species',
      component: species,
    },
    {
      path: '/specie/:id',
      name: 'SpecieEdit',
      component: SpecieEdit,
    },
    {
      path: '/specie',
      name: 'SpecieCreate',
      component: SpecieCreate,
    },
    {
      path: '/species/upload_csv',
      name: 'SpecieUploadCsv',
      component: SpecieUploadCsv
    }
  ]
