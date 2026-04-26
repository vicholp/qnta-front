<template>
    <div class="blob" 
    :style="
    `height:`+diameter+`px;
    width:`+diameter+`px;
    left: `+h_position+`%;
    bottom: -`+v_position+`%;
    --translation: -`+translation+`%`
    ">
    </div>
</template>

<script>

export default {
    props: {
        diameter: {
            type: Number,
            required: true
        },
        h_position: {
            type: Number,
            required: true
        },
        v_position: {
            type: Number,
            required: true
        },
        translation: {
            type: Number,
            required: true
        },
    },
};
</script>