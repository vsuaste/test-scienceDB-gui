<template>
  <div @click="onClick">
    <div class="inline field">
      <label>id: </label>
      <span>{{rowData.id}}</span>
    </div>
          <div class="inline field">
        <label>name:</label>
        <span>{{rowData.name}}</span>
      </div>
          <div class="inline field">
        <label>description:</label>
        <span>{{rowData.description}}</span>
      </div>
    
      
    <div id="project-specie-div">
      <div class="inline field">
        <label>specie:</label>
        <span>{{specieInitialLabel}}</span>
      </div>
    </div>

  
      
    <div id="project-researchers-div" class="row w-100">
      <div class="col">
        <label>researchers:</label>
        <scroll-list class="list-group"
          :url="this.$baseUrl()"
          :idSelected="rowData.id"
          :countQuery="rowData.countFilteredResearchers"
          query="readOneProject"
          subQuery="researchersFilter"
          label="firstName"
          subLabel="lastName"
        > </scroll-list>
      </div>
    </div>



  </div>
</template>

<script>
import Vue from 'vue'
import scrollListElement from './scrollListElement.vue'

Vue.component('scroll-list', scrollListElement)

export default {
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  computed: {
          specieInitialLabel: function () {
      var x = this.rowData.specie
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
    onClick (event) {
      console.log('my-detail-row: on-click', event.target)
    }
  }
}
</script>
