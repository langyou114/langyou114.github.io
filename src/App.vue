<template>
  <div id="app">
    <div>
      <router-link to="/home">
        主页
      </router-link>
    </div>
    <router-view name="Side" class="side"/>
    <router-view name="Home" class="home"/>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
.side {
  width: 30%;
  float: left;
  position: relative;
  border:salmon solid 1px;
}
.home {
  width: 68%;
  float: left;
  position: relative;
  border: #42b983 solid 1px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
