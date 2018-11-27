import requestGraphql from './request'

export default {

  addBookQuery : function({url, variables, token}){
  let query = ` mutation addBook(
   $title:String  $genre:String    $publisherId:Int    $peopleFilter:[ID]  ){
    addBook(
     title:$title   genre:$genre       publisherId:$publisherId      people:$peopleFilter    ){id  title   genre   }
  }
  `
  return requestGraphql({url, query, variables, token});
},


  readOneBook : function({url, variables, token}){
    let query = `query readOneBook($id:ID!){
      readOneBook(id:$id){id  title   genre         publisher{ name
         }     }
    }`
    return requestGraphql({url, query, variables, token});
  },

  updateBook : function({url, variables, token}){
    let query = `mutation updateBook($id:ID!
     $title:String  $genre:String      $publisherId:Int      $peopleFilter:[ID]    ){
      updateBook(id:$id
       title:$title   genre:$genre         publisherId:$publisherId        people:$peopleFilter      ){id  title   genre  }
    }`

    return requestGraphql({url, query, variables, token});
  },

  deleteBook : function({url, variables, token}){
    let query = `mutation deleteBook($id:ID!){
      deleteBook(id:$id)
    }`
    return requestGraphql({url, query, variables, token});
  }
}
