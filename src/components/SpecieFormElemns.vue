<template>
  <div id="specie-form-elemns-div">

  <input type="hidden" v-model="specie.id"/>

  
    <div id="specie-nombre-div" class="form-group">
            <label>nombre</label>
      
  <input type="text" v-model="specie.nombre" class="form-control"/>


      <div id="specie-nombre-err" v-if="validationError('nombre')" class="alert alert-danger">
        {{validationError('nombre').message}}
      </div>
    </div>

  
    <div id="specie-e_nombre_comun_principal-div" class="form-group">
            <label>e_nombre_comun_principal</label>
      
  <input type="text" v-model="specie.e_nombre_comun_principal" class="form-control"/>


      <div id="specie-e_nombre_comun_principal-err" v-if="validationError('e_nombre_comun_principal')" class="alert alert-danger">
        {{validationError('e_nombre_comun_principal').message}}
      </div>
    </div>

  
    <div id="specie-e_foto_principal-div" class="form-group">
            <label>e_foto_principal</label>
      
  <input type="text" v-model="specie.e_foto_principal" class="form-control"/>


      <div id="specie-e_foto_principal-err" v-if="validationError('e_foto_principal')" class="alert alert-danger">
        {{validationError('e_foto_principal').message}}
      </div>
    </div>

  
    <div id="specie-nombre_cientifico-div" class="form-group">
            <label>nombre_cientifico</label>
      
  <input type="text" v-model="specie.nombre_cientifico" class="form-control"/>


      <div id="specie-nombre_cientifico-err" v-if="validationError('nombre_cientifico')" class="alert alert-danger">
        {{validationError('nombre_cientifico').message}}
      </div>
    </div>

  
  

      
    <div id="specie-projects-div" class="form-group">
      <label>projects</label>
      <has-many-form-element
        :associatedElements.sync="specie.projectsFilter"
        :searchUrl="this.$baseUrl()"
        label="name"
                        valueKey="id"
        targetModel = "Project"
        >
      </has-many-form-element>
    </div>

  

  </div>
</template>

<script>
import Vue from 'vue'


import hasManyFormElemn from './hasManyFormElemn.vue'

Vue.component('has-many-form-element', hasManyFormElemn)
import inflection from 'inflection'
import axios from 'axios'

export default {
  props: [ 'specie', 'errors' ],
  data(){
    return{
      target_models: [
                     {
            model:'Project',
            label: 'name',
            sublabel: ''
        }              ],
      model: 'specie'
    }
  },
  computed: {
    },
  methods: {
    validationError(modelField) {
      if (this.errors == null) return false;
      return this.errors.find(function (el) {
        return el.path === modelField
      })
    },
    loadAllAssociatedItems(){
      this.target_models.forEach(tModel=>{
        let query = this.createQuery(tModel);
        axios.post( this.$baseUrl(),{
          query: query,
          variables:{id: this[ this.model.toLowerCase() ].id},
          headers: {
            'authorization': `Bearer ${this.$getAuthToken()}`,
            'Accept': 'application/graphql'}
        }).then(res=>{
          this[ this.model.toLowerCase() ][ `${inflection.pluralize(tModel.model.toLowerCase())}Filter` ]=
          res.data.data[`readOne${inflection.capitalize(this.model)}`][`${inflection.pluralize(tModel.model.toLowerCase())}Filter`];
        });
      })
    },
    createQuery(tModel){
      return ` query
        readOne${inflection.capitalize(this.model)}($id:ID!){
          readOne${inflection.capitalize(this.model)}(id:$id ){
            ${inflection.pluralize(tModel.model.toLowerCase())}Filter{
              id ${tModel.label} ${tModel.sublabel}
            }
          }
        }
      `
    }
  },
	mounted: function() {
    let el = this;
    $(document).ready(function(){
      $('.datepicker').datepicker({
        format: el.$defaultDateFormat(),
        dateFormat: el.$defaultDateFormat()
      })
    })
	},
  created(){
    if(this[this.model.toLowerCase()].id!==undefined){
      this.loadAllAssociatedItems();
    }
  }
}
</script>
