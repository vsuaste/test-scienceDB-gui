import requestGraphql from './request'

export default {

  addProjectQuery : function({url, variables, token}){
  let query = ` mutation addProject(
   $name:String  $description:String    $specieId:Int    $researchersFilter:[ID]  ){
    addProject(
     name:$name   description:$description       specieId:$specieId      researchers:$researchersFilter    ){id  name   description   }
  }
  `
  return requestGraphql({url, query, variables, token});
},


  readOneProject : function({url, variables, token}){
    let query = `query readOneProject($id:ID!){
      readOneProject(id:$id){id  name   description         specie{ nombre
         nombre_cientifico  }     }
    }`
    return requestGraphql({url, query, variables, token});
  },

  updateProject : function({url, variables, token}){
    let query = `mutation updateProject($id:ID!
     $name:String  $description:String      $specieId:Int      $researchersFilter:[ID]    ){
      updateProject(id:$id
       name:$name   description:$description         specieId:$specieId        researchers:$researchersFilter      ){id  name   description  }
    }`

    return requestGraphql({url, query, variables, token});
  },

  deleteProject : function({url, variables, token}){
    let query = `mutation deleteProject($id:ID!){
      deleteProject(id:$id)
    }`
    return requestGraphql({url, query, variables, token});
  }
}
