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

<style>
button {
  color: #333;
  width: 100%;
}

.drop {
  background-color: #333;
  padding: 5px;
}

.drop input {
  border-radius: 25px;
  color: #333;
  margin: auto;
}

.drop ul {
  list-style-type: none;
  padding: 0;
}

.drop li {
  padding: 5px 10px;
}

.drop li a {
  color: #fff;
}
</style>

<script>
import Vue from 'vue';
//import FilterList from './filter-list';
import FilterList from 'vue-filter-list';
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
    });
  }
}
</script>