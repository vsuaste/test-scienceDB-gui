<template>
  <div class="col-xs-5">
    <h4>New book</h4>
    <div id="book-div">
      <div v-if="book" class="content">
        <form id="book-form" v-on:submit.prevent="onSubmit">

          <book-form-elemns v-bind:errors="errors" v-bind:book="book"></book-form-elemns>

          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import BookFormElemns from './BookFormElemns.vue'
import queries from '../requests/book'

Vue.component('book-form-elemns', BookFormElemns)

export default {
  data() {
    return {
      loading: false,
      book: {},
      error: null,
      errors: null,
    }
  },
  methods: {
    onSubmit() {
      var t = this;
      var url = this.$baseUrl()
      this.getAssociationsIds()
      queries.addBookQuery({url:url, variables: t.book, token: t.$getAuthToken()})
      .then(function(response) {
        t.$router.push('/books')
      }).catch(function(res) {
        if (res.response && res.response.data && res.response.data.errors) {
          t.errors = res.response.data.errors
        } else {
          var err = (res && res.response && res.response.data && res.response
            .data.message ?
            res.response.data.message : res)
          t.$root.$emit('globalError', err)
          t.$router.push('/')
        }
      })
    },

    getOnlyIds(array){
      return array.map((item)=>{ return item.id; });
    },

    getAssociationsIds(){
              this.book.peopleFilter = this.getOnlyIds(this.book.peopleFilter);
          }
  }
}
</script>
