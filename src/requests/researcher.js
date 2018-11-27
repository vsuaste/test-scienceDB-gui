import requestGraphql from './request'

export default {

  addResearcherQuery : function({url, variables, token}){
  let query = ` mutation addResearcher(
   $firstName:String  $lastName:String  $email:String      $projectsFilter:[ID]  ){
    addResearcher(
     firstName:$firstName   lastName:$lastName   email:$email           projects:$projectsFilter    ){id  firstName   lastName   email   }
  }
  `
  return requestGraphql({url, query, variables, token});
},


  readOneResearcher : function({url, variables, token}){
    let query = `query readOneResearcher($id:ID!){
      readOneResearcher(id:$id){id  firstName   lastName   email            }
    }`
    return requestGraphql({url, query, variables, token});
  },

  updateResearcher : function({url, variables, token}){
    let query = `mutation updateResearcher($id:ID!
     $firstName:String  $lastName:String  $email:String          $projectsFilter:[ID]    ){
      updateResearcher(id:$id
       firstName:$firstName   lastName:$lastName   email:$email               projects:$projectsFilter      ){id  firstName   lastName   email  }
    }`

    return requestGraphql({url, query, variables, token});
  },

  deleteResearcher : function({url, variables, token}){
    let query = `mutation deleteResearcher($id:ID!){
      deleteResearcher(id:$id)
    }`
    return requestGraphql({url, query, variables, token});
  }
}
