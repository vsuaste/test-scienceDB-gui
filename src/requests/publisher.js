import requestGraphql from './request'

export default {

  addPublisherQuery : function({url, variables, token}){
  let query = ` mutation addPublisher(
   $name:String  $phone:String      $booksFilter:[ID]  ){
    addPublisher(
     name:$name   phone:$phone           books:$booksFilter    ){id  name   phone   }
  }
  `
  return requestGraphql({url, query, variables, token});
},


  readOnePublisher : function({url, variables, token}){
    let query = `query readOnePublisher($id:ID!){
      readOnePublisher(id:$id){id  name   phone            }
    }`
    return requestGraphql({url, query, variables, token});
  },

  updatePublisher : function({url, variables, token}){
    let query = `mutation updatePublisher($id:ID!
     $name:String  $phone:String          $booksFilter:[ID]    ){
      updatePublisher(id:$id
       name:$name   phone:$phone               books:$booksFilter      ){id  name   phone  }
    }`

    return requestGraphql({url, query, variables, token});
  },

  deletePublisher : function({url, variables, token}){
    let query = `mutation deletePublisher($id:ID!){
      deletePublisher(id:$id)
    }`
    return requestGraphql({url, query, variables, token});
  }
}
