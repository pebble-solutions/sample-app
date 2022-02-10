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
import { mapActions, mapState } from 'vuex'
import App from './js/app/app.js'

import CONFIG from "@/config.json"

export default {

	data() {
		return {
			cfg: CONFIG.cfg,
			cfgMenu: CONFIG.cfgMenu,
			cfgSlots: CONFIG.cfgSlots,
			appController: null,
			pending: {
				elements: true
			}
		}
	},

	computed: {
		...mapState(['elements', 'openedElement'])
	},

	methods: {
		...mapActions(['closeElement'])
	},

	components: {
		AppWrapper,
		AppMenu,
		AppMenuItem
	},

	mounted() {

		this.appController = new App({
			store: this.$store,
			api: CONFIG.api,
			name: CONFIG.name,
			cfg: CONFIG.cfg,
			cfgMenu: CONFIG.cfgMenu,
			cfgSlots: CONFIG.cfgSlots,
			root: this
		});

		this.appController.listElements();
	}

}
</script>