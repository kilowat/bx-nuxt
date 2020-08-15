<template>
    <div class="wrapper">
      <nav class="top-nav catalog-menu">
        <ul class="catalog-top-menu">
          <li class="has-child" v-for="item in treeItems" :key="item.ID">
            <nuxt-link :to="'/catalog/' + item.CODE" title="Детский транспорт">{{ item.NAME }}</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
</template>
<script>
export default {
  computed:{
    treeItems(){
      return this.$store.getters['catalog/sectionTree'];
    }
  }
}
</script>
<style lang="scss" scoped>
header .catalog-top-menu{
  background-color: #f11516;
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-content: space-around;
  height: 50px;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 15px;
  >li{
    text-align: center;
    align-items: center;
    //flex-basis: 100%;
    position: relative;
    >a{
      justify-content: center;
      display: flex;
      align-items: center;
      height: 50px;
      color: #fff;
      text-decoration: none;
      line-height: 1.1em;
      padding-left:10px;
      padding-right: 10px;
      &:hover, &.selected{
        background-color: #cf1617;
      }
    }
    .child-item{
      box-shadow: 0 0 3px 0 rgba(0,0,0,0.2);
      background-color: #fff;
      display: none;
      position: absolute;
      list-style: none;
      padding: 0;
      min-width: 200px;
      padding-top: 15px;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 20px;
      left: -10px;
      z-index: 1000;
      li{
        margin-top: 7px;
        margin-bottom: 7px;
        text-align: left;
        line-height: 1.2rem;
        a{
          font-size: 0.9rem;
          color: #555555;
          text-decoration: none;
          &:hover{
            color: $color-red;
          }
        }
      }
    }
  }
}

.top-fixed-link{
  position: relative;
  cursor: pointer;
  &.selected{
    .top-mini-menu{
      display: block;
    }
  }
}
.top-mini-menu{
  display: none;
  width: 210px;
  position: absolute;
  list-style: none;
  padding: 15px;
  box-shadow: 1px 2px 4px 0px rgba(0,0,0,.4);
  z-index: 10;
  background-color: #fff;
  li{
    margin-bottom: 5px;
    margin-top: 5px;
    a{
      text-decoration: none;
    }
  }
}

</style>