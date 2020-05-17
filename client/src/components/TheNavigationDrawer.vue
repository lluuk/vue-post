<template>
    <v-navigation-drawer v-model="visible" :clipped="$vuetify.breakpoint.lgAndUp" app>
        <v-list dense>
            <template v-for="item in items">
                <v-list-group
                    v-if="item.children"
                    :key="item.text"
                    v-model="item.model"
                    :prepend-icon="item.model ? item.icon : item['icon-alt']"
                    append-icon=""
                    >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="(child, i) in item.children"
                        :key="i"
                        link
                        :to="child.link"
                    >
                        <v-list-item-action v-if="child.icon">
                            <v-icon>{{ child.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ child.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-list-item v-else :key="item.text" link :to="item.link">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import useGetPosts from '@/composables/useGetPosts'
export default {
    name: 'TheNavigationDrawer',
    setup() {
        const visible = ref(false)
        const items = ref([
            { icon: 'mdi-home', text: 'Home', link: '/' },
            { icon: 'mdi-account-cog', text: 'Profile', link: '/profile' },
            {
                icon: 'mdi-chevron-up',
                'icon-alt': 'mdi-chevron-down',
                text: 'My Posts',
                model: false,
                children: [],
            },
        ])

        const { posts, search } = useGetPosts()

        onMounted(async () => {
            await search({ type: 'me' })
            const postsItems = items.value[2].children
            posts.value.map(post => {
                const postItem = {
                    icon: 'mdi-post',
                    text: post.title,
                    link: `/post/${post._id}`,
                }
                postsItems.push(postItem)
            })
        })

        return {
            items: items.value,
            visible,
        }
    },
}
</script>