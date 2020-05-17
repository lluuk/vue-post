<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="../assets/logo.png"
                    transition="scale-transition"
                    width="40"
                />

                <h1 class="title font-weight-bold">VuePost</h1>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                text
                v-if="$route.name === 'Signup' || $route.name === 'Login'"
                :to="$route.name === 'Signup' ? '/login' : '/signup'"
            >{{ $route.name === 'Signup' ? 'Login' : 'Signup' }}</v-btn>
        </v-app-bar>

        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'TheGuestLayout',
}
</script>
