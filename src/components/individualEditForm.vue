<template>
  <div class="col-xs-5">
    <h4>Edit individual</h4>
    <div id="individual-div">
      <div v-if="individual" class="content">
        <form id="individual-form" v-on:submit.prevent="onSubmit">

          <individual-form-elemns v-bind:errors="errors" v-bind:individual="individual"></individual-form-elemns>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import individualFormElemns from './individualFormElemns.vue'
import queries from '../requests/individual'

Vue.component('individual-form-elemns', individualFormElemns)

export default {
  data() {
    return {
      loading: false,
      individual: null,
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
        queries.readOneIndividual({ url:this.$baseUrl(), variables: {id:this.$route.params.id}, token:t.$getAuthToken()})
        .then(function (response) {
            t.individual = response.data.data.readOneIndividual          }, function (err) {
            t.parent.error = err
          })
      }
    },
    onSubmit() {
      var t = this;
      var url = this.$baseUrl()
      this.getAssociationsIds();
      queries.updateIndividual({url:url, variables:t.individual, token: t.$getAuthToken()})
      .then(function (response) {
        t.$router.push('/individuals')
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
                this.individual.transcript_countsFilter = this.getOnlyIds(this.individual.transcript_countsFilter);
            }
  }
}
</script>
