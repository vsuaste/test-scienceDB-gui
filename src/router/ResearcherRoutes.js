import researchers from '@/components/researchers'
import ResearcherCreate from '@/components/ResearcherCreateForm'
import ResearcherEdit from '@/components/ResearcherEditForm'
import ResearcherUploadCsv from '@/components/ResearcherUploadCsvForm'

export default [
    {
      path: '/researchers',
      name: 'researchers',
      component: researchers,
    },
    {
      path: '/researcher/:id',
      name: 'ResearcherEdit',
      component: ResearcherEdit,
    },
    {
      path: '/researcher',
      name: 'ResearcherCreate',
      component: ResearcherCreate,
    },
    {
      path: '/researchers/upload_csv',
      name: 'ResearcherUploadCsv',
      component: ResearcherUploadCsv
    }
  ]
