<template>
  <div id="nav">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">Home</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="orders-o">Course</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="manager-o">User Center</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss"></style>
