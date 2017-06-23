<template>
  <div>
    <input v-model="input" type="text" v-on:keyup="filterList()" />
    <ul>
      <li v-on:click="clicked(item)" v-for="item in filteredItems"><a href="#">{{item}}</a></li>
    </ul>
  </div>
</template>

<style scoped>
input {
  border-radius: 25px;
  color: #333;
  margin: auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 10px;
}
</style>

<script>
export default {
  props: ["items"],
  data: function() {
    return {
      filteredItems: this.items,
      input: ""
    }
  },
  methods: {
    clicked: function(item) {
      this.$emit('clickItem', item);

      this.showMenu = false;
    },
    filterList() {
      var filter = this.input.toUpperCase();

      this.filteredItems = this.items.filter(function(item) {
        return item.toUpperCase().indexOf(filter) > -1;
      });
    }
  }
}
</script>