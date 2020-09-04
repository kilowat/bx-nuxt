const eventMap = {
  onProductAddedToBasket: "product-added-to-basket", //Товар добавлен в корзину
  onUserLogin: "on-user-login", //Пользователь авторизовался
  onUserErrorLogin : "on-user-error-login", //Ошибка авторизации
  onOrderInvalidFields: "on-order-invalid-fields", // Обязательниые поля в оформлении заказа 
};
export default ({ app }, inject) => {
  inject('eventMap', eventMap)
}