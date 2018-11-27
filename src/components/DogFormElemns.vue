<template>
  <div id="dog-form-elemns-div">

  <input type="hidden" v-model="dog.id"/>

  
    <div id="dog-name-div" class="form-group">
            <label>name</label>
      
  <input type="text" v-model="dog.name" class="form-control"/>


      <div id="dog-name-err" v-if="validationError('name')" class="alert alert-danger">
        {{validationError('name').message}}
      </div>
    </div>

  
    <div id="dog-breed-div" class="form-group">
            <label>breed</label>
      
  <input type="text" v-model="dog.breed" class="form-control"/>


      <div id="dog-breed-err" v-if="validationError('breed')" class="alert alert-danger">
        {{validationError('breed').message}}
      </div>
    </div>

  
      
    <div id="dog-person-div" class="form-group">
      <label>person</label>
      <foreign-key-form-element
        :searchUrl = "this.$baseUrl()"
        v-model:foreignKey="dog.personId"
        label="firstName"
                    subLabel = "lastName"
                        valueKey="id"
        targetModel="Person"
        v-bind:initialInput="personInitialLabel">
      </foreign-key-form-element>
    </div>

      
    <div id="dog-researcher-div" class="form-group">
      <label>researcher</label>
      <foreign-key-form-element
        :searchUrl = "this.$baseUrl()"
        v-model:foreignKey="dog.researcherId"
        label="firstName"
                        valueKey="id"
        targetModel="Researcher"
        v-bind:initialInput="researcherInitialLabel">
      </foreign-key-form-element>
    </div>

  

  

  </div>
</template>

<script>
import Vue from 'vue'

import foreignKeyFormElement from './foreignKeyFormElement.vue'

Vue.component('foreign-key-form-element', foreignKeyFormElement)

import inflection from 'inflection'
import axios from 'axios'

export default {
  props: [ 'dog', 'errors' ],
  data(){
    return{
      target_models: [
             ],
      model: 'dog'
    }
  },
  computed: {
          personInitialLabel: function () {
      var x = this.dog.person
      if (x !== null && typeof x === 'object' &&
          x['firstName'] !== null &&
          typeof x['firstName'] !== 'undefined') {
        return x['firstName']
      } else {
        return ''
      }
    }
        ,
              researcherInitialLabel: function () {
      var x = this.dog.researcher
      if (x !== null && typeof x === 'object' &&
          x['firstName'] !== null &&
          typeof x['firstName'] !== 'undefined') {
        return x['firstName']
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
