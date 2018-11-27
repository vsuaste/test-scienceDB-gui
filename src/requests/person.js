import requestGraphql from './request'

export default {

  addPersonQuery : function({url, variables, token}){
  let query = ` mutation addPerson(
   $firstName:String  $lastName:String  $email:String      $dogsFilter:[ID] $booksFilter:[ID]  ){
    addPerson(
     firstName:$firstName   lastName:$lastName   email:$email           dogs:$dogsFilter books:$booksFilter    ){id  firstName   lastName   email   }
  }
  `
  return requestGraphql({url, query, variables, token});
},


  readOnePerson : function({url, variables, token}){
    let query = `query readOnePerson($id:ID!){
      readOnePerson(id:$id){id  firstName   lastName   email            }
    }`
    return requestGraphql({url, query, variables, token});
  },

  updatePerson : function({url, variables, token}){
    let query = `mutation updatePerson($id:ID!
     $firstName:String  $lastName:String  $email:String          $dogsFilter:[ID] $booksFilter:[ID]    ){
      updatePerson(id:$id
       firstName:$firstName   lastName:$lastName   email:$email               dogs:$dogsFilter books:$booksFilter      ){id  firstName   lastName   email  }
    }`

    return requestGraphql({url, query, variables, token});
  },

  deletePerson : function({url, variables, token}){
    let query = `mutation deletePerson($id:ID!){
      deletePerson(id:$id)
    }`
    return requestGraphql({url, query, variables, token});
  }
}
