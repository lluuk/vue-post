<template>
    <div style="position: relative;">
        <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
            v-model="model"
            :items="posts"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="Description"
            item-value="API"
            placeholder="Find a post"
            return-object
            @blur="handleBlur"
            @focus="handleFocus"
        />
        <v-divider></v-divider>
        <v-expand-transition>
            <v-list
                v-if="model && posts.length && focused"
                class="blue lighten-3"
                style="position: absolute; width: 100%"
            >
                <v-list-item v-for="post in posts" :key="post._id" :to="`/post/${post._id}`">
                    <v-list-item-content>
                        <v-list-item-title v-text="post.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-expand-transition>
    </div>
</template>

<script>
import { reactive, watch, toRefs } from '@vue/composition-api'
import useGetPosts from '@/composables/useGetPosts'
export default {
    name: 'TheSearch',

    setup() {
        const state = reactive({
            model: '',
            focused: false,
        })

        const { posts, search, isLoading } = useGetPosts()

        function handleFocus() {
            state.focused = true
        }

        function handleBlur() {
            state.focused = false
        }

        watch(
            () => state.model,
            () => search({ name: state.model })
        )

        return {
            ...toRefs(state),
            search,
            posts,
            isLoading,
            handleFocus,
            handleBlur,
        }
    },
}
</script>
