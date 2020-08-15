<template>
<div>
              <div class="cart-mini empty-elem" id="cart-top" onclick="utils.showPopupBox(this)">
              <a class="count-elem user-link cart-link">
              <span class="cart-count count-label">0</span>
              <span class="icon-wrapper top-cart-round "><i class="ic-cart-2"></i></span>
              <span class="cart-word">
              <span class="cart-text">Корзина </span><span class="cart-summ">0<span class="ruble">a</span></span>
              </span>
              </a>
            </div>
            <div class="cart-item-block show-box" style="display:none">
              <div class="cart-items">
                <div class="scroll-wrapper">
                </div>
              </div>
              <div class="bottom-block">
                <div class="bottom-text">Ваша корзина пуста</div>
              </div>
            </div>
</div>

</template>
<script>
export default {
  
}
</script>