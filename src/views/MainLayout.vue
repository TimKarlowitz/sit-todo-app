<template> <!--Sets up the App Bar where the user can switch between Active and Archive Screen -->
  <v-app class="app">
    <v-app-bar app class="app-bar">
      <router-link to="/" class="nav-link">
        <v-btn text>My Tasks</v-btn>
      </router-link>
      <router-link to="/archive" class="nav-link">
        <v-btn text>Archive</v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-title>My Task App</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/about" class="nav-link">
        <v-icon>mdi-account</v-icon>
        <v-btn text>Account</v-btn>
      </router-link>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>

<style scoped>
.nav-link {
  text-decoration: none;
}
.app-bar {
  background-color: #103253;
}
.app {
  background-color: #242424;
}
</style>
