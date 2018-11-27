<template>
  <div class="col-xs-5">
    <h4>Edit project</h4>
    <div id="project-div">
      <div v-if="project" class="content">
        <form id="project-form" v-on:submit.prevent="onSubmit">

          <project-form-elemns v-bind:errors="errors" v-bind:project="project"></project-form-elemns>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import ProjectFormElemns from './ProjectFormElemns.vue'
import queries from '../requests/project'

Vue.component('project-form-elemns', ProjectFormElemns)

export default {
  data() {
    return {
      loading: false,
      project: null,
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
        queries.readOneProject({ url:this.$baseUrl(), variables: {id:this.$route.params.id}, token:t.$getAuthToken()})
        .then(function (response) {
            t.project = response.data.data.readOneProject          }, function (err) {
            t.parent.error = err
          })
      }
    },
    onSubmit() {
      var t = this;
      var url = this.$baseUrl()
      this.getAssociationsIds();
      queries.updateProject({url:url, variables:t.project, token: t.$getAuthToken()})
      .then(function (response) {
        t.$router.push('/projects')
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
                this.project.researchersFilter = this.getOnlyIds(this.project.researchersFilter);
            }
  }
}
</script>
