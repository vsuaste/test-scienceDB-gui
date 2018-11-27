import requestGraphql from './request'

export default {

  addTranscript_countQuery : function({url, variables, token}){
  let query = ` mutation addTranscript_count(
   $gene:String  $variable:String  $count:Float  $tissue_or_condition:String    $individual_id:Int     ){
    addTranscript_count(
     gene:$gene   variable:$variable   count:$count   tissue_or_condition:$tissue_or_condition       individual_id:$individual_id         ){id  gene   variable   count   tissue_or_condition   }
  }
  `
  return requestGraphql({url, query, variables, token});
},


  readOneTranscript_count : function({url, variables, token}){
    let query = `query readOneTranscript_count($id:ID!){
      readOneTranscript_count(id:$id){id  gene   variable   count   tissue_or_condition         individual{ name
         }     }
    }`
    return requestGraphql({url, query, variables, token});
  },

  updateTranscript_count : function({url, variables, token}){
    let query = `mutation updateTranscript_count($id:ID!
     $gene:String  $variable:String  $count:Float  $tissue_or_condition:String      $individual_id:Int         ){
      updateTranscript_count(id:$id
       gene:$gene   variable:$variable   count:$count   tissue_or_condition:$tissue_or_condition         individual_id:$individual_id             ){id  gene   variable   count   tissue_or_condition  }
    }`

    return requestGraphql({url, query, variables, token});
  },

  deleteTranscript_count : function({url, variables, token}){
    let query = `mutation deleteTranscript_count($id:ID!){
      deleteTranscript_count(id:$id)
    }`
    return requestGraphql({url, query, variables, token});
  }
}
