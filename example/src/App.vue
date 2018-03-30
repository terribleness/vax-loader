<template>
  <div id="app">
    <ul>
        <li v-for="(item,index) in NOTICE.Datas" :key="index">{{item[2]}}</li>
    </ul>
    <ul>
        <li v-for="(item,index) in WINNING.Datas" :key="index">{{item[2]}}</li>
    </ul>
    <ul>
        <li v-for="(item,index) in Promos.Datas" :key="index">{{item[8]}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: mapGetters(["NOTICE","WINNING","Promos"]),
  created() {
    this.$store.dispatch("NOTICE");
    this.$store.dispatch("WINNING");
    this.$store.dispatch("Promos");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
