import React, { useState } from 'react';
import Layout from '../Views';
import Text from '../components/Text';
import InformationViews from '../Views/InformationViews';
import Title from '../Views/Title';
import Breadcrumbs from '../Views/Breadcrumbs';
import Container from '../Views/Container';
import { Link } from 'react-router-dom';
import Modal from '../Views/ModalCreator';


const InformationJuridical = (props) => {
  const { cabinet_menu, create_shop, cabinet_site_menu, profile, breadcrumbs = [] } = props;
  const { user = {}, shop = {}, role, passport, organization, links, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;

  //todo: можно пропсом кастрировать футер

  return (
    <Layout profile={profile} {...props}>
      <Modal.StorControllerModal />
      <Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <InformationViews.PaymentsConteiner>
          <Title variant={'information-payments__title'} type={'h1'}>
            юридическая инфОрмация
          </Title>
          <InformationViews.HowToWrapper>
            <InformationViews.BlockHowTo>
              <InformationViews.ContainerMin>
                <InformationViews.PaymentsDescription>
                  Сложно сказать, почему ключевые особенности структуры проекта объективно
                  рассмотрены соответствующими инстанциями. В своём стремлении повысить качество
                  жизни, они забывают, что высокое качество позиционных исследований однозначно
                  фиксирует необходимость как самодостаточных, так и внешне зависимых концептуальных
                  решений. Таким образом, социально-экономическое развитие однозначно определяет
                  каждого участника как способного принимать собственные решения касаемо
                  распределения внутренних резервов и ресурсов. Таким образом,
                  социально-экономическое развитие однозначно определяет каждого участника как
                  способного принимать собственные решения касаемо распределения внутренних резервов
                  и ресурсов. Таким образом, социально-экономическое развитие однозначно определяет
                  каждого участника как способного принимать собственные решения касаемо
                  распределения внутренних резервов и ресурсов. Сложно сказать, почему ключевые
                  особенности структуры проекта объективно рассмотрены соответствующими инстанциями.
                  Сложно сказать, почему ключевые особенности структуры проекта объективно
                  рассмотрены соответствующими инстанциями.
                </InformationViews.PaymentsDescription>
                <InformationViews.PaymentsDescription>
                  <div className="information-exchange__important">
                    <p className="information-exchange__important-text">
                      Какая-то ключевая информация! Блок должен содержать текстовую информацию.
                    </p>
                  </div>
                </InformationViews.PaymentsDescription>
                <InformationViews.PaymentsDescription>
                  Открытие расчётного счёта для бизнеса <br />
                  В Альфа-Банке вы можете открыть расчётный счёт для ООО или ИП онлайн не выходя из
                  дома. Мы предлагаем прозрачные условия обслуживания и дополнительные привилегии
                  для малого бизнеса. Выберите тариф, который учитывает специфику вашей
                  деятельности. Используйте эффективные банковские продукты, чтобы работать ещё
                  продуктивнее. <br />
                  Счета для бизнеса Для юридических лиц и индивидуальных предпринимателей действуют
                  актуальные предложения. У нас представлены тарифы для компаний с небольшим
                  оборотом, а также тех, кто проводит много платежей партнёрам в другие банки.{' '}
                  <br />
                  Почему стоит открыть расчётный счёт в Альфа-Банке:
                  <ul className="information-exchange__features">
                    <li>бесплатная бухгалтерия для ИП на упрощёнке;</li>
                    <li>стоимость подключения и аренда терминалов — 0 ₽;</li>
                    <li>зачисление денег на следующий день;</li>
                    <li>проверка операций на соответствие 115-ФЗ;</li>
                    <li>дистанционное управление средствами с мобильных устройств.</li>
                  </ul>
                  Внутренние переводы с расчётного счёта доступны круглосуточно для ИП и ООО. Мы
                  начисляем кэшбек за ежемесячные бизнес-расходы и дарим бонусы на развитие. Вы
                  получаете расширенный доступ к интернет-банку, чтобы использовать все возможности
                  онлайн-сервисов Альфа-Банка. Вы сможете обмениваться данными с
                  онлайн-бухгалтерией, отслеживать данные о движении средств, получать выписки,
                  проводить платежи в рублях и иностранной валюте, управлять корпоративными картами.
                </InformationViews.PaymentsDescription>
                <InformationViews.PaymentsDescription>
                  <Link to="#" className="information-exchange__link">
                    Политика конциденциальности
                  </Link>
                  <br />
                  <Link to="#" className="information-exchange__link">
                    Пользовательское соглашение
                  </Link>
                  <br />
                  <Link to="#" className="information-exchange__link">
                    Другой документ
                  </Link>{' '}
                </InformationViews.PaymentsDescription>
              </InformationViews.ContainerMin>
            </InformationViews.BlockHowTo>
          </InformationViews.HowToWrapper>
        </InformationViews.PaymentsConteiner>
      </Container>
    </Layout>
  );
};

export default React.memo(InformationJuridical);
