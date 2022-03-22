<template>
    <AppModal id="elementProperties" title="Propriétés" :cancel-btn="true" :submit-btn="true" :pending="pending" @submit="record">
        <div class="mb-3">
            <label for="element_name" class="form-label">Nom</label>
            <input type="text" class="form-control" id="element_name" name="name" v-model="tmpElement.name">
        </div>

        <div class="row g-3">
            <div class="col mb-3">
                <label for="element_qt" class="form-label">Quantité</label>
                <input type="text" class="form-control" id="element_qt" name="qt" v-model="tmpElement.qt">
            </div>
            <div class="col mb-3">
                <label for="element_amt" class="form-label">Montant</label>
                <input type="text" class="form-control" id="element_amt" name="amt" v-model="tmpElement.amt">
            </div>
        </div>

        <div class="mb-3">
            <label for="element_description" class="form-label">Description</label>
            <textarea rows="6" class="form-control" id="element_description" name="description" v-model="tmpElement.description"></textarea>
        </div>
    </AppModal>
</template>

<script>

import AppModal from '@/components/pebble-ui/AppModal.vue'

import {mapState} from 'vuex'

export default {
    data() {
        return {
            pending: false
        }
    },

    computed: {
        ...mapState(['openedElement', 'tmpElement'])
    },

    components: {
        AppModal
    },

    methods: {
        record() {
            
        }
    },

    beforeMount() {
        this.$app.makeTmpElement(this);
    }
}
</script>