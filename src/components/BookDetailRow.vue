<template>
  <div @click="onClick">
    <div class="inline field">
      <label>id: </label>
      <span>{{rowData.id}}</span>
    </div>
          <div class="inline field">
        <label>title:</label>
        <span>{{rowData.title}}</span>
      </div>
          <div class="inline field">
        <label>genre:</label>
        <span>{{rowData.genre}}</span>
      </div>
    
      
    <div id="book-publisher-div">
      <div class="inline field">
        <label>publisher:</label>
        <span>{{publisherInitialLabel}}</span>
      </div>
    </div>

  
      
    <div id="book-people-div" class="row w-100">
      <div class="col">
        <label>people:</label>
        <scroll-list class="list-group"
          :url="this.$baseUrl()"
          :idSelected="rowData.id"
          :countQuery="rowData.countFilteredPeople"
          query="readOneBook"
          subQuery="peopleFilter"
          label="firstName"
          subLabel="email"
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
          publisherInitialLabel: function () {
      var x = this.rowData.publisher
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
