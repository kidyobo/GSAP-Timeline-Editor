<template>
  <div id="vue-button-dropdown">
    <button @click="dropMenu()">
      {{ label }}
    </button>
    <div v-if="showMenu" class="drop">
      <input id="myInput" type="text" v-on:keyup="filterList()" />
      <ul id="myUL">
        <li v-on:click="clicked(item)" v-for="item in items"><a href="#">{{item}}</a></li>
      </ul>
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
  props: ['items', 'label'],
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
    },
    filterList: function() {
      var input, filter, ul, li, a, i;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      ul = document.getElementById("myUL");
      li = ul.getElementsByTagName("li");

      for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("a")[0];
          if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
              li[i].style.display = "";
          } else {
              li[i].style.display = "none";

          }
      }
    }
  },
  mounted() {
    var that = this;
    var specifiedElement = document.getElementById('vue-button-dropdown');

    //I'm using "click" but it works with any event
    document.addEventListener('click', function(event) {
      var isClickInside = specifiedElement.contains(event.target);

      if (!isClickInside) {
        that.showMenu = false;
      }
    });
  }
}
</script>