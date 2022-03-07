var cart = {}; //моя корзина
$('document').ready(function(){
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    //загрузка товаров на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        var out = '';
        for (var key in data) {
            out+='<div class="single-goods">';
            out+='<h3>'+data[key]['name']+'</h3>';
            out+='<p>Цена: '+data[key]['cost']+' рублей</p>';
            out+='<img src="'+data[key]['img']+'">';
            out+='<p class="desc">'+data[key]['description']+'</p>';
            out+='<button class="to-cart" data-art="'+key+'">Купить</button>'
            out+='</div>';
        }
        $('#goods').html(out);
        $('button.to-cart').on('click', addToCart);
    });
}

function addToCart() {
    //добавление товара в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul]!=undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart',JSON.stringify(cart))
    console.log(cart);
    showMiniCart();
}

function checkCart() {
    //проверяю наличие корзины в local storage 
    if (localStorage.getItem('cart')!=null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function showMiniCart() {
    //показываю корзину
    var out = '';
    for (var w in cart){
        out+=w+'---'+cart[w]+'<br>';
    }
    $('#mini-cart').html(out);
}
