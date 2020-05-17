<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        label="Email"
                                        name="email"
                                        prepend-icon="person"
                                        type="email"
                                        v-model="email"
                                        :rules="emailRules"
                                    />
                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="lock"
                                        type="password"
                                        v-model="password"
                                        :rules="passwordRules"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="primary" @click="handleSubmitForm">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { ref } from '@vue/composition-api'
import { login } from '@/composables/useAuth'
import { emailRules, passwordRules } from '@/utils/validators'
export default {
    name: 'Login',

    setup(props, context) {
        const email = ref('')
        const password = ref('')

        const handleSubmitForm = async () => {
            const { $router, $toasted } = context.root
            try {
                await login({ email: email.value, password: password.value })
                $router.push('/')
                $toasted.success('Welcome back!', { duration: 3000 })
            } catch (e) {
                $toasted.error('Error has occured. Try again.', {
                    duration: 3000,
                })
            }
        }

        return {
            email,
            password,
            handleSubmitForm,
            emailRules,
            passwordRules,
        }
    },
}
</script>