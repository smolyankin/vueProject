<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="item in itemsWithPermission"
          :key="item.title"
          :to="item.to"
          router
          exact
          :disabled="!hasPermission('Read')"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="isAuthenticated" style="margin-right: 10px;">
        {{ getUser.name }}
      </div>
      <v-btn v-if="isAuthenticated" icon title="Выйти" @click="logOut">
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
      <v-btn v-else icon title="Войти" nuxt to="/login">
        <v-icon>
          mdi-login
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="true" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Главная',
          to: '/'
        },
        {
          icon: 'mdi-table-account',
          title: 'Роли',
          to: '/role'
        }
      ],
      itemsWithPermission: [
        {
          icon: 'mdi-account-box-multiple',
          title: 'Абоненты',
          to: '/subscriber'
        }
      ],
      title: 'Vue Project'
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'getUser', 'hasPermission'])
  },
  methods: {
    ...mapActions('user', ['logOut'])
  }
}
</script>
