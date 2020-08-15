<template>
  <div class="logo">
  <div class="mobile-site-menu">
    <a href="javascript:void(0)" onclick="app.mobile.openSiteMenu('Главное меню', 'mobile-site-menu', 'site-menu')">
    <i class="ic-site-menu"><span></span><span></span><span></span></i>
    </a>
  </div>
  <nuxt-link to="/"><img src="~/assets/img/header_left.png" alt="pilson"></nuxt-link>
  <div class="phone-block">
    <div class="phone-ico">
      <img src="~/assets/img/phone-ico-2.png" alt="">
    </div>
    <div class="phone-content">
      <div class="phone-text">
        <a href="tel:+78005003101">8 (800) 500-31-01</a> 
      </div>
      <div class="phone-descr">По России бесплатно</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  
}
</script>