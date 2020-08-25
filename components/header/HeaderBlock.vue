<template>
<header class="header">
  <div class="header-container">
    <div class="container">
      <div class="header-top">
        <Logo />
         <PhoneNumber />
        <div class="right-block">
          <Search />
          <div class="user-block">
            <CompareCount />
          </div>
          <div class="user-block user-lk">
            <!--start user menu component-->
            <AuthLink />
            <!--end user menu component-->
          </div>
          <div class="user-block top-cart-block">
            <!--start component top cart-->
            <SmallBasket />
            <!--end component top cart-->
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
  .top-nav{
    @include breakpoint(max-width 980px){
      display: none;
    }
  }
  .header-container{
    @include breakpoint(max-width 980px){
      margin-top: 0;
      top:0;
      position: fixed;
      width: 100%;
      z-index: 10000;
      background-color: #fff;
      box-shadow: 0px 0px 4px 0px rgba(0,0,0,.2);
      height: 50px;
      position: fixed;
    }
  }
  .header-top{
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include breakpoint(max-width 980px){
      margin-top: 0;
      height: 50px;
    }
    .logo{
      display: flex;
      @include breakpoint(max-width 980px){
        img{
          display: none;
        }
      }
      .phone-block{
        margin-left: 15px;
        margin-right: 15px;
        display: flex;
        align-items: center;
        @include breakpoint(max-width 1180px){display: none;}
        .phone-ico{
          margin-right: 10px;
        }
        .phone-text{
          text-transform: uppercase;
          font-size: 20px;
          font-weight: bold;
          color: #000;
        }
        @include breakpoint(max-width 980px){display: none;}
      }
    }
    .right-block{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .top-nav-fixed-block{
        margin-right: 15px;
        align-items: center;
        display: none;
        .top-fixed-link{
          margin-left: 5px;
          margin-right: 5px;
          &:hover{
              .ic-top-menu-3{
                background-position-y: 100%;
              }
              .top-mini-menu{
                display: block;
                &:before{
                  display: block;
                  position: absolute;
                  width: 100%;
                  height: 20px;
                  top: -20px;
                  left: 0;
                  content: "";
                  background-color: transparent;
                }
                &:hover{
                  display: block;
                }
              }
          }
          .icon-wrapper{
            height: 48px;
            width: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f11516;
            border-radius: 100%;
            border: 2px solid #f11516;
          }
        }
      }
      .search-block{
        max-width: 280px;
        min-width: 250px;
        margin-right: 10px;
        @include breakpoint(max-width 980px){
          min-width: 40px;
          margin: 0;
          display: none;
          .search-input{
            display: none;
          }
        }
      }
      .user-block{
        margin-left: 10px;
        @include breakpoint(max-width 600px){
          margin-left: 30px;
        }
        &.user-lk{
          @include breakpoint(max-width 980px){
            display: none;
          }
          cursor: pointer;
          @include breakpoint(max-width 980px){
            .user-name{
              display: none;
            }
          }
        }
        .user-link{
          display: flex;
          align-items: center;
          text-decoration: none;
          font-size: 0.9rem;
          &.user-menu-link:hover{
            .ic-profile-2{
              background-position-y: 100%;
            }
          }
          &.count-elem:hover{
            .ic-star-2{
              background-position-y: 100%;
            }
          }
          &.compare-link:hover{
            .ic-compare-2{
              background-position-y: 100%;
            }
          }
          &:hover{
            .icon-wrapper{
              border-color: #ee1b24;
            }
          }
          .icon-wrapper{
            border-radius: 100%;
            border:1px solid #eeeeee;
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            @include breakpoint(max-width 980px){
              height: 35px;
              width: 35px;
              border: none;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .header-container.h-fixed{
    margin-top: 0;
    top:0;
    padding-bottom: 15px;
    padding-top: 15px;
    position: fixed;
    width: 100%;
    z-index: 10000;
    height: 90px;
    background-color: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,.2);
    .header-top{
      margin-top: 0;
    }
    .right-block{
      .top-nav-fixed-block{
        display: flex;
      }
    }
    .top-nav{
      display: none;
    }
    .logo>a>img{
      height: 60px;
    }
  }
}

.count-elem {
    position: relative;
}
.count-elem .count-label {
    background-color: #ee1b24;
    color: #fff;
    border-radius: 100%;
    position: absolute;
    z-index: 1;
    left: 30px;
    top: -7px;
    font-size: 13px;
    height: 20px;
    width: 20px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-line-pack: center;
    align-content: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-weight: 600;
}
</style>