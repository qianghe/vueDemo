<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">withDeconstruction</router-link>
      <router-link to="/without">withOutDeconstruction</router-link>
      <span class="tip">请打开console查看log</span>
    </div>
    <h1>一天最重要的事</h1>
    <router-view :limitNumber="3" />
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 80vw;
  min-width: 800px;
  height: 100vh;
  margin: 0 auto;
  box-shadow: 0 0 20px 2px #eee;
  margin-top: 20px;

  h1 {
    margin-top: 30px;
  }
}
#nav {
  position: relative;
  display: flex;
  padding: 30px;
  border-bottom: 1px solid #eee;
  
  .tip {
    position: absolute;
    right: 30px;
    color: orange;
    font-weight: bold;
    font-size: 14px;
  }
}

#nav a {
  margin-right: 30px;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #1890ff;
}
</style>
