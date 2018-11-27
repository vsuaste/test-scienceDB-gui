import requestGraphql from './request'

export default {

  addIndividualQuery : function({url, variables, token}){
  let query = ` mutation addIndividual(
   $name:String      $transcript_countsFilter:[ID]  ){
    addIndividual(
     name:$name           transcript_counts:$transcript_countsFilter    ){id  name   }
  }
  `
  return requestGraphql({url, query, variables, token});
},


  readOneIndividual : function({url, variables, token}){
    let query = `query readOneIndividual($id:ID!){
      readOneIndividual(id:$id){id  name            }
    }`
    return requestGraphql({url, query, variables, token});
  },

  updateIndividual : function({url, variables, token}){
    let query = `mutation updateIndividual($id:ID!
     $name:String          $transcript_countsFilter:[ID]    ){
      updateIndividual(id:$id
       name:$name               transcript_counts:$transcript_countsFilter      ){id  name  }
    }`

    return requestGraphql({url, query, variables, token});
  },

  deleteIndividual : function({url, variables, token}){
    let query = `mutation deleteIndividual($id:ID!){
      deleteIndividual(id:$id)
    }`
    return requestGraphql({url, query, variables, token});
  }
}
