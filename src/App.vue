<template>

	<AppWrapper
		:cfg="cfg"
		:cfg-menu="cfgMenu"
		:cfg-slots="cfgSlots">

		<template v-slot:header>
		</template>


		<template v-slot:menu>
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</template>

		<template v-slot:list>
		</template>

		<template v-slot:core>
			<router-view/>
		</template>

	</AppWrapper>
	
</template>

<script>

import AppWrapper from '@/components/pebble-ui/AppWrapper.vue'

export default {

	data() {
		return {
			cfg: {},
			cfgMenu: {},
			cfgSlots: {}
		}
	},

	components: {
		AppWrapper
	}

}
</script>