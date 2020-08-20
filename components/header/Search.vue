<template>
  <div class="search-block">
    <div class="search-form top-search">
      <form action="/search/index.php">
        <input type="text" class="search-input" placeholder="Введите поисковой запрос" name="q" value="" size="15" maxlength="200">
        <button type="submit" class="search-btn" name="search"><i class="ic-top-search"></i></button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped lang="scss">
.top-search {
    position: relative;
}
.top-search .search-input {
    font-weight: 600;
    color: #555555;
    font-size: 13px;
    width: 100%;
    height: 40px;
    padding: 10px 5px 10px 28px;
    margin: 0px;
    box-sizing: border-box;
    border: none;
    background-color: #eeeeee;
    border-radius: 50px;
}
.top-search .search-btn {
    position: absolute;
    background-color: transparent;
    border: none;
    right: 1px;
    top: 9px;
}
</style>