<template>
  <div class="col-xs-5">
    <h4>New publisher</h4>
    <div id="publisher-div">
      <div v-if="publisher" class="content">
        <form id="publisher-form" v-on:submit.prevent="onSubmit">

          <publisher-form-elemns v-bind:errors="errors" v-bind:publisher="publisher"></publisher-form-elemns>

          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import PublisherFormElemns from './PublisherFormElemns.vue'
import queries from '../requests/publisher'

Vue.component('publisher-form-elemns', PublisherFormElemns)

export default {
  data() {
    return {
      loading: false,
      publisher: {},
      error: null,
      errors: null,
    }
  },
  methods: {
    onSubmit() {
      var t = this;
      var url = this.$baseUrl()
      this.getAssociationsIds()
      queries.addPublisherQuery({url:url, variables: t.publisher, token: t.$getAuthToken()})
      .then(function(response) {
        t.$router.push('/publishers')
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
              this.publisher.booksFilter = this.getOnlyIds(this.publisher.booksFilter);
          }
  }
}
</script>
