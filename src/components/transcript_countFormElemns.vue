<template>
  <div id="transcript_count-form-elemns-div">

  <input type="hidden" v-model="transcript_count.id"/>

  
    <div id="transcript_count-gene-div" class="form-group">
            <label>gene</label>
      
  <input type="text" v-model="transcript_count.gene" class="form-control"/>


      <div id="transcript_count-gene-err" v-if="validationError('gene')" class="alert alert-danger">
        {{validationError('gene').message}}
      </div>
    </div>

  
    <div id="transcript_count-variable-div" class="form-group">
            <label>variable</label>
      
  <input type="text" v-model="transcript_count.variable" class="form-control"/>


      <div id="transcript_count-variable-err" v-if="validationError('variable')" class="alert alert-danger">
        {{validationError('variable').message}}
      </div>
    </div>

  
    <div id="transcript_count-count-div" class="form-group">
            <label>count</label>
      
  <input type="text" v-model="transcript_count.count" class="form-control"/>


      <div id="transcript_count-count-err" v-if="validationError('count')" class="alert alert-danger">
        {{validationError('count').message}}
      </div>
    </div>

  
    <div id="transcript_count-tissue_or_condition-div" class="form-group">
            <label>tissue_or_condition</label>
      
  <input type="text" v-model="transcript_count.tissue_or_condition" class="form-control"/>


      <div id="transcript_count-tissue_or_condition-err" v-if="validationError('tissue_or_condition')" class="alert alert-danger">
        {{validationError('tissue_or_condition').message}}
      </div>
    </div>

  
      
    <div id="transcript_count-individual-div" class="form-group">
      <label>individual</label>
      <foreign-key-form-element
        :searchUrl = "this.$baseUrl()"
        v-model:foreignKey="transcript_count.individual_id"
        label="name"
                        valueKey="id"
        targetModel="Individual"
        v-bind:initialInput="individualInitialLabel">
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
  props: [ 'transcript_count', 'errors' ],
  data(){
    return{
      target_models: [
             ],
      model: 'transcript_count'
    }
  },
  computed: {
          individualInitialLabel: function () {
      var x = this.transcript_count.individual
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
