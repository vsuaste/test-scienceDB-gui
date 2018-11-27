<template>
  <div class="col-xs-5">
    <h4>Edit dog</h4>
    <div id="dog-div">
      <div v-if="dog" class="content">
        <form id="dog-form" v-on:submit.prevent="onSubmit">

          <dog-form-elemns v-bind:errors="errors" v-bind:dog="dog"></dog-form-elemns>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import DogFormElemns from './DogFormElemns.vue'
import queries from '../requests/dog'

Vue.component('dog-form-elemns', DogFormElemns)

export default {
  data() {
    return {
      loading: false,
      dog: null,
      error: null,
      errors: null,
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
  },
  methods: {
    fetchData() {
      var t = this
      t.error = null
      if(this.$route.params.id){
        queries.readOneDog({ url:this.$baseUrl(), variables: {id:this.$route.params.id}, token:t.$getAuthToken()})
        .then(function (response) {
            t.dog = response.data.data.readOneDog          }, function (err) {
            t.parent.error = err
          })
      }
    },
    onSubmit() {
      var t = this;
      var url = this.$baseUrl()
      this.getAssociationsIds();
      queries.updateDog({url:url, variables:t.dog, token: t.$getAuthToken()})
      .then(function (response) {
        t.$router.push('/dogs')
      }).catch( function (res) {
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
          }
  }
}
</script>
