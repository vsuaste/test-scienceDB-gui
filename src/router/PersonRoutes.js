import people from '@/components/people'
import PersonCreate from '@/components/PersonCreateForm'
import PersonEdit from '@/components/PersonEditForm'
import PersonUploadCsv from '@/components/PersonUploadCsvForm'

export default [
    {
      path: '/people',
      name: 'people',
      component: people,
    },
    {
      path: '/person/:id',
      name: 'PersonEdit',
      component: PersonEdit,
    },
    {
      path: '/person',
      name: 'PersonCreate',
      component: PersonCreate,
    },
    {
      path: '/people/upload_csv',
      name: 'PersonUploadCsv',
      component: PersonUploadCsv
    }
  ]
