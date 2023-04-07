<template>
	<view @click="toLogin">
		登录
	</view>
</template>

<script setup lang="ts">
	import {
		login
	} from '@/http/api.js'
	const toLogin = () => {
		let params = {
			account: 'system',
			password: 'c4ca4238a0b923820dcc509a6f75849b'
		}
		login(params).then((res: any) => {
			console.log(res, 'res======')
		})
	}
</script>

<style lang="scss">

</style>
