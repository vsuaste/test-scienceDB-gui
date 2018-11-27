<template>
  <div class="col-xs-5">
    <h4>New specie</h4>
    <div id="specie-div">
      <div v-if="specie" class="content">
        <form id="specie-form" v-on:submit.prevent="onSubmit">

          <specie-form-elemns v-bind:errors="errors" v-bind:specie="specie"></specie-form-elemns>

          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import SpecieFormElemns from './SpecieFormElemns.vue'
import queries from '../requests/specie'

Vue.component('specie-form-elemns', SpecieFormElemns)

export default {
  data() {
    return {
      loading: false,
      specie: {},
      error: null,
      errors: null,
    }
  },
  methods: {
    onSubmit() {
      var t = this;
      var url = this.$baseUrl()
      this.getAssociationsIds()
      queries.addSpecieQuery({url:url, variables: t.specie, token: t.$getAuthToken()})
      .then(function(response) {
        t.$router.push('/species')
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
              this.specie.projectsFilter = this.getOnlyIds(this.specie.projectsFilter);
          }
  }
}
</script>
