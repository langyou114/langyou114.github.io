<template>
  <div id="home">
    <el-row :gutter="20" class="add-item-bar" style="margin:0.3rem auto;">
          <el-col :span="13">
            <el-autocomplete
            class="inline-input"
            v-model="todo_input"
            :fetch-suggestions="loadHistoryTodo"
            placeholder="添加待办事项"
            @select="handleSelect"
            style="width:100%;"
            ></el-autocomplete>
          </el-col>
          
          <el-col :span="7" >
            <el-date-picker
              v-model="todoTime"
              type="datetime"
              placeholder="选择预计完成日期"
              align="right"
              default-time="12:00:00"
              style="width:100%;"
            >    
          </el-date-picker>
          </el-col>
          <el-col :span="4" >
            <el-button type="primary" round @click="addTodoItem" style="width:100%">添加</el-button>
          </el-col>

        </el-row>
    
    
    
    <div id="todo">
      
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>已添加待办事项</span>
        <el-button style="float: right; padding: 3px 0" 
        type="text" @click="clearAlltodos" 
        :disabled="!(todos && todos.length > 0)">删除全部</el-button>
      </div> 
      <div v-if="todos && todos.length > 0" v-for="(v,k) in todos" :key="k" class="text item">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="grid-content bg-purple">
              {{v}} 
            </div>
          </el-col>
          <el-col :span="2" >
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-edit" @click="editTodo(k)" circle>
              </el-button>
            </div>
          </el-col>
          <el-col :span="2" >
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-check" @click="finishTodo(k)" circle>
              </el-button>
            </div>
          </el-col>
          <el-col :span="2" >
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-delete" 
              @click="deleteTodo(k)" circle>
              </el-button>
            </div>
          </el-col>
        </el-row>
        
      </div>
      <div v-if="!(todos && todos.length > 0)" class="plain-text">
        <span>没有待办事项</span>        
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>已完成事项</span>
        <el-button style="float: right; padding: 3px 0" 
        type="text" @click="clearAllFinishtodos" 
        :disabled="!(finishTodos && finishTodos.length > 0)">删除全部</el-button>
      </div> 
      <div v-if="finishTodos && finishTodos.length > 0" v-for="(v,k) in finishTodos" :key="k" class="text item">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="grid-content bg-purple">
              {{v}} 
            </div>
          </el-col>
          <el-col :span="2" >
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-edit" @click="editTodo(k)" circle>
              </el-button>
            </div>
          </el-col>
          <el-col :span="2" >
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-check" @click="finishTodo(k)" circle>
              </el-button>
            </div>
          </el-col>
          <el-col :span="2" >
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-delete" 
              @click="deleteTodo(k)" circle>
              </el-button>
            </div>
          </el-col>
        </el-row>
        
      </div>
      <div v-if="!(finishTodos && finishTodos.length > 0)" class="plain-text">
        <span>没有已完成事项</span>        
      </div>
    </el-card>
    <el-card class="box-card" name="deleted">
      <div slot="header" class="clearfix">
        <span>已删除事项</span>
        <el-button style="float: right; padding: 3px 0" 
        type="text" @click="clearAllDeletedtodos" 
        :disabled="!(deletedTodos && deletedTodos.length > 0)">删除全部</el-button>
      </div> 
      <div v-if="deletedTodos && deletedTodos.length > 0" v-for="(v,k) in deletedTodos" :key="k" class="text item">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="grid-content bg-purple">
              {{v}} 
            </div>
          </el-col>
          <el-col :span="2" >
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-edit" @click="editTodo(k)" circle>
              </el-button>
            </div>
          </el-col>
          <el-col :span="2" >
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-check" @click="finishTodo(k)" circle>
              </el-button>
            </div>
          </el-col>
          <el-col :span="2" >
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-delete" 
              @click="deleteTodo(k)" circle>
              </el-button>
            </div>
          </el-col>
        </el-row>
        
      </div>
      <div v-if="!(deletedTodos && deletedTodos.length > 0)" class="plain-text">
        <span>没有已删除事项</span>        
      </div>
    </el-card>
    </div>
  </div>
</template>

<script>
// import { ElInput, ElButton, ElCard, ElAutocomplete } from 'element-ui';
const StorageKeys = {
  done: 'ly-todo-list-done',
  delete: 'ly-todo-list-delete',
  todo: 'ly-todo-list-todo',
  history: 'ly-todo-list-todo-hist',
}
export default {
  name: 'home',
  data () {
    return {
      todo_input: '',
      msg: 'Welcome to Your Vue.js App',
      todos: [],
      finishTodos: [],
      todoTime: '',
      deletedTodos: []
    }
  },
  computed: {
    
  },
  methods: {
    getTodoHist() {
      console.log('compute todo_hist');
      let ret = JSON.parse(localStorage.getItem(StorageKeys.history) || '[]');      
      // console.log('getTodoHist = ' + JSON.stringify(ret));
      return ret;
    },
    deleteTodo(k) {
      this.insertToArrayNoSame(this.todos[k],this.deletedTodos);      
      this.todos.splice(k,1);
      this.saveToLocalStorage(StorageKeys.delete, this.deletedTodos);
    },
    finishTodo(k) {
      this.finishTodos.push(this.todos[k]);
      this.todos.splice(k,1);
      this.saveToLocalStorage(StorageKeys.done, this.finishTodos);
    },
    clearAlltodos() {
      this.deletedTodos = this.insertItemsToArrayNoSame(this.todos, this.deletedTodos);
      this.saveToLocalStorage(StorageKeys.delete, this.deletedTodos);
      this.todos = [];
      this.saveToLocalStorage(StorageKeys.todo, this.todos);
    },
    clearAllFinishtodos() {
      this.finishTodos = [];
      this.saveToLocalStorage(StorageKeys.done, this.finishTodos);
    },
    clearAllDeletedtodos() {
      this.deletedTodos = [];
      this.saveToLocalStorage(StorageKeys.delete, this.deletedTodos);
    },    
    loadFromLocalStorage(key) {
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
      localStorage.setItem(key, JSON.stringify(val || {}));
    },
    loadHistoryTodo(queryString, cb) {
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // // 调用 callback 返回建议列表的数据
        // cb(results);
        //let htodo = JSON.parse(localStorage.getItem('todo_hist') || '[]');
        // console.log('this.this.getTodoHist = ' + this.getTodoHist());
        cb(this.getTodoHist().map((v,i,arr) => {return {value:v};}));
    },
    saveHistoryTodo(todo_hist) {
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
        localStorage.setItem(StorageKeys.todo, JSON.stringify(todo));
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
    insertItemsToArrayNoSame(items, arr = []) {
      if (Object.prototype.toString.call(items) === '[object Array]') {
        let srcSet = new Set(items);
        let destSet = new Set(arr || []);
        let destArr = Array.from(destSet);
        for(let i of srcSet) {
          if(!destSet.has(i)) {
            destArr.unshift(i);
          }
        }
        return destArr;
      }
      
    },
    handleSelect() {

    }
  },
  // components: { ElInput, ElButton, ElCard, ElAutocomplete },
  watch:{
    todo(newVal, oldVal ) {
      console.log(`old = ${oldVal}, new = ${newVal}`);
    },
    todoTime(newVal, oldVal ) {
      console.log(`todoTime old = ${oldVal}, new = ${newVal}`);
    }
  },
  mounted() {
    this.todos = this.loadFromLocalStorage(StorageKeys.todo) || [];
    this.deletedTodos = this.loadFromLocalStorage(StorageKeys.delete) || [];
    this.todo_hist = this.loadFromLocalStorage(StorageKeys.history) || [];
    this.finishTodos = this.loadFromLocalStorage(StorageKeys.done) || [];
  }
}
</script>

<style scoped>
#home {
  font-size: 0.5rem;
}
#todo1 {
  width: 90%;
  margin: 0 auto;
  height: 30rem;  
  text-align: center;
}
.grid-content {
  margin: 0.1rem;
}
.box-card {
  width: 90%;
  margin: 0 auto;
  height: 15rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.add-item-bar {
  margin:0.3rem auto;
  width: 94%;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
.plain-text {
  font-size: 0.6rem;
  color:darkgrey;
}
</style>
