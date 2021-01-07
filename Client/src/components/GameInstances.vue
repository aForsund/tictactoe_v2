<template>
    <div>
        <h1 class="title">Game Instances</h1>
        <div v-if="socket">
            <GameInstance v-for="(instance, index) in socket.collectionIndex" :key="index" :instanceId="instance"></GameInstance>
        </div>
        
    </div>
</template>

<script>
import GameInstance from '@/components/GameInstance.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        GameInstance
    },
    computed: {
        ...mapGetters("user", ["socket"]),
    },
}
</script>



