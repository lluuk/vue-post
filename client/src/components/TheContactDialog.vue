<template>
    <v-dialog v-model="visible" width="800px">
        <v-card>
            <v-card-title class="grey darken-2">Create post</v-card-title>
            <v-container>
                <v-form>
                    <v-row class="mx-2">
                        <v-col cols="12">
                            <v-text-field
                                prepend-icon="mdi-signature-text"
                                label="Post title"
                                :rules="requiredRule"
                                v-model="title"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                prepend-icon="mdi-text"
                                label="Post description"
                                :auto-grow="true"
                                rows="1"
                                v-model="description"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                prepend-icon="mdi-text"
                                label="Post content"
                                :auto-grow="true"
                                rows="1"
                                v-model="content"
                            />
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
            <v-card-actions>
                <v-spacer />
                <v-btn text color="primary" @click="visible = false">Cancel</v-btn>
                <v-btn text @click="handleSubmit">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios'
import { ref, reactive, toRefs } from '@vue/composition-api'
import { requiredRule } from '@/utils/validators'
export default {
    name: 'TheGuestLayout',
    setup(props, context) {
        const visible = ref(false)
        const model = reactive({
            title: '',
            description: '',
            content: '',
        })

        async function handleSubmit() {
            const { $toasted } = context.root
            try {
                await axios({
                    url: '/post',
                    data: model,
                    method: 'POST',
                })
                visible.value = false
                context.emit('add-post')
                $toasted.success('Post added!', { duration: 3000 })
            } catch (e) {
                $toasted.error(e.message)
            }
        }

        return {
            visible,
            requiredRule,
            handleSubmit,
            ...toRefs(model),
        }
    },
}
</script>
