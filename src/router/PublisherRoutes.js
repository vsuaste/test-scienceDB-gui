import publishers from '@/components/publishers'
import PublisherCreate from '@/components/PublisherCreateForm'
import PublisherEdit from '@/components/PublisherEditForm'
import PublisherUploadCsv from '@/components/PublisherUploadCsvForm'

export default [
    {
      path: '/publishers',
      name: 'publishers',
      component: publishers,
    },
    {
      path: '/publisher/:id',
      name: 'PublisherEdit',
      component: PublisherEdit,
    },
    {
      path: '/publisher',
      name: 'PublisherCreate',
      component: PublisherCreate,
    },
    {
      path: '/publishers/upload_csv',
      name: 'PublisherUploadCsv',
      component: PublisherUploadCsv
    }
  ]
