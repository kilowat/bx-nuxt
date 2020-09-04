<template>
  <div class="smart-filter">
    <div class="filter-block" v-if="priceData.VALUES != undefined || filterItems.length > 0">
      <div class="filter-items">
        <div class="item-row price-row">
          <div class="item-name">Цена</div>
          <div class="price-range" v-if="priceData.VALUES != undefined">
              <div class="range-inputs">
                <div class="input-cell">
                  <input class="text-input" type="text" v-model="priceValue[0]">
                </div>
                <div class="input-cell">
                  <input class="text-input" type="text" v-model="priceValue[1]">
                </div>
              </div>
              <div class="range">
                <vue-slider
                  :v-if="priceValue[0] > 0 && priceValue[1] > 0"
                  @drag-end="filterUpdate" 
                  :marks="false"
                  :min="parseInt(priceData.VALUES.MIN.VALUE)"
                  :max="parseInt(priceData.VALUES.MAX.VALUE)"
                  v-model="priceValue" 
                  :enable-cross="false" >
                </vue-slider>
              </div>
          </div>
        </div>
        <div class="item-row" v-for="item in filterItems" :key="item.ID">
          <div class="item-name">{{ item.NAME }}</div>
          <div class="check-box-row" v-if="item.PROPERTY_TYPE == 'L'" >
            <div class="check-box-input" v-for="valueItem in item.VALUES" :key="valueItem.URL_ID">
              <div class="checkbox">
                <input type="checkbox"
                  :id="valueItem.CONTROL_ID"
                  :checked="valueItem.CHECKED" 
                  v-model="filterCheckBoxValues[valueItem.CONTROL_ID + '|' + valueItem.HTML_VALUE]" 
                  @change='filterUpdate'>
                <label :for="valueItem.CONTROL_ID"><span></span>
                  {{ valueItem.VALUE}}
                  <i class="filter-count">({{ valueItem.ELEMENT_COUNT }})</i>
                </label>
              </div>
            </div>
          </div>
          <div class="input-rang-row" v-if="item.PROPERTY_TYPE == 'N'">
              <div class="range-inputs">
                <div class="input-cell">
                  <input class="text-input" type="text" v-model="filterRangeValues[item.ID][0]">
                </div>
                <div class="input-cell">
                  <input class="text-input" type="text" v-model="filterRangeValues[item.ID][1]">
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
          <button class="btn btn-primary" @click="setFilter">Применить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
  props: ['filterData'],
  data() {
    return {
      loading: false,
      value: 0,
      filterResult: {},
      filterCheckBoxValues: {},
      filterRangeValues: {},
      price: [0, 0]
    }
  },
  mounted() {
    this.filterResult = this.filterData;
    this.obtainValues();
  },
  components: {
    VueSlider
  },
  watch: {
  },
  computed:{
    priceValue: {
      get() {
        return this.price;
      },
      set(val) {
        this.price = val;
      }
    },
    filterApiParamsUrl() {
      let sectionPath = this.$route.path.split('/filter/')[0];

      if (sectionPath.length == 0) {
        sectionPath = this.$route.path;
      }
      
      sectionPath += '/';
      sectionPath = sectionPath.replace('//', '/');

      let url = this.$api(sectionPath + '?' + this.getFilterQuery());
      url = url.replace("catalog", 'catalog-filter');
     
      return url;
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
      let result = {}
      if (this.filterResult.PRICES !=undefined) {
        let prices = Object.keys(this.filterResult.PRICES);
        if (prices.length > 0) {
          let priceCode = prices[0];
          if (this.filterResult.ITEMS[priceCode] != undefined) {
            result = this.filterResult.ITEMS[priceCode];
          }
        }
      }

      return result;
    }
  },
  methods: {
    async loadData() {
      let url = this.$route.fullPath;
      url = this.$api(url);
      url = url.replace('catalog', 'catalog-filter');
      let response = await this.$axios.$get(url);
      this.filterResult = response;
      this.obtainValues();
    },
    async filterUpdate() {
      let response = await this.$axios.$get(this.filterApiParamsUrl);
      this.filterResult = response;
    },
    setFilter() {
      let sectionPath = this.$route.path.split('/filter/')[0];
      if (sectionPath.length == 0) {
        sectionPath = this.$route.path;
      }
      
      let filterUri = '';

      if (this.filterResult.FILTER_URL.length > 0) {
        filterUri = sectionPath +"/filter/" + this.filterResult.FILTER_URL + '/';
      } else {
        filterUri = sectionPath + '/';
      }

      filterUri = filterUri + "?" + this.getCurrentQueryString();
      
      let filterParams = sectionPath + '/' + '?' + this.getFilterQuery();
     
      filterParams = filterParams.replace('//', '/');
      filterUri = filterUri.replace('//', '/');

      this.$emit('set-smart-filter', { filterParams, filterUri });
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
      let queryParamsArr = [];
      let queryString = ""
      let currentQuery = this.$route.query;

      queryParamsArr.push('set_filter=y');

      for (let i in currentQuery) {
        if (currentQuery[i].indexOf('page') !== -1) continue;
       
        queryParamsArr.push(i + '=' + currentQuery[i]);
      }

      for (let i in this.filterCheckBoxValues) {
        if (this.filterCheckBoxValues[i]) {
          queryParamsArr.push(i.split('|').join('='));
        }
      }
   
      if (Object.keys(this.priceData).length > 0) {
        if (this.price[0] > 0) {
          queryParamsArr.push(this.priceData.VALUES.MIN.CONTROL_ID  + "=" + this.price[0]);
        }

        if (this.price[1] > 0) {
          queryParamsArr.push(this.priceData.VALUES.MAX.CONTROL_ID  + "=" + this.price[1]);
        }
      }

      let rangeValues = this.filterRangeValues;
     
      for(let i in rangeValues) {
        if (rangeValues[i][0] > 0) {
          queryParamsArr.push(this.filterResult.ITEMS[i].VALUES.MIN.CONTROL_ID + '=' + rangeValues[i][0]);
        }
        if (rangeValues[i][1] > 0) {
          queryParamsArr.push(this.filterResult.ITEMS[i].VALUES.MAX.CONTROL_ID + '=' + rangeValues[i][1]);
        }
      }
      
      queryString = queryParamsArr.join("&");
     
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
          let maxValue = parseInt(itemValue.MAX.HTML_VALUE) ? parseInt(itemValue.MAX.HTML_VALUE) : parseInt(itemValue.MAX.VALUE);
          
          this.filterRangeValues[filterItems[i].ID] = [
            minValue,
            maxValue,
          ];
        } 
      }

      if (this.filterResult.PRICES != undefined) {
        let prices = Object.keys(this.filterResult.PRICES);

        if (prices.length > 0) {
          let priceCode = prices[0];
          if (this.filterResult.ITEMS[priceCode] != undefined) {
            let itemValue = this.priceData.VALUES;
            this.price[0] = parseInt(itemValue.MIN.HTML_VALUE) ? parseInt(itemValue.MIN.HTML_VALUE) : parseInt(itemValue.MIN.VALUE);
            this.price[1] = parseInt(itemValue.MAX.HTML_VALUE) ? parseInt(itemValue.MAX.HTML_VALUE) : parseInt(itemValue.MAX.VALUE);
          }
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
    .item-name{
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 15px;
    }
    .check-box-input {
      margin-top: 8px;
    }
    .filter-count{
      font-style: normal;
    }
    .range-inputs{
      display: flex;
      flex-wrap: wrap;
      margin-left: -15px;
      margin-right: -15px;
      .input-cell{
        margin-left: 15px;
        margin-right: 15px;
        width: calc(50% - 30px)
      }
    }
  }
</style>