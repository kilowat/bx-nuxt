<template>
  <div class="pagination-wrapper" v-if="Object.keys(pages).length > 0">
    <ul :class="containerClass" v-if="!noLiSurround">
        <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
          <a @click="selectFirstPage($event)" @keyup.enter="selectFirstPage($event)" :class="pageLinkClass" :tabindex="firstPageSelected() ? -1 : 0" v-html="firstButtonText"></a>
        </li>

        <li v-if="!(firstPageSelected() && hidePrevNext)" :class="[prevClass, firstPageSelected() ? disabledClass : '']">
          <a @click="prevPage($event)" @keyup.enter="prevPage($event)" :class="prevLinkClass" :tabindex="firstPageSelected() ? -1 : 0" v-html="prevText"></a>
        </li>

        <li v-for="page in pages" :class="[pageClass, page.selected ? activeClass : '', page.disabled ? disabledClass : '', page.breakView ? breakViewClass: '']">
          <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass]" tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
          <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
          <a v-else :href="getLink(page.index + 1)" @click="handlePageSelected(page.index + 1, $event)" @keyup.enter="handlePageSelected(page.index + 1, $event)" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
        </li>

        <li v-if="!(lastPageSelected() && hidePrevNext)" :class="[nextClass, lastPageSelected() ? disabledClass : '']">
          <a @click="nextPage($event)" @keyup.enter="nextPage($event)" :class="nextLinkClass" :tabindex="lastPageSelected() ? -1 : 0" v-html="nextText"></a>
        </li>

        <li v-if="firstLastButton" :class="[pageClass, lastPageSelected() ? disabledClass : '']">
          <a @click="selectLastPage($event)" @keyup.enter="selectLastPage($event)" :class="pageLinkClass" :tabindex="lastPageSelected() ? -1 : 0" v-html="lastButtonText"></a>
        </li>
      </ul>

      <div :class="containerClass" v-else>
        <a v-if="firstLastButton" @click="selectFirstPage($event)" @keyup.enter="selectFirstPage($event)" :class="[pageLinkClass, firstPageSelected() ? disabledClass : '']" tabindex="0" v-html="firstButtonText"></a>
        <a v-if="!(firstPageSelected() && hidePrevNext)" @click="prevPage($event)" @keyup.enter="prevPage($event)" :class="[prevLinkClass, firstPageSelected() ? disabledClass : '']" tabindex="0" v-html="prevText"></a>
        <template v-for="page in pages">
          <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass, page.disabled ? disabledClass : '']" tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
          <a v-else-if="page.disabled" :class="[pageLinkClass, page.selected ? activeClass : '', disabledClass]" tabindex="0">{{ page.content }}</a>
          <a v-else @click="handlePageSelected(page.index + 1, $event)" @keyup.enter="handlePageSelected(page.index + 1, $event)" :class="[pageLinkClass, page.selected ? activeClass : '']" tabindex="0">{{ page.content }}</a>
        </template>
        <a v-if="!(lastPageSelected() && hidePrevNext)" @click="nextPage($event)" @keyup.enter="nextPage($event)" :class="[nextLinkClass, lastPageSelected() ? disabledClass : '']" tabindex="0" v-html="nextText"></a>
        <a v-if="firstLastButton" @click="selectLastPage($event)" @keyup.enter="selectLastPage($event)" :class="[pageLinkClass, lastPageSelected() ? disabledClass : '']" tabindex="0" v-html="lastButtonText"></a>
      </div>    
  </div>
 
</template>

<script>

export default {
  props: {
    value: {
      type: Number
    },
    navId: {
      type: String
    },
    pageCount: {
      type: Number,
      required: true
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => { }
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: 'Prev'
    },
    nextText: {
      type: String,
      default: 'Next'
    },
    breakViewText: {
      type: String,
      default: '…'
    },
    containerClass: {
      type: String
    },
    pageClass: {
      type: String
    },
    pageLinkClass: {
      type: String
    },
    prevClass: {
      type: String
    },
    prevLinkClass: {
      type: String
    },
    nextClass: {
      type: String
    },
    nextLinkClass: {
      type: String
    },
    breakViewClass: {
      type: String
    },
    breakViewLinkClass: {
      type: String
    },
    activeClass: {
      type: String,
      default: 'active'
    },
    disabledClass: {
      type: String,
      default: 'disabled'
    },
    noLiSurround: {
      type: Boolean,
      default: false
    },
    firstLastButton: {
      type: Boolean,
      default: false
    },
    firstButtonText: {
      type: String,
      default: 'First'
    },
    lastButtonText: {
      type: String,
      default: 'Last'
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  beforeUpdate() {
    if (this.forcePage === undefined) return
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  computed: {
    selected: {
      get: function() {
        return this.value || this.innerValue
      },
      set: function(newValue) {
        this.innerValue = newValue
      }
    },
    pages: function () {
      let items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
          items[index] = page
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)
        let setPageItem = index => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
          items[index] = page
        }
        let setBreakView = index => {
          let breakView = {
            disabled: true,
            breakView: true
          }
          items[index] = breakView
        }
        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        }
        // 2nd - loop thru selected range
        let selectedRangeLow = 0;
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }
        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i);
        }
        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1)
        }
        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }
        // 3rd - loop thru high end of margin pages
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i);
        }
      }
      return items
    }
  },
  data() {
    return {
      innerValue: 1,
    }
  },
  methods: {
    getLink(idx) {
      let pageNumber = parseInt(idx);
      let queryString = ""
      let currentQuery = Object.assign({}, this.$route.query);
      let queryParamsArr = [];
      currentQuery[this.navId] = 'page-' + idx;

      for (let i in currentQuery) {
          queryParamsArr.push(i + '=' + currentQuery[i]);
      }

      queryString = queryParamsArr.join("&");
     
      return this.$route.path + "?" +queryString;
    },
    handlePageSelected(selected, event) {
      if (event)
        event.preventDefault()

      if (this.selected === selected) return
      this.innerValue = selected
      this.$emit('input', selected)

      let queryParam = {};
      queryParam[this.navId] = 'page-' + selected;

      this.clickHandler({
        id: selected,
        queryParam: queryParam
      });
    },
    prevPage(event) {
      if (event)
        event.preventDefault()
      if (this.selected <= 1) return
      this.handlePageSelected(this.selected - 1, event)
    },
    nextPage(event) {
      if (event)
        event.preventDefault()
      if (this.selected >= this.pageCount) return
      this.handlePageSelected(this.selected + 1, event)
    },
    firstPageSelected() {
      return this.selected === 1
    },
    lastPageSelected() {
      return (this.selected === this.pageCount) || (this.pageCount === 0)
    },
    selectFirstPage(event) {
      if (event)
        event.preventDefault()
      if (this.selected <= 1) return
      this.handlePageSelected(1, event)
    },
    selectLastPage(event) {
      if (event)
        event.preventDefault()
      if (this.selected >= this.pageCount) return
      this.handlePageSelected(this.pageCount, event)
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
.pagenation{
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
  li{
    margin-left: 6px;
    margin-right: 6px;
    display:inline-block;
    vertical-align: middle;
  }
}
</style>