<template>
  <div id="book-form-elemns-div">

  <input type="hidden" v-model="book.id"/>

  
    <div id="book-title-div" class="form-group">
            <label>title</label>
      
  <input type="text" v-model="book.title" class="form-control"/>


      <div id="book-title-err" v-if="validationError('title')" class="alert alert-danger">
        {{validationError('title').message}}
      </div>
    </div>

  
    <div id="book-genre-div" class="form-group">
            <label>genre</label>
      
  <input type="text" v-model="book.genre" class="form-control"/>


      <div id="book-genre-err" v-if="validationError('genre')" class="alert alert-danger">
        {{validationError('genre').message}}
      </div>
    </div>

  
      
    <div id="book-publisher-div" class="form-group">
      <label>publisher</label>
      <foreign-key-form-element
        :searchUrl = "this.$baseUrl()"
        v-model:foreignKey="book.publisherId"
        label="name"
                        valueKey="id"
        targetModel="Publisher"
        v-bind:initialInput="publisherInitialLabel">
      </foreign-key-form-element>
    </div>

  

      
    <div id="book-people-div" class="form-group">
      <label>people</label>
      <has-many-form-element
        :associatedElements.sync="book.peopleFilter"
        :searchUrl="this.$baseUrl()"
        label="firstName"
                    subLabel ="email"
                valueKey="id"
        targetModel = "Person"
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
  props: [ 'book', 'errors' ],
  data(){
    return{
      target_models: [
                     {
            model:'Person',
            label: 'firstName',
            sublabel: 'email'
        }              ],
      model: 'book'
    }
  },
  computed: {
          publisherInitialLabel: function () {
      var x = this.book.publisher
      if (x !== null && typeof x === 'object' &&
          x['name'] !== null &&
          typeof x['name'] !== 'undefined') {
        return x['name']
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
