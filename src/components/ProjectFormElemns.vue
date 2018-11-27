<template>
  <div id="project-form-elemns-div">

  <input type="hidden" v-model="project.id"/>

  
    <div id="project-name-div" class="form-group">
            <label>name</label>
      
  <input type="text" v-model="project.name" class="form-control"/>


      <div id="project-name-err" v-if="validationError('name')" class="alert alert-danger">
        {{validationError('name').message}}
      </div>
    </div>

  
    <div id="project-description-div" class="form-group">
            <label>description</label>
      
  <input type="text" v-model="project.description" class="form-control"/>


      <div id="project-description-err" v-if="validationError('description')" class="alert alert-danger">
        {{validationError('description').message}}
      </div>
    </div>

  
      
    <div id="project-specie-div" class="form-group">
      <label>specie</label>
      <foreign-key-form-element
        :searchUrl = "this.$baseUrl()"
        v-model:foreignKey="project.specieId"
        label="nombre"
                    subLabel = "nombre_cientifico"
                        valueKey="id"
        targetModel="Specie"
        v-bind:initialInput="specieInitialLabel">
      </foreign-key-form-element>
    </div>

  

      
    <div id="project-researchers-div" class="form-group">
      <label>researchers</label>
      <has-many-form-element
        :associatedElements.sync="project.researchersFilter"
        :searchUrl="this.$baseUrl()"
        label="firstName"
                    subLabel ="lastName"
                valueKey="id"
        targetModel = "Researcher"
        >
      </has-many-form-element>
    </div>

  

  </div>
</template>

<script>
import Vue from 'vue'

import foreignKeyFormElement from './foreignKeyFormElement.vue'

Vue.component('foreign-key-form-element', foreignKeyFormElement)

import hasManyFormElemn from './hasManyFormElemn.vue'

Vue.component('has-many-form-element', hasManyFormElemn)
import inflection from 'inflection'
import axios from 'axios'

export default {
  props: [ 'project', 'errors' ],
  data(){
    return{
      target_models: [
                     {
            model:'Researcher',
            label: 'firstName',
            sublabel: 'lastName'
        }              ],
      model: 'project'
    }
  },
  computed: {
          specieInitialLabel: function () {
      var x = this.project.specie
      if (x !== null && typeof x === 'object' &&
          x['nombre'] !== null &&
          typeof x['nombre'] !== 'undefined') {
        return x['nombre']
      } else {
        return ''
      }
    }
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
