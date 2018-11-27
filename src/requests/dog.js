import requestGraphql from './request'

export default {

  addDogQuery : function({url, variables, token}){
  let query = ` mutation addDog(
   $name:String  $breed:String    $personId:Int  $researcherId:Int     ){
    addDog(
     name:$name   breed:$breed       personId:$personId  researcherId:$researcherId         ){id  name   breed   }
  }
  `
  return requestGraphql({url, query, variables, token});
},


  readOneDog : function({url, variables, token}){
    let query = `query readOneDog($id:ID!){
      readOneDog(id:$id){id  name   breed         person{ firstName
         lastName  }  researcher{ firstName
         }     }
    }`
    return requestGraphql({url, query, variables, token});
  },

  updateDog : function({url, variables, token}){
    let query = `mutation updateDog($id:ID!
     $name:String  $breed:String      $personId:Int  $researcherId:Int         ){
      updateDog(id:$id
       name:$name   breed:$breed         personId:$personId  researcherId:$researcherId             ){id  name   breed  }
    }`

    return requestGraphql({url, query, variables, token});
  },

  deleteDog : function({url, variables, token}){
    let query = `mutation deleteDog($id:ID!){
      deleteDog(id:$id)
    }`
    return requestGraphql({url, query, variables, token});
  }
}
