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
        <label>breed:</label>
        <span>{{rowData.breed}}</span>
      </div>
    
      
    <div id="dog-person-div">
      <div class="inline field">
        <label>person:</label>
        <span>{{personInitialLabel}}</span>
      </div>
    </div>

      
    <div id="dog-researcher-div">
      <div class="inline field">
        <label>researcher:</label>
        <span>{{researcherInitialLabel}}</span>
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
          personInitialLabel: function () {
      var x = this.rowData.person
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
      var x = this.rowData.researcher
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
    onClick (event) {
      console.log('my-detail-row: on-click', event.target)
    }
  }
}
</script>
