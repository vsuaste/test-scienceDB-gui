<template>
  <div class="col-xs-5">
    <h4>Edit person</h4>
    <div id="person-div">
      <div v-if="person" class="content">
        <form id="person-form" v-on:submit.prevent="onSubmit">

          <person-form-elemns v-bind:errors="errors" v-bind:person="person"></person-form-elemns>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import PersonFormElemns from './PersonFormElemns.vue'
import queries from '../requests/person'

Vue.component('person-form-elemns', PersonFormElemns)

export default {
  data() {
    return {
      loading: false,
      person: null,
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
        queries.readOnePerson({ url:this.$baseUrl(), variables: {id:this.$route.params.id}, token:t.$getAuthToken()})
        .then(function (response) {
            t.person = response.data.data.readOnePerson          }, function (err) {
            t.parent.error = err
          })
      }
    },
    onSubmit() {
      var t = this;
      var url = this.$baseUrl()
      this.getAssociationsIds();
      queries.updatePerson({url:url, variables:t.person, token: t.$getAuthToken()})
      .then(function (response) {
        t.$router.push('/people')
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
                this.person.dogsFilter = this.getOnlyIds(this.person.dogsFilter);
                  this.person.booksFilter = this.getOnlyIds(this.person.booksFilter);
            }
  }
}
</script>
