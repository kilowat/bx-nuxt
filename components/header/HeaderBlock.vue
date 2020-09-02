<template>
<header class="header">
  <div class="container">
    <div class="top-row">
      <div class="logo-block">
        <Logo />
      </div>
      <div class="phone-block">
        <PhoneNumber />
      </div>
      <div class="search-block">
        <Search />
      </div>
      <div class="user-block">
        <div class="user-item"><AuthLink /></div>
        <div class="user-item"><SmallBasket /></div>
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
import CompareCount from '~/components/header/CompareCount.vue';
import AuthLink from '~/components/header/AuthLink.vue';
import SmallBasket from '~/components/basket/SmallBasket.vue';
import PhoneNumber from '~/components/PhoneNumber.vue';

export default {
  components: {
    TopCatalogMenu,
    Logo,
    Search,
    CompareCount,
    AuthLink,
    SmallBasket,
    PhoneNumber
  }
}
</script>
<style lang="scss">

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
</style>