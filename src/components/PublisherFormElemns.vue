<template>
  <div id="publisher-form-elemns-div">

  <input type="hidden" v-model="publisher.id"/>

  
    <div id="publisher-name-div" class="form-group">
            <label>name</label>
      
  <input type="text" v-model="publisher.name" class="form-control"/>


      <div id="publisher-name-err" v-if="validationError('name')" class="alert alert-danger">
        {{validationError('name').message}}
      </div>
    </div>

  
    <div id="publisher-phone-div" class="form-group">
            <label>phone</label>
      
  <input type="text" v-model="publisher.phone" class="form-control"/>


      <div id="publisher-phone-err" v-if="validationError('phone')" class="alert alert-danger">
        {{validationError('phone').message}}
      </div>
    </div>

  
  

      
    <div id="publisher-books-div" class="form-group">
      <label>books</label>
      <has-many-form-element
        :associatedElements.sync="publisher.booksFilter"
        :searchUrl="this.$baseUrl()"
        label="title"
                    subLabel ="genre"
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
  props: [ 'publisher', 'errors' ],
  data(){
    return{
      target_models: [
                     {
            model:'Book',
            label: 'title',
            sublabel: 'genre'
        }              ],
      model: 'publisher'
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
