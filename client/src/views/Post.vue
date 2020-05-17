<template>
    <div class="post">
        <v-card v-if="post">
            <v-card-title class="mb-3">
                {{ post.title }}
            </v-card-title>
            <v-card-subtitle>
                {{ post.description }}
            </v-card-subtitle>
            <v-card-text>
                {{ post.content }}
            </v-card-text>
            <v-card-subtitle class="text-right mt-5">
                <div class="mb-4">Author: {{ post.author.name }}</div>
                <v-avatar>
                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
            </v-card-subtitle>
        </v-card>
    </div>
</template>

<script>
// @ is an alias to /src
import { ref } from '@vue/composition-api'
import axios from 'axios'

export default {
    name: 'Post',

    setup(props, context) {
        const post = ref(null)

        async function getPost() {
            try {
                const { $route } = context.root
                const { data } = await axios({
                    url: `/post/${$route.params.id}`,
                    method: 'GET',
                })
                post.value = data
            } catch (err) {
                console.log({ err })
            }
        }

        getPost()

        return {
            post,
        }
    },
    
}
</script>
