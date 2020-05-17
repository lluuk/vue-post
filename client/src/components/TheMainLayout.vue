<template>
    <v-app id="inspire">
        <the-navigation-drawer ref="drawer" />
        <the-main-header @toggle-drawer="$refs.drawer.visible = !$refs.drawer.visible" />
        <v-content>
            <v-container>
                <router-view :key="$route.fullPath" />
            </v-container>
        </v-content>
        <v-btn bottom color="pink" dark fab fixed right @click="$refs.dialog.visible = true">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <the-contact-dialog ref="dialog" />
    </v-app>
</template>

<script>
import TheMainHeader from '@/components/TheMainHeader'
import TheNavigationDrawer from '@/components/TheNavigationDrawer'
import TheContactDialog from '@/components/TheContactDialog'
export default {
    name: 'TheMainLayout',
    components: {
        TheMainHeader,
        TheNavigationDrawer,
        TheContactDialog,
    },
}
</script>