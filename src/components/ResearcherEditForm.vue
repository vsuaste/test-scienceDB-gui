<template>
  <div class="col-xs-5">
    <h4>Edit researcher</h4>
    <div id="researcher-div">
      <div v-if="researcher" class="content">
        <form id="researcher-form" v-on:submit.prevent="onSubmit">

          <researcher-form-elemns v-bind:errors="errors" v-bind:researcher="researcher"></researcher-form-elemns>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import ResearcherFormElemns from './ResearcherFormElemns.vue'
import queries from '../requests/researcher'

Vue.component('researcher-form-elemns', ResearcherFormElemns)

export default {
  data() {
    return {
      loading: false,
      researcher: null,
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
        queries.readOneResearcher({ url:this.$baseUrl(), variables: {id:this.$route.params.id}, token:t.$getAuthToken()})
        .then(function (response) {
            t.researcher = response.data.data.readOneResearcher          }, function (err) {
            t.parent.error = err
          })
      }
    },
    onSubmit() {
      var t = this;
      var url = this.$baseUrl()
      this.getAssociationsIds();
      queries.updateResearcher({url:url, variables:t.researcher, token: t.$getAuthToken()})
      .then(function (response) {
        t.$router.push('/researchers')
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
                this.researcher.projectsFilter = this.getOnlyIds(this.researcher.projectsFilter);
            }
  }
}
</script>
