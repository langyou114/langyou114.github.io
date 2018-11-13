<template>
  <div id="home">
    这是home组件
    <el-autocomplete
      class="inline-input"
      v-model="todo_input"
      :fetch-suggestions="loadHistoryTodo"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
    <el-button type="primary" round @click="addTodoItem">添加</el-button>
    <el-card class="box-card">
      <div v-if="todos && todos.length > 0" v-for="i in todos" :key="i" class="text item">
        {{i}}
      </div>
    </el-card>
  </div>
</template>

<script>
// import { ElInput, ElButton, ElCard, ElAutocomplete } from 'element-ui';

export default {
  name: 'home',
  data () {
    return {
      todo_input: '',
      msg: 'Welcome to Your Vue.js App',
      todos: []
    }
  },
  computed: {
    
  },
  methods: {
    getTodoHist() {
      console.log('compute todo_hist');
      let ret = JSON.parse(localStorage.getItem('todo_hist') || '[]');      
      console.log('getTodoHist = ' + JSON.stringify(ret));
      return ret;
    },
    loadFromStorage(key) {
      let item = localStorage.getItem(key);
      if( item!==null ) {
        try {
          return JSON.parse(item)
        } catch (e) {
          return undefined;
        }
      }
      return undefined;
    },
    saveToLocalStorage(key, val) {
      localStorage.setItem(key, JSON.stringify(val));
    },
    loadHistoryTodo(queryString, cb) {
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // // 调用 callback 返回建议列表的数据
        // cb(results);
        //let htodo = JSON.parse(localStorage.getItem('todo_hist') || '[]');
        console.log('this.this.getTodoHist = ' + this.getTodoHist());
        cb(this.getTodoHist().map((v,i,arr) => {return {value:v};}));
    },
    saveHistoryTodo(todo_hist) {
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // // 调用 callback 返回建议列表的数据
        // cb(results);
        // let htodo = JSON.parse(localStorage.getItem('todo_hist') || '[]');
        // cb(htodo);
        localStorage.setItem('todo_hist', JSON.stringify(todo_hist));
    },    
    addTodoItem() {
      console.log('todo_input = ' + this.todo_input);
      if(this.todo_input) {
        let todo = localStorage.getItem('todo');
        if(todo) {
          todo = JSON.parse(todo);
        } else {
          todo = [];
        }
        todo = this.insertToArray(this.todo_input, todo);
        let todo_hist = this.insertToArrayNoSame(this.todo_input, (this.getTodoHist()));
        this.saveHistoryTodo(todo_hist);
        this.todos = todo;
        localStorage.setItem('todo', JSON.stringify(todo));
      }
    },
    insertToArray(item, arr = []) {
      let ret = [item];
      for(let i of arr) {
        if(true || i !== item) {
          ret.push(i);
        }
      }
      return ret;
    },
    insertToArrayNoSame(item, arr = []) {
      let ret = [item];
      for(let i of arr) {
        if(i !== item) {
          ret.push(i);
        }
      }
      return ret;
    },
    handleSelect() {

    }
  },
  // components: { ElInput, ElButton, ElCard, ElAutocomplete },
  watch:{
    todo(newVal, oldVal ) {
      console.log(`old = ${oldVal}, new = ${newVal}`);
    }
  },
  mounted() {
    this.todos = this.loadFromStorage('todo') || [];
    // this.todos = localStorage.getItem('todo') || [];
  }
}
</script>

<style>

</style>
