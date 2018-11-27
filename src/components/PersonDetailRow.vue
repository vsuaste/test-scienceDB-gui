<template>
  <div @click="onClick">
    <div class="inline field">
      <label>id: </label>
      <span>{{rowData.id}}</span>
    </div>
          <div class="inline field">
        <label>firstName:</label>
        <span>{{rowData.firstName}}</span>
      </div>
          <div class="inline field">
        <label>lastName:</label>
        <span>{{rowData.lastName}}</span>
      </div>
          <div class="inline field">
        <label>email:</label>
        <span>{{rowData.email}}</span>
      </div>
    
  
      
    <div id="person-dogs-div" class="row w-100">
      <div class="col">
        <label>dogs:</label>
        <scroll-list class="list-group"
          :url="this.$baseUrl()"
          :idSelected="rowData.id"
          :countQuery="rowData.countFilteredDogs"
          query="readOnePerson"
          subQuery="dogsFilter"
          label="name"
          subLabel=""
        > </scroll-list>
      </div>
    </div>


    
    <div id="person-books-div" class="row w-100">
      <div class="col">
        <label>books:</label>
        <scroll-list class="list-group"
          :url="this.$baseUrl()"
          :idSelected="rowData.id"
          :countQuery="rowData.countFilteredBooks"
          query="readOnePerson"
          subQuery="booksFilter"
          label="title"
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
