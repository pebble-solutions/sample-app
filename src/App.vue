<template>

	<AppWrapper
		:cfg="cfg"
		:cfg-menu="cfgMenu"
		:cfg-slots="cfgSlots">

		<template v-slot:header>
			<div class="mx-2" v-if="openedElement">
				<router-link to="/" custom v-slot="{ navigate, href }">
					<a class="btn btn-dark" :href="href" @click="navigate">
						<i class="bi bi-arrow-left"></i>
					</a>
				</router-link>
				<button class="btn btn-dark">
					<i class="bi bi-file-earmark me-1"></i>
					{{openedElement.name}}
				</button>
			</div>
		</template>


		<template v-slot:menu>
			<AppMenu>
				<AppMenuItem href="/" look="dark" icon="bi bi-house">Home</AppMenuItem>
				<AppMenuItem href="/about" look="dark" icon="bi bi-app">About</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:list>
			<AppMenu>
				<AppMenuItem :href="'/element/'+el.id" icon="bi bi-file-earmark" v-for="el in elements" :key="el.id">{{el.name}}</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:core>
			<div class="px-2 bg-light">
				<router-view/>
			</div>
		</template>

	</AppWrapper>
	
</template>

<script>

import AppWrapper from '@/components/pebble-ui/AppWrapper.vue'
import AppMenu from '@/components/pebble-ui/AppMenu.vue'
import AppMenuItem from '@/components/pebble-ui/AppMenuItem.vue'
import { mapState } from 'vuex'
import axios from 'axios'

import CONFIG from "@/config.json"

export default {

	data() {
		return {
			cfg: CONFIG.cfg,
			cfgMenu: CONFIG.cfgMenu,
			cfgSlots: CONFIG.cfgSlots
		}
	},

	computed: {
		...mapState(['elements', 'openedElement'])
	},

	methods: {
		/**
		 * Ferme l'élément ouvert dans le state
		 */
		closeElement() {
			this.$store.dispatch('closeElement');
		}
	},

	components: {
		AppWrapper,
		AppMenu,
		AppMenuItem
	},

	mounted() {
		let ax = axios.create({
            baseURL: CONFIG.api.baseURL
        });

        ax.get('/'+CONFIG.api.elements+'/GET/list')
        .then((resp) => {
            let apiResp = resp.data;

            if (apiResp.status === 'OK') {
                this.$store.commit('refreshElements', apiResp.data);
            }
            else {
                alert(apiResp.message);
                console.error(apiResp);
            }
        })
        .catch((error) => {
            alert(error);
            console.error(error);
        });
	}

}
</script>