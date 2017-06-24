<template>
  <div id="vue-button-dropdown">
    <button @click="dropMenu()">
      {{ label }}
    </button>
    <div v-if="showMenu" class="drop">
      <filter-list @clickItem="clicked" :items="items"></filter-list>
    </div>
  </div>
</template>

<style scoped>
button {
  color: #333;
  width: 100%;
}

.drop {
  background-color: #333;
  padding: 5px;
}
</style>

<script>
import Vue from 'vue';
import FilterList from './filter-list.vue';
import offClick from 'off-click';

Vue.component('filter-list', FilterList);

export default {
  props: ['items', 'label'],
  components: ['filter-list'],
  data: function() {
    return {
      showMenu: false
    }
  },
  methods: {
    clicked: function(item) {
      this.$emit('clickItem', item);

      this.showMenu = false;
    },
    dropMenu: function() {
      this.showMenu = true;
    }
  },
  mounted() {
    var that = this;
    var buttonDropdownElem = document.getElementById('vue-button-dropdown');

    offClick(buttonDropdownElem, function() {
      that.showMenu = false;
    })

    //I'm using "click" but it works with any event
    /*document.addEventListener('click', function(event) {
      var isClickInside = buttonDropdownElem.contains(event.target);

      if (!isClickInside) {
        that.showMenu = false;
      }
    });*/
  }
}
</script>