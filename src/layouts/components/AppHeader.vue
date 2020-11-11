<template>
  <div class="app-header">
    <div class="setting">
      <div class="flex items-center">
        <header-search ref="headerSearch" />
        <feather
          type="search"
          @click="$refs.headerSearch.onOpenSearch()"
        />
        <feather
          class="mx-4"
          :type="isFullScreen ? 'minimize' : 'maximize'"
          @click="onScreenfull"
        />
        <header-notice />
      </div>

      <a-dropdown
        class="ml-4"
        :trigger="['click']"
      >
        <div class="h-full flex items-center">
          <div class="flex items-center text-base">
            <div class="mx-4 text-right">
              <div class="text-lg">{{ info.nickname || '暂无昵称' }}</div>
              <div class="text-sm">{{ info.role }}</div>
            </div>
            <div>
              <a-avatar
                class="flex items-center justify-center"
                size="large"
                :icon="info.avatar ? '' : 'user'"
                :src="info.avatar"
              />
            </div>
          </div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="({ label, name, icon, click }, index) in menuItems"
              :key="index"
              @click="onClickMenuItem(name, click)"
            >
              <div
                tag="div"
                class="flex items-center justify-center text-gray-700"
              >
                <feather
                  size="16"
                  :type="icon"
                />
                <span class="ml-2">{{ label }}</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { isValidUrl } from '@/utils/util'
import HeaderSearch from './app-header/HeaderSearch.vue'
import HeaderNotice from './app-header/HeaderNotice.vue'

export default {
  name: 'AppHeader',
  components: { HeaderSearch, HeaderNotice },

  data: () => ({
    menuItems: [
      {
        label: '官方文档', name: 'https://docs.leoku.top', icon: 'book-open',
      },
      {
        label: '退出登录', name: 'Login', icon: 'log-out', click: 'logOut',
      },
    ],
    isFullScreen: false,
  }),

  computed: {
    info() {
      return this.$store.state.user.info
    },
  },

  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => { this.isFullScreen = screenfull.isFullscreen })
    }
  },

  methods: {
    async logOut() {
      const CAN_LOGOUT = await this.$store.dispatch('user/logout')
      if (CAN_LOGOUT) {
        this.$router.replace({ name: 'Login' })
      }
    },

    onClickShortcut(name) {
      this.$router.push({ name })
    },

    onClickMenuItem(name, click) {
      if (click) {
        this[click]()
      } else if (isValidUrl(name)) {
        window.open(name, '_blank', 'noopener')
      } else {
        this.$router.push({ name })
      }
    },

    onScreenfull() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  @apply relative w-full h-full flex items-center bg-transparent;
}

.setting {
  @apply h-full ml-auto flex items-center cursor-pointer;
}
</style>
