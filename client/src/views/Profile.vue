<template>
    <div class="about">
        <h1>Your profile</h1>
        <v-card-text>
            <v-form>
                <v-avatar size="80px" class="mx-3 mb-5">
                    <img :src="avatarSrc" alt="User avatar" />
                </v-avatar>
                <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Avatar"
                    name="avatar"
                    @change="handleAvatarInput"
                />
                <v-text-field
                    v-model="user.email"
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="email"
                    :rules="emailRules"
                />
                <v-text-field
                    v-model="user.name"
                    label="Username"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    :rules="requiredRule"
                />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="handleSubmitForm">Save</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import axios from 'axios'
import { computed } from '@vue/composition-api'
import { userData, getUser } from '@/composables/useAuth'
import { emailRules, requiredRule } from '@/utils/validators'

export default {
    setup(props, context) {
        const user = userData

        async function handleAvatarInput(file) {
            try {
                const formData = new FormData()
                formData.append('avatar', file)
                await axios({ url: '/me/avatar', data: formData, method: 'POST', headers: { 'content-type': 'multipart/form-data' } })
                await getUser()
            } catch (e) {
                console.log(e.message)
            }
        }

        async function handleSubmitForm() {
            const { email, name } = user.value
            const data = {
                email,
                name,
            }
            const { $toasted } = context.root
            try {
                await axios({ url: '/me', data, method: 'PATCH' })
                $toasted.success('Your changes has been saved successfully!', {
                    duration: 3000,
                })
                await getUser()
            } catch (e) {
                $toasted.error('Error has occured. Try again', {
                    duration: 3000,
                })
            }
        }

        const avatarSrc = computed(() => {
            if (user.value.avatar) {
                return `data:image/jpeg;base64,${user.value.avatar.toString('base64')}`
            }

            return '//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png'
        })

        return {
            user: user.value,
            handleSubmitForm,
            handleAvatarInput,
            emailRules,
            requiredRule,
            avatarSrc,
        }
    },
}
</script>
