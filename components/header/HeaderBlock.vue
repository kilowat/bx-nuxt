<template>
<header class="header">
  <div class="container">
    <div class="top-row">
      <div class="logo-block">
        <Logo />
      </div>
      <div class="right-block">
        <div class="row">
          <div class="search-block">
            <client-only>
              <Search />
            </client-only>
          </div>
          <div class="user-block">
            <div class="user-item">
              <client-only>
                <Favorite />
              </client-only>
            </div>
            <div class="user-item">
              <client-only>
                <SmallBasket />
              </client-only>
              </div>
            <div class="user-item">
              <client-only>
                <AuthLink />
              </client-only>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="phone-block">
            <PhoneNumber />
          </div>
        </div>
      </div>
    </div>
  </div>
  <TopCatalogMenu />
</header>

</template>

<script>
import TopCatalogMenu from '~/components/header/TopCatalogMenu.vue';
import Logo from '~/components/header/Logo.vue';
import Search from '~/components/header/Search.vue';
import AuthLink from '~/components/header/AuthLink.vue';
import SmallBasket from '~/components/header/SmallBasket.vue';
import PhoneNumber from '~/components/PhoneNumber.vue';
import Favorite from '~/components/header/Favorite.vue';

export default {
  components: {
    TopCatalogMenu,
    Logo,
    Search,
    AuthLink,
    SmallBasket,
    PhoneNumber,
    Favorite
  }
}
</script>
<style lang="scss">
.header{
  .top-row{
    align-items: center;
    @include row-flex();
  }
  .logo-block{
    @include col();
    @include size(3);
  }
  .right-block{
    @include col();
    @include size(9); 
  }
  .row{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
  }
  .search-block{
    width: 60%;
  }
  .phone-block{
    font-size: 18px;
  }
  .user-block{
    margin-left: 30px;
    display: flex;
    align-items: center;
  }
  .user-item{
    margin-left: 30px;
    height: 40px;
    display: flex;
    align-items: center;
    &:first-child{
      margin-left: 0;
    }
  }
  .user-link{
    position: relative;
    display: flex;
    padding-top: 9px;
    align-items: flex-end;
    text-decoration: none;
    color: $color-text;
    &:hover{
      color: $color-link-hover;
      .icon{
        fill: $color-primary;
      }
      .count{
        color: #000;
      }
      &.selected .count{
        color: #fff;
      }
    }
     &.selected{
       .count{
         color: #fff;
         background-color: $color-primary;
       }
    }
    .count{
      position: absolute;
      border-radius: 4px;
      background-color: #e9e9e9;
      width: 24px;
      height: 18px;
      z-index: 1;
      display: block;
      text-align: center;
      font-size: 12px;
      line-height: 18px;
      left: 15px;
      top: 0px;
    }
    .icon{

    }
  } 
}

/*
.header{
  .top-row{
    align-items: center;
    @include row-flex();
    .logo-block{
      @include col();
      @include size(3);
    }
    .phone-block{
      @include col();
      @include size(2);
    }
    .search-block{
      @include col();
      @include size(5);
    }
    .user-block{
      @include col();
      @include size(2);
    }
  }
}
*/
</style>