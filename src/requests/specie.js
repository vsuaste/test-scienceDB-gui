import requestGraphql from './request'

export default {

  addSpecieQuery : function({url, variables, token}){
  let query = ` mutation addSpecie(
   $nombre:String  $e_nombre_comun_principal:String  $e_foto_principal:String  $nombre_cientifico:String      $projectsFilter:[ID]  ){
    addSpecie(
     nombre:$nombre   e_nombre_comun_principal:$e_nombre_comun_principal   e_foto_principal:$e_foto_principal   nombre_cientifico:$nombre_cientifico           projects:$projectsFilter    ){id  nombre   e_nombre_comun_principal   e_foto_principal   nombre_cientifico   }
  }
  `
  return requestGraphql({url, query, variables, token});
},


  readOneSpecie : function({url, variables, token}){
    let query = `query readOneSpecie($id:ID!){
      readOneSpecie(id:$id){id  nombre   e_nombre_comun_principal   e_foto_principal   nombre_cientifico            }
    }`
    return requestGraphql({url, query, variables, token});
  },

  updateSpecie : function({url, variables, token}){
    let query = `mutation updateSpecie($id:ID!
     $nombre:String  $e_nombre_comun_principal:String  $e_foto_principal:String  $nombre_cientifico:String          $projectsFilter:[ID]    ){
      updateSpecie(id:$id
       nombre:$nombre   e_nombre_comun_principal:$e_nombre_comun_principal   e_foto_principal:$e_foto_principal   nombre_cientifico:$nombre_cientifico               projects:$projectsFilter      ){id  nombre   e_nombre_comun_principal   e_foto_principal   nombre_cientifico  }
    }`

    return requestGraphql({url, query, variables, token});
  },

  deleteSpecie : function({url, variables, token}){
    let query = `mutation deleteSpecie($id:ID!){
      deleteSpecie(id:$id)
    }`
    return requestGraphql({url, query, variables, token});
  }
}
