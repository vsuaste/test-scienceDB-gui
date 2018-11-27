<template>
  <div @click="onClick">
    <div class="inline field">
      <label>id: </label>
      <span>{{rowData.id}}</span>
    </div>
          <div class="inline field">
        <label>gene:</label>
        <span>{{rowData.gene}}</span>
      </div>
          <div class="inline field">
        <label>variable:</label>
        <span>{{rowData.variable}}</span>
      </div>
          <div class="inline field">
        <label>count:</label>
        <span>{{rowData.count}}</span>
      </div>
          <div class="inline field">
        <label>tissue_or_condition:</label>
        <span>{{rowData.tissue_or_condition}}</span>
      </div>
    
      
    <div id="transcript_count-individual-div">
      <div class="inline field">
        <label>individual:</label>
        <span>{{individualInitialLabel}}</span>
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
          individualInitialLabel: function () {
      var x = this.rowData.individual
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
    onClick (event) {
      console.log('my-detail-row: on-click', event.target)
    }
  }
}
</script>
