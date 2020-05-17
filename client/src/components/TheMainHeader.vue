<template>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
        <v-app-bar-nav-icon @click.stop="toggleDrawer" />
        <v-btn icon large to="/">
            <v-avatar size="32px" item>
                <v-img src="../assets/logo.png" alt="VuePost" />
            </v-avatar>
        </v-btn>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
            <span class="hidden-sm-and-down">VuePost</span>
        </v-toolbar-title>
        <the-search />
        <v-spacer />
        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon @click="handleLogout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { logout } from '@/composables/useAuth'
import TheSearch from '@/components/TheSearch'
export default {
    name: 'TheMainHeader',
    components: {
        TheSearch,
    },

    setup(props, context) {
        const { $router, $toasted } = context.root

        const handleLogout = async () => {
            await logout()
            $router.push('/login')
            $toasted.error('You have been logout!', { duration: 3000 })
        }

        const toggleDrawer = () => {
            context.emit('toggle-drawer')
        }

        return {
            handleLogout,
            toggleDrawer,
        }
    },
}
</script>