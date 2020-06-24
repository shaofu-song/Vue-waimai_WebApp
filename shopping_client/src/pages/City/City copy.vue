<template>
  <div>
    <HeaderTop>
      <!-- <div class="header_search" slot="left">
        
          <i class="iconfont icon-jiantou2"></i>
      
      </div> -->
      <div class="header_title" slot="midtitle">
        <span class="header_title_text ellipsis">正在定位中
          <i class="iconfont icon-xuanxiang"></i>
        </span>
      </div>
    </HeaderTop>
    <mt-index-list style="margin-top: 48px" v-for="(item, index) in cityList" :key="index">
      <mt-index-section index="item.index">
        <mt-cell title="itemList.nm" v-for="itemList in item.list" :key="itemList.id"></mt-cell>
      </mt-index-section>
    </mt-index-list>
		<a href="javascript:" class="go_back" @click="$router.back()">
			<i class="iconfont icon-jiantou2"></i>
		</a>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import axios from 'axios'

	export default {

    components: {
      HeaderTop
    },
    data() {
			return {
				cityList: [],
				hotList: [],
				// isLoading: true
			}
    },
    
    mounted () {
      axios.get('/api/cityList').then((res) => {
        var msg = res.data.msg;
					if (msg === 'ok') {
            var cities = res.data.data.cities;
            console.log(cities)
            var {cityList, hotList } = this.formatCityList(cities);
            this.cityList = cityList;
            this.hotList = hotList;
            // console.log(this.cityList)
            // console.log(this.hotList)
        }
      })
    },
    methods: {
			formatCityList(cities) {
				var cityList = [];
				var hotList = [];

				for (var i = 0; i < cities.length; i++) {
					if (cities[i].isHot === 1) {
						hotList.push(cities[i]);
					}
				}

				for (var i = 0; i < cities.length; i++) {
					var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
					if (toCom(firstLetter)) { //新添加index
						cityList.push({
							index: firstLetter,
							list: [{
								nm: cities[i].nm,
								id: cities[i].id
							}]
						});
					} else { //累加到已有index中
						for (var j = 0; j < cityList.length; j++) {
							if (cityList[j].index === firstLetter) {
								cityList[j].list.push({
									nm: cities[i].nm,
									id: cities[i].id
								});
							}
						}
					}
				}

				cityList.sort((n1, n2) => {
					if (n1.index > n2.index) {
						return 1;
					} else if (n1.index < n2.index) {
						return -1;
					} else {
						return 0;
					}
				});



				function toCom(firstLetter) {
					for (var i = 0; i < cityList.length; i++) {
						if (cityList[i].index === firstLetter) {
							return false;
						}
					}
					return true;
				}

				return {
					cityList,
					hotList
				};

      },
    }

  }

</script>

<style scoped>
.city_hot h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	}
  .city_hot ul li {
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
	.go_back {
		position: absolute;
		top: 5px;
		left: 5px;
		width: 30px;
		height: 30px;
	}
	.go_back .iconfont{
		font-size: 20px;
		color: #999;
	}
</style>