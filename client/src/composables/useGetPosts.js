import Vue from 'vue';
import VueCompositionAPI, { ref, computed } from '@vue/composition-api'
import axios from 'axios'

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);

export default function useGetPosts () {
    const posts = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    async function search ({ name = '', type = 'all' }) {
        if (isLoading.value && !name) return
        isLoading.value = true
        const url = name ? `/post?title=${name}` : (type === 'all' ? 'post': '/post/me')

        try {
            const { data } = await axios({
                url,
                method: 'GET',
            })
            posts.value = data
        } catch (err) {
            error.value = err
        } finally {
            isLoading.value = false
        }
    }

    return {
        posts: computed(() => posts.value),
        isLoading: computed(() => isLoading.value),
        error: computed(() => error.value),
        search,
    }
}