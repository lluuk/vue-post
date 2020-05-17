<template>
    <div>
        <the-main-layout v-if="$route.meta.requiresAuth" />
        <the-guest-layout v-else />
    </div>
</template>

<script>
import { isLoggedIn, logout, getUser } from '@/composables/useAuth'

export default {
    name: 'App',
    components: {
        TheMainLayout: () => import('@/components/TheMainLayout'),
        TheGuestLayout: () => import('@/components/TheGuestLayout'),
    },

    setup(props, context) {
        const { $router, $http } = context.root
        // Redirect to home page if there's a user, otherwise to login page.
        $http.interceptors.response.use(undefined, function(err) {
            return new Promise(function() {
                if (
                    err.status === 401 &&
                    err.config &&
                    !err.config.__isRetryRequest
                ) {
                    logout()
                    $router.push('/login')
                }
                throw err
            })
        })

        if (isLoggedIn.value) {
            try {
                getUser()
            } catch (e) {
                $router.replace('/login')
                localStorage.removeItem('token')
            }
        } else {
            $router.replace('/login')
        }
    },
}
</script>
