<template>
  <div class="catalog-item">
    <div>ID:{{ item.ID }}</div>
    <div><nuxt-link :title="item.NAME" :to="{ name: 'product-id', params: { id: item.ID } }">{{ item.NAME }}</nuxt-link></div>
    <div>
      <nuxt-link :title="item.NAME" :to="{ name: 'product-id', params: { id: item.ID } }">
        <img :src="item.RESIZE_PREVIEW_PICTURE.small.src" alt="">
      </nuxt-link>
      </div>
    <div>Цена:{{ item.PRICE }}</div>
  </div>
</template>
<script>
export default {
  props:['item']
}
</script>