<template>

	<AppWrapper
		:cfg="cfg"
		:cfg-menu="cfgMenu"
		:cfg-slots="cfgSlots">

		<template v-slot:header>
			Mon document par défaut
		</template>


		<template v-slot:menu>
			<AppMenu>
				<AppMenuItem href="/" look="dark" icon="bi bi-house">Home</AppMenuItem>
				<AppMenuItem href="/about" look="dark" icon="bi bi-app">About</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:list>
			<AppMenu>
				<AppMenuItem href="/" icon="bi bi-file-earmark">Élément 1</AppMenuItem>
				<AppMenuItem href="/" icon="bi bi-file-earmark">Élément 2</AppMenuItem>
				<AppMenuItem href="/" icon="bi bi-file-earmark">Élément 3</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:core>
			<router-view/>
		</template>

	</AppWrapper>
	
</template>

<script>

import AppWrapper from '@/components/pebble-ui/AppWrapper.vue'
import AppMenu from '@/components/pebble-ui/AppMenu.vue'
import AppMenuItem from '@/components/pebble-ui/AppMenuItem.vue'

export default {

	data() {
		return {
			cfg: {
				moduleLabel: 'Sample module',
				aside: false,
				app_mode: "standalone"
			},
			cfgMenu: {},
			cfgSlots: {}
		}
	},

	components: {
		AppWrapper,
		AppMenu,
		AppMenuItem
	}

}
</script>