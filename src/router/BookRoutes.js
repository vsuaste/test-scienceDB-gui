import books from '@/components/books'
import BookCreate from '@/components/BookCreateForm'
import BookEdit from '@/components/BookEditForm'
import BookUploadCsv from '@/components/BookUploadCsvForm'

export default [
    {
      path: '/books',
      name: 'books',
      component: books,
    },
    {
      path: '/book/:id',
      name: 'BookEdit',
      component: BookEdit,
    },
    {
      path: '/book',
      name: 'BookCreate',
      component: BookCreate,
    },
    {
      path: '/books/upload_csv',
      name: 'BookUploadCsv',
      component: BookUploadCsv
    }
  ]
