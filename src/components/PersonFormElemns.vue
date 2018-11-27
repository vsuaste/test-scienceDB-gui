<template>
  <div id="person-form-elemns-div">

  <input type="hidden" v-model="person.id"/>

  
    <div id="person-firstName-div" class="form-group">
            <label>firstName</label>
      
  <input type="text" v-model="person.firstName" class="form-control"/>


      <div id="person-firstName-err" v-if="validationError('firstName')" class="alert alert-danger">
        {{validationError('firstName').message}}
      </div>
    </div>

  
    <div id="person-lastName-div" class="form-group">
            <label>lastName</label>
      
  <input type="text" v-model="person.lastName" class="form-control"/>


      <div id="person-lastName-err" v-if="validationError('lastName')" class="alert alert-danger">
        {{validationError('lastName').message}}
      </div>
    </div>

  
    <div id="person-email-div" class="form-group">
            <label>email</label>
      
  <input type="text" v-model="person.email" class="form-control"/>


      <div id="person-email-err" v-if="validationError('email')" class="alert alert-danger">
        {{validationError('email').message}}
      </div>
    </div>

  
  

      
    <div id="person-dogs-div" class="form-group">
      <label>dogs</label>
      <has-many-form-element
        :associatedElements.sync="person.dogsFilter"
        :searchUrl="this.$baseUrl()"
        label="name"
                        valueKey="id"
        targetModel = "Dog"
        >
      </has-many-form-element>
    </div>

      
    <div id="person-books-div" class="form-group">
      <label>books</label>
      <has-many-form-element
        :associatedElements.sync="person.booksFilter"
        :searchUrl="this.$baseUrl()"
        label="title"
                        valueKey="id"
        targetModel = "Book"
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
  props: [ 'person', 'errors' ],
  data(){
    return{
      target_models: [
                     {
            model:'Dog',
            label: 'name',
            sublabel: ''
        },                      {
            model:'Book',
            label: 'title',
            sublabel: ''
        }              ],
      model: 'person'
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
