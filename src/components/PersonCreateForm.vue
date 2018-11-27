<template>
  <div class="col-xs-5">
    <h4>New person</h4>
    <div id="person-div">
      <div v-if="person" class="content">
        <form id="person-form" v-on:submit.prevent="onSubmit">

          <person-form-elemns v-bind:errors="errors" v-bind:person="person"></person-form-elemns>

          <button type="submit" class="btn btn-primary">Create</button>
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
      person: {},
      error: null,
      errors: null,
    }
  },
  methods: {
    onSubmit() {
      var t = this;
      var url = this.$baseUrl()
      this.getAssociationsIds()
      queries.addPersonQuery({url:url, variables: t.person, token: t.$getAuthToken()})
      .then(function(response) {
        t.$router.push('/people')
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
              this.person.dogsFilter = this.getOnlyIds(this.person.dogsFilter);
              this.person.booksFilter = this.getOnlyIds(this.person.booksFilter);
          }
  }
}
</script>
