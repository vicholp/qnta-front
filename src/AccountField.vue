<template>
    <div class="flex gap-2 items-center">
        <Icon v-if="icon" :icon="`${ icon }`"/>
        <div class="" v-if="!loading && copy">
            {{ value }}
        </div>
        <div v-else :class="`h-5 w-1/3 bg-white/20 rounded-full ${copy ? 'animate-pulse' : ''}`">
        </div>
        <div v-if="!loading && copy" :class="`ml-auto text-xs ${copied ? 'dark:bg-white dark:text-neutral-800 bg-white text-neutral-800' : 'dark:bg-white/20 dark:text-white/90 bg-white/20 text-white/90'} transition-all duration-500 px-2 py-1 rounded-full `" @click="copyText(value)" >
            {{copied ? 'copiado' : 'copiar' }}
        </div>
        <div v-else :class="`ml-auto text-xs ${copy ? 'animate-pulse' : ''} h-6 w-13 dark:bg-white/20 dark:text-white/90 bg-white/20 text-white/90 px-2 py-1 rounded-full`">
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
    components: {
        Icon
    },
    props: {
        icon: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        copy: {
            type: Boolean,
            default: false
        }

    },
    data() {
        return {
            copied: false,
        };
    },
    methods: {
        copyText(text) {
            navigator.clipboard.writeText(text).then(() => {
                this.copied = true;
                setTimeout(() => {
                    this.copied = false;
                }, 2000);
            });
        }
    }
};
</script>