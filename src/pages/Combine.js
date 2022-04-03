import React from 'react';
import { Fetcher } from '@garpix/fetcher';
import { useStoreon } from 'storeon/react';
import Home from './Home';
import ProductDetails from './ProductDetails';
import CatalogPage from './CatalogPage';
import Error404 from './Error404';
import Error500 from './Error500';
import NewsDetailsPage from './NewsDetailsPage';
import PersonalPage from './PersonalPage';
import MyOrders from './MyOrders';
import ReviewsPersonalPage from './ReviewsPersonalPage';
import Authorization from './Authorization';
import Registration from './Registration';
import WishlistPage from './WishlistPage';
import BalancePage from './BalancePage';
import LivePhotosPage from './LivePhotosPage';
import InformationPayments from './InformationPayments';
import NotificationsPage from './NotificationsPage';
import InformationDelivery from './InformationDelivery';
import InformationExchange from './InformationExchange';
import InformationJuridical from './InformationJuridical';
import InformationContacts from './InformationContacts';
import InformationHowto from './InformationHowto';
import InformationReviews from './InformationReviews';
import NewsPage from './NewsPage';
import CartPage from './CartPage';
import AboutPage from './AboutPage';
import DevelopmentPage from './DevelopmentPage';
import OrderDetailsPersonalPage from './OrderDetailsPersonalPage';
import MarketDetails from './MarketDetails';
import SettingMarket from './SettingMarket';
import RequisitesMarket from './RequisitesMarket';
import ContentMarket from './ContentMarket';
import ContentInfoRetail from './ContentInfoRetail';
import ContentAboutCompanyMarket from './ContentAboutCompanyMarket';
import ContentContactMarket from './ContentContactMarket';
import ContentLivePhotosMarket from './ContentLivePhotosMarket';
import ContentFooterMarket from './ContentFooterMarket';
import ContentDeliveryMarket from './ContentDeliveryMarket';
import AllProductMarket from './AllProductMarket';
import OrdersMarket from './OrdersMarket';
import OrderDetailsMarket from './OrderDetailsMarket';
import ClientMarket from './ClientMarket';
import PromoCodeMarket from './PromoCodeMarket';
import AboutPartnership from './AboutPartnership';
import Information from './Information';
import LandingPage from './LandingPage';
import CreateStore from './CreateStore';
import LivePhotosDetailsPage from './LivePhotosDetailsPage';
import SearchePage from './SearchePage';
import Ordering from './Ordering';
import ClientDetailsMarket from './ClientDetailsMarket';
import ExportCatalog from './ExportCatalog';
import UIKITPage from './UIKITPage';
import MotivationsShop from './MotivationsShop';
import IMHome from './IMHome';
import IMInformation from './IMInformation';
import IMCatalog from './IMCatalog';
import IMProduct from './IMProduct';
import IMOrdering from './IMOrdering';
import IMOrders from './IMOrders';
import IMOrderDetails from './IMOrderDetails';
import IMLivePhotoDetails from './IMLivePhotoDetails';
import IMLivePhoto from './IMLivePhoto';
import IMCart from './IMCart';
import TestPage from './TestPage';
import ContentHomeShop from './ContentHomeShop';
import api from '../api';

const PAGE_TYPES = {
  33: Error500,
  32: Error404,
  1: Home, //? главная страница
  69: MotivationsShop,
  9: CartPage, //?корзина http://localhost:3000/cart
  31: ReviewsPersonalPage, //? страница с деталкой заказа
  36: BalancePage, //? кабинет баланс
  35: NotificationsPage, //? кабинет уведомления
  34: PersonalPage, //? личный кабинет
  29: MyOrders, //? страница с моими заказами (там же архив и активные)
  6: Authorization, //? страница с авторизацией
  7: Registration, //? страница регистрации
  15: SearchePage,
  11: Ordering, //? страница Оформление заказа
  2: Information, //? страница информации
  16: InformationPayments, //? страница с информацией по оплате
  17: InformationDelivery, //? страница с информацией по доставке
  18: InformationExchange, //? страница с информацией по замене
  19: InformationJuridical, //? страница с информацией по юр инфе
  20: InformationContacts, //? страница с информацией по контактам
  21: InformationHowto, //? страница с информацией по подбору размера
  22: InformationReviews, //? страница с информацией по отзывам
  5: CatalogPage, //? основной каталог
  13: WishlistPage, //? старница со списком желаемого
  24: LivePhotosPage, //? страница с живыми фото
  25: LivePhotosDetailsPage, //? страниац деталки лайв фото
  26: NewsPage, //? страница с новостями
  27: NewsDetailsPage, //?страница деталки новости
  4: ProductDetails, //? детальная страница продукта http://localhost:3000/product-181-shapkaia-pukhovaia-1
  23: AboutPage, //? страница о компании
  28: AboutPartnership, //? страница Партнерам
  30: OrderDetailsPersonalPage, //? деталка заказа
  38: MarketDetails, //? страница мой магазин
  39: SettingMarket,
  37: ExportCatalog,
  40: RequisitesMarket,
  41: ContentMarket, //? Страница с контентом для магазина
  42: ContentInfoRetail, //? Контент > Информация для розничного покупателя
  43: ContentAboutCompanyMarket, //? Контент > О компании
  44: ContentContactMarket, //? Контент > Контакты
  45: ContentLivePhotosMarket,
  46: ContentFooterMarket, //? Контент > Футер сайта
  47: ContentDeliveryMarket,
  70: ContentHomeShop, //? Контент > Футер сайта
  49: AllProductMarket, //? ЛК, Страница управления товарами
  50: OrdersMarket, //? заказы в магазине
  51: OrderDetailsMarket, //? Деталка заказа в магазине
  52: ClientMarket, //? Мой магазин (клиенты, база покупателей)
  53: PromoCodeMarket, //? Управление промокодами
  54: ClientDetailsMarket, //? Деталка клиента в ИМ
  55: LandingPage,
  48: CreateStore, //? создание ИМ

  57: IMHome,
  58: IMInformation,
  59: IMCatalog,
  60: IMProduct,
  61: IMOrdering,
  62: IMOrders,
  63: IMOrderDetails,
  64: IMLivePhotoDetails,
  65: IMLivePhoto,
  66: IMCart,

  'development-page': DevelopmentPage, //!Заглушка для не добавленных страниц или не готовых
  0: TestPage,
  ui: UIKITPage, //! страница для разработки
};



const Combine = (props) => {
  const { stateCountCart, dispatch } = useStoreon('stateCountCart')
  const setRoleConfiguration = ({ role_configuration, notifications }) => {
    dispatch('notificationCount/update', notifications);
    dispatch('role_configuration/update', role_configuration);
  };

  return (
    /*
    ** происходит формирование страницы 
    ** задачи 
    ** нужно определить почему приходит 500
    */
    <Fetcher {...props} paramsKey={'0'}>
      {
        (data = {}, error, status) => {

          let pageType, page;
          if (status === 'failed') {
            console.log('what is failed')
            api.getPage({
              params: '/order'
            })
            //return status;
            return <div>Wait moment please</div>;
          } else {
            page = data.page;
            pageType = data.pageType;
          }
          if (pageType === undefined || pageType === null) {
            return null;
          }
          const Page = PAGE_TYPES[pageType];
          if (!Page) {
            const DevPage = PAGE_TYPES['development-page'];
            return <DevPage {...page} {...props} />;
          }

          if ( page.profile === undefined ){
              console.log('profile если undefined из combine')
              alert('page.profile === undefined of Combine')
              // window.location.reload()
          }

          page ? dispatch('userPage/add', page) : null;
          page ? setRoleConfiguration(page) : null;
          return <Page {...page} {...props} cartUpdate={stateCountCart} />;
        }}
    </Fetcher>
  );
};

export default React.memo(Combine);
