<template>
  <div class="smart-filter">
    <div class="filter-items">
      <div class="item-row price-row">
        <label for="">Цена</label>
        <div class="price-range">
            <div class="range-inputs">
              <div class="input-cell">
                <input type="text" v-model="priceValue[0]">
              </div>
              <div class="input-cell">
                <input type="text" v-model="priceValue[1]">
              </div>
            </div>
            <div class="range">
              <vue-slider
                :v-if="priceValue[0] > 0 && priceValue[1] > 0"
                @drag-end="filterUpdate" 
                :marks="false"
                :min="parseInt(this.priceData.VALUES.MIN.VALUE)"
                :max="parseInt(this.priceData.VALUES.MAX.VALUE)"
                v-model="priceValue" 
                :enable-cross="false" >
              </vue-slider>
            </div>
        </div>
      </div>
      <div class="item-row" v-for="item in filterItems" :key="item.ID">
        <div class="prop-name">{{ item.NAME }}</div>
        <div class="check-box-row" v-if="item.PROPERTY_TYPE == 'L'" >
          <div class="check-box-input" v-for="valueItem in item.VALUES" :key="valueItem.URL_ID">
            <label :for="valueItem.CONTROL_ID">{{ valueItem.VALUE}}</label>
            <input type="checkbox"
              :id="valueItem.CONTROL_ID"
              :checked="valueItem.CHECKED" 
              v-model="filterCheckBoxValues[valueItem.CONTROL_ID + '|' + valueItem.HTML_VALUE]" 
              @change='filterUpdate'>
            <span>{{ valueItem.ELEMENT_COUNT }}</span>
          </div>
        </div>
        <div class="input-rang-row" v-if="item.PROPERTY_TYPE == 'N'">
            <div class="range-inputs">
              <div class="input-cell">
                <input type="text" v-model="filterRangeValues[item.ID][0]">
              </div>
              <div class="input-cell">
                <input type="text" v-model="filterRangeValues[item.ID][1]">
              </div>
            </div>
            <div class="range">
              <vue-slider
                :v-if="filterRangeValues[item.ID][0] > 0 && filterRangeValues[item.ID][1] > 0"
                @drag-end="filterUpdate" 
                :marks="false"
                :min="parseInt(filterResult.ITEMS[item.ID].VALUES.MIN.VALUE)"
                :max="parseInt(filterResult.ITEMS[item.ID].VALUES.MAX.VALUE)"
                v-model="filterRangeValues[item.ID]" 
                :enable-cross="false" >
              </vue-slider>
            </div>
        </div> 
      </div>
      <div class="button-row">
        <button @click="setFilter">set-filter</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
  props: ['filterData', 'navId'],
  data() {
    return {
      value: 0,
      filterResult: {},
      filterCheckBoxValues: {},
      filterRangeValues: {},
      price: [0, 0]
    }
  },
  created() {
   this.filterResult = this.filterData;
   this.obtainValues();
   this.$nuxt.$on('update-smart-filter', (val) => this.filterResult = val);
  },
  components: {
    VueSlider
  },
  watch: {
  },
  computed:{
    priceValue: {
      get() {
        let price = [];
        let itemValue = this.priceData.VALUES;
        price[0] = parseInt(itemValue.MIN.HTML_VALUE) ? parseInt(itemValue.MIN.HTML_VALUE) : parseInt(itemValue.MIN.VALUE);
        price[1] = parseInt(itemValue.MAX.HTML_VALUE) ? parseInt(itemValue.MAX.HTML_VALUE) : parseInt(itemValue.MAX.VALUE);
        return price;
      },
      set(val) {
        this.price = val;
      }
    },
    filterItems: {
      get() {
        let result = [];
        for (let id in this.filterResult.PROPERTY_ID_LIST) {
          let propId = this.filterResult.PROPERTY_ID_LIST[id];
          let item = this.filterResult.ITEMS[propId]
          if (Object.keys(item.VALUES).length > 0) {
            result.push(item);
          }
        }
      
        return result;
      }
    },
    priceData() {
      let result = {};
      let prices = Object.keys(this.filterResult.PRICES);
      if (prices.length > 0) {
        let priceCode = prices[0];
        if (this.filterResult.ITEMS[priceCode] != undefined) {
          result = this.filterResult.ITEMS[priceCode];
        }
      }
      return result;
    }
  },
  methods: {
    async filterUpdate() {
      let url = 'http://192.168.1.48/api/catalog-filter/' + this.getFilterQuery();
      let response = await this.$axios.$get(url);
  
      this.filterResult = response;
    },
    setFilter() {
      let filterUri = "/catalog/" + this.$route.params.code +"/filter/" + this.filterResult.FILTER_URL;
      let filterParams = '/catalog/' + this.getFilterQuery();

      this.$nuxt.$emit('set-smart-filter', { filterParams, filterUri });

    },
    getCurrentQueryString() {
      let queryParamsArr = [];
      let currentQuery = this.$route.query;

      for (let i in currentQuery) {
          queryParamsArr.push(i + '=' + currentQuery[i]);
      }
      return queryParamsArr.join("&");
    },
    getFilterQuery() {
      let queryParamsArr = ["set_filter=y"];
      let queryString = ""
      let currentQuery = this.$route.query;
    
      for (let i in currentQuery) {
          if (i == this.navId ) continue;

          queryParamsArr.push(i + '=' + currentQuery[i]);
      }

      for (let i in this.filterCheckBoxValues) {
        if (this.filterCheckBoxValues[i]) {
          queryParamsArr.push(i.split('|').join('='));
        }
      }

      if (Object.keys(this.priceData).length > 0) {
        if (this.price[0] > 0)
          queryParamsArr.push(this.priceData.VALUES.MIN.CONTROL_ID  + "=" + this.price[0]);
        if (this.price[1] > 0)
          queryParamsArr.push(this.priceData.VALUES.MAX.CONTROL_ID  + "=" + this.price[1]);
      }

      queryString = queryParamsArr.join("&");
      queryString = this.$route.params.code + "?" + queryString;
     
      return queryString;
    },
    obtainValues() {
      let filterItems = this.filterItems;
      
      for (let i in filterItems) {
        if (filterItems[i].PROPERTY_TYPE == "L") {
          for (let j in filterItems[i].VALUES) {
            let valueItem = filterItems[i].VALUES[j];
            this.filterCheckBoxValues[valueItem.CONTROL_ID + '|' + valueItem.HTML_VALUE] = valueItem.CHECKED;
          } 
        } else if (filterItems[i].PROPERTY_TYPE == "N"){
          let itemValue = this.filterResult.ITEMS[filterItems[i].ID].VALUES;
          let minValue = parseInt(itemValue.MIN.HTML_VALUE) ? parseInt(itemValue.MIN.HTML_VALUE) : parseInt(itemValue.MIN.VALUE);
          let maxValue = parseInt(itemValue.MIN.HTML_VALUE) ? parseInt(itemValue.MIN.HTML_VALUE) : parseInt(itemValue.MAX.VALUE);
          
          this.filterRangeValues[filterItems[i].ID] = [
            minValue,
            maxValue,
          ];
        } 
      }
    
      let prices = Object.keys(this.filterResult.PRICES);

      if (prices.length > 0) {
        let priceCode = prices[0];
        if (this.filterResult.ITEMS[priceCode] != undefined) {
          this.price.min = this.filterResult.ITEMS[priceCode].VALUES.MIN.VALUE;
          this.price.max = this.filterResult.ITEMS[priceCode].VALUES.MAX.VALUE;
        }
      }
    },
    getRangeInterval(min, max, interval) {
      let val = max - min;
      let iLen = (val).toString().length;
    
      let step = 1;
      for(let i = 0 ; i < iLen - 1 ; i++){
        step*=10;
      }

      let res = val * ( interval / 100);
      return res;
    }
  }
}
</script>
<style lang="scss">
  .smart-filter{
    .item-row{
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #ccc;
    }
    .range-inputs{
      display: flex;
    }
  }
</style>