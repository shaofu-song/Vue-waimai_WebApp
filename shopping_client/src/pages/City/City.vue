<template>
  <div class="city_body">
		<HeaderTop>
			<a class="back" @click="$router.back()" slot="left">
        <i class="iconfont icon-arrow_left"></i>
      </a>
      <span class="header_title" slot="midtitle">
       <span class="header_title_text ellipsis">{{cityNow.city_nm || '正在定位中...'}}</span>
      </span>
    </HeaderTop>
		<div class="city_list" ref="city_list">
			<div class="city_hot">
				<h2>热门城市</h2>
				<ul class="clearfix">
					<li v-for="item in cities.hotList" :key="item.id" @click="handleToCity(item.nm , item.id)">{{ item.nm }}</li>
				</ul>
			</div>
			<div class="city_sort" ref="city_sort">
				<div v-for="item in cities.cityList" :key="item.index">
					<h2 ref="city_sort">{{ item.index }}</h2>
					<ul>
						<li v-for="itemList in item.list" :key="itemList.id" @click="handleToCity(itemList.nm , itemList.id)">{{ itemList.nm }}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="city_index">
			<ul>
				<li v-for="(item,index) in cities.cityList" :key="item.index" @click="handleToIndex(index)">{{ item.index }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import {mapState} from 'vuex'

	export default {
		components: {
			HeaderTop,
		},
		computed: {
			...mapState(['cities', 'cityNow'])
		},
		mounted () {
			this.$store.dispatch('getCities')
		},
		methods: {
			handleToIndex(index) {
				var h2 = this.$refs.city_sort;
				this.$refs.city_list.scrollTop = h2[index].offsetTop;
			},
			handleToCity(city_nm, city_id) {
				const cityNow = {city_id, city_nm}
				window.localStorage.setItem('cityNow', JSON.stringify(cityNow))
				this.$store.dispatch('getCityNow',cityNow)
			}
		}

  }
</script>

<style scoped>
 .city_body {
		margin-top: 45px;
		display: flex;
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}

	.city_body .city_list {
		flex: 1;
		overflow: auto;
		background: #FFF5F0;
	}

	.city_body .city_list::-webkit-scrollbar {
		background-color: transparent;
		width: 0;
	}

	.city_body .city_hot {
		margin-top: 20px;
	}

	.city_body .city_hot h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	}

	.city_body .city_hot ul li {
		float: left;
		background: #fff;
		width: 29%;
		height: 33px;
		margin-top: 15px;
		margin-left: 3%;
		padding: 0 4px;
		border: 1px solid #e6e6e6;
		border-radius: 3px;
		line-height: 33px;
		text-align: center;
		box-sizing: border-box;
	}

	.city_body .city_sort div {
		margin-top: 20px;
	}

	.city_body .city_sort h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	}

	.city_body .city_sort ul {
		padding-left: 10px;
		margin-top: 10px;
	}

	.city_body .city_sort ul li {
		line-height: 30px;
		line-height: 30px;
	}

	.city_body .city_index {
		width: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		border-left: 1px #e6e6e6 solid;
	}
	.city_body .city_index ul li{
		margin-top: 7px;
	}
	.clearfix:after{ 
		content:""; 
		display: block; 
		clear:both;
	}
	.back{
		position: absolute;
		top: 10px;
		left: 0;
	}
        
	.icon-arrow_left{
		display: block;
		padding: 5px;
		font-size: 20px;
		color: #fff;
	}
          
</style>