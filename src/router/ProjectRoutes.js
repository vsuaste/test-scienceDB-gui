import projects from '@/components/projects'
import ProjectCreate from '@/components/ProjectCreateForm'
import ProjectEdit from '@/components/ProjectEditForm'
import ProjectUploadCsv from '@/components/ProjectUploadCsvForm'

export default [
    {
      path: '/projects',
      name: 'projects',
      component: projects,
    },
    {
      path: '/project/:id',
      name: 'ProjectEdit',
      component: ProjectEdit,
    },
    {
      path: '/project',
      name: 'ProjectCreate',
      component: ProjectCreate,
    },
    {
      path: '/projects/upload_csv',
      name: 'ProjectUploadCsv',
      component: ProjectUploadCsv
    }
  ]
