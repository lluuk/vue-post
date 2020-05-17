<template>
    <div class="home">
        <template v-if="posts">
            <h1 class="display-1 mb-5 mt-4">Recent posts</h1>
            <v-row class="mx-2">
                <v-col cols="12" lg="4" sm="6" v-for="post in posts" :key="post._id">
                    <v-card :to="`/post/${post._id}`">
                        <v-card-title class="mb-3">
                            {{ post.title }}
                        </v-card-title>
                        <v-card-subtitle>
                            {{ post.description }}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <p>Unfortunately, there is no available posts</p>
        </template>
    </div>
</template>

<script>
// @ is an alias to /src
import useGetPosts from '@/composables/useGetPosts'

export default {
    name: 'Home',
    setup() {
        const { posts, search } = useGetPosts()
        search({})

        return {
            posts,
        }
    },
}
</script>
