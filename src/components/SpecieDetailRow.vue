<template>
  <div @click="onClick">
    <div class="inline field">
      <label>id: </label>
      <span>{{rowData.id}}</span>
    </div>
          <div class="inline field">
        <label>nombre:</label>
        <span>{{rowData.nombre}}</span>
      </div>
          <div class="inline field">
        <label>e_nombre_comun_principal:</label>
        <span>{{rowData.e_nombre_comun_principal}}</span>
      </div>
          <div class="inline field">
        <label>e_foto_principal:</label>
        <span>{{rowData.e_foto_principal}}</span>
      </div>
          <div class="inline field">
        <label>nombre_cientifico:</label>
        <span>{{rowData.nombre_cientifico}}</span>
      </div>
    
  
      
    <div id="specie-projects-div" class="row w-100">
      <div class="col">
        <label>projects:</label>
        <scroll-list class="list-group"
          :url="this.$baseUrl()"
          :idSelected="rowData.id"
          :countQuery="rowData.countFilteredProjects"
          query="readOneSpecie"
          subQuery="projectsFilter"
          label="name"
          subLabel=""
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
    },
  methods: {
    onClick (event) {
      console.log('my-detail-row: on-click', event.target)
    }
  }
}
</script>
