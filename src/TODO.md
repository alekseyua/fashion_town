  заметки

разрешаем доступ для выполнения скриптов
Set-ExecutionPolicy RemoteSigned -Scope Process

Login: root
Password: ABkxb52RF8
Выделенный IP: 91.218.229.240
        
    supervisorctl restart Server-Back

GET
http://91.218.229.240:8000/api/v1/order/correspondence_order_item/?order_item_id=№ товара

POST


			@include adaptive-value('font-size',33,20,px,2);
			@include adaptive-value('line-height',60,28,px,2);





















               PreviewSlider
               SectionProdPage
               ProductPreview
               
               
                  (``адаптивный миксин``)
                  
// ************************шрифт размер адаптив****************

@function strip-unit($number) {
  @if type-of($number) == 'number' and not unitless($number) {
    @return $number / ($number * 0 + 1);
  }

  @return $number;
}

@function calcFluidFontSize($f-min, $f-max, $w-min, $w-max, $units: px) {
  $f-min: strip-unit($f-min);
  $f-max: strip-unit($f-max);
  $w-min: strip-unit($w-min);
  $w-max: strip-unit($w-max);
  
	$k: ($f-max - $f-min)/($w-max - $w-min);
	$b: $f-min - $k * $w-min;

	$b: $b + $units;

	@return calc( #{$k} * 100vw + #{$b} );
}

// миксин адаптивного шрифта

// adaptiv-font(миним размер, макс размер по шаблону, )
@mixin adaptiv-font($f-min, $f-max, $w-min: 320px,$w-max: 1920px, $fallback: false) {
  
  font-size: $f-min;
  
  @media (min-width: $w-min) {
    @if ($fallback) {
      font-size: $fallback;
    }
    font-size: calcFluidFontSize($f-min, $f-max, $w-min, $w-max, px);  
  }
  @media (min-width: $w-max) {
    font-size: $f-max;
  }
}
// **********************************************************************
// ************************свойство-значение адаптив****************

              нужно сделать

// *******************************************************
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

при обновлении в увидомлениях нужно обновлять в 

                        задачи в перспективе: 

1) `нужно сделать попап для ошибки добавления и удаления количества товара в превью`
        ----------------------
2) `// ???????????? под вопросом может не работать как надо нужно проследить`


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        блокировка скрола body при попапе  
  `
  const [isOpen, setIsOpen]=useState();
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen])
  
  `
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            `отлавливаем клик вне блока`
  useEffect(() => {
     const onClick = e => clickOutRef.current.contains(e.target) || setClickActiveCurrencies(false)
     document.addEventListener('click', onClick);
     return () => document.removeEventListener('click',onClick)
  }, [])


//**
`
console.log('товар пачка', finishResultIs_pack) - собирает все товары пачкой 



//



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

1)  карточке товара обязательно должно выводиться УСЛОВИЕ ПОКУПКИ для всех ролей , 
кроме розницы . Сейчас этого нет , почему то это не сделали предыдущие разрабы

Далее , есть в основном 2 условия для товаров под заказ , это либо ряд ( т е условие 
применяемое  непосредственно к товару ) либо условие по бренду, например,  
5 шт любых товаров этого бренла

Вот, у предыдущих ребят ( и так даже прописано в тз ) были планы сделать условие 
по товару приоритетным недели условие по бренду .
Я имею ввиду мой скрин . Например , этот голубой свитер в админке заявлен как товар,  
который продаётся только размерным рядом . А на сайте написано выкуп 3 шт любых моделей этого бренда .

Правильнее для товаров,  которые продаются размерным рядом писать условие покупки - 
размерный ряд , а не условие по бренду .

2) 



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    `framer-motion`
<motion.div
  animate={{ y: [0, 150, 150, 0], rotate: 90 }}
  transition={{ duration: 3, repeat: Infinity }}
/>

<motion.div 
    animate={{ x: 100, scale:1.5, rotate:90 }} 
/>

<motion.div 
    whileHover={{ scale: 1.2, opacity: 1 }}
>
  Hover Over Me!
</motion.div>

<motion.input 
    whileFocus={{ scale: 1.2 }} 
/>

<motion.div 
    whileTap={{ scale: 0.5 }} 
/>

<motion.div
  drag
  dragTransition={{
    min: 0,
    max: 100,
    bounceStiffness: 100
  }}
>
 Drag Me!
</motion.div>



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
удобные пакеты для работы

1) Bracket Pair Colorizer 2




// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
[Переслано от Falser Bridge]
5168 7574 1898 2353. Приватбанк


5168 7450 1590 8418. Приватбанк
