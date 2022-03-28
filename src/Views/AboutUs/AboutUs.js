import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import style from './style/style.module.scss';
import {
  pic1,
  pic2,
  pic3,
  pic4,
  badge,
  info,
  question_1,
  question_2,
  tehnologyBadge,
  tehnologyFone,
  tehnologyInfo,
} from '../../images';
const AboutUs = (props) => {
  const { breadcrumbs, components, site_configuration } = props;

  return (
    <>
      <about className={style["about__container"]}>
        <div className={style["about__container-wrapper"]}>
          <div className={style["company-about"]}>
            <div className={style["company-about__container"]}>

              <div className={style["company-about__block"]}>
                <div className={style["company-about__content"]}>
                  <h1 className={style["company-about__title"]}>О компании</h1>

                  <div className={style["company-about__description"]}>
                    <p>
                      <strong>Fashion Town</strong> — это сервис, который упрощает ведение бизнеса в
                      интернете и предоставляет пользователям доступ к одежде невероятно модных
                      брендов. А купить её можно не только на оптовых условиях, но и как обычный
                      розничный покупатель!
                    </p>
                    <p>Мы работаем для Вас, Вашего бизнеса и гарlероба.</p>
                  </div>

                  <Link 
                    className={style["company-about__btn"]}
                    to={site_configuration.registration_slug}
                  >
                    Зарегистрироваться
                  </Link>
                </div>

                <div 
                    className={style["company-about__image"]}
                    style={{backgroundImage: `url(${pic1})`}}
                ></div>

              </div>
            </div>
          </div>

          <div className={style["experiens-about"]}>
            <div className={style["experiens-about__inner"]}>
              <div className={style["experiens-about__container"]}>
                <div
                  className={style["experiens-about__logo"]}
                  style={{backgroundImage: `url(${pic3})`}}
                ></div>
                <div className={style["experiens-about__title"]}>10 летний </div>
                <div className={style["experiens-about__description"]}>опыт работы</div>
              </div>

              <div className={style["experiens-about__container"]}>
                <div
                  className={style["experiens-about__logo"]}
                  style={{backgroundImage: `url(${pic2})`}}
                ></div>
                <div className={style["experiens-about__title"]}>более 100</div>
                <div className={style["experiens-about__description"]}>брендов - партнеров</div>
              </div>

              <div className={style["experiens-about__container"]}>
                <div
                  className={style["experiens-about__logo"]}
                  style={{backgroundImage: `url(${pic4})` }}
                ></div>
                <div className={style["experiens-about__title"]}>более 100</div>
                <div className={style["experiens-about__description"]}>товаров в наличии</div>
              </div>
            </div>
          </div>

          <div className={style["info-about"]}>
            <div className={style["info-about__inner"]}>
              <div
                className={style["info-about__image"]}
                style={{backgroundImage: `url(${info})` }}
              ></div>

              <div className={style["content-about-info"]}>
                <div className={style["content-about-info__title"]}>
                  Платформа создана для тех, кто стремится:
                </div>

                <div className={style["content-about-info__text"]}>
                  <div
                    className={style["content-about-info__text-badge"]}
                    style={{backgroundImage: `url(${badge})` }}
                  ></div>
                  <div className={style["content-about-info__text-text"]}>
                    Эффектно выглядеть и при этом немного тратить;
                  </div>
                </div>

                <div className={style["content-about-info__text"]}>
                  <div
                    className={style["content-about-info__text-badge"]}
                    style={{backgroundImage: `url(${badge})` }}
                  ></div>
                  <div className={style["content-about-info__text-text"]}>
                    Узнавать первым о новинках одежды, парфюмерии,
                  </div>
                </div>

                <div className={style["content-about-info__text"]}>
                  <div
                    className={style["content-about-info__text-badge"]}
                    style={{backgroundImage: `url(${badge})` }}
                  ></div>
                  <div className={style["content-about-info__text-text"]}>
                    Узнавать первым о новинках косметики ведущих европейских брендов
                  </div>
                </div>

                <Link 
                  to={site_configuration.registration_slug}
                  className={style["content-about-info__btn"]}
                  >Зарегистрироваться
                </Link>
              </div>
            </div>
          </div>

          <div className={style["tehnology-about"]}>
            <div
              className={style["tehnology-about__image"]}
              style={{backgroundImage: `url(${tehnologyFone})` }}
            ></div>
            <div className={style["tehnology-about__content"]}>
              <div
                className={style["tehnology-about__badge"]}
                style={{backgroundImage: `url(${tehnologyBadge})`}}
              ></div>
              <h3 className={style["tehnology-about__title"]}>Технология, упрощающая ваш бизнес</h3>
              <p className={style["tehnology-about__contex"]}>
                Торговая бизнес-площадка Fashion Town – результат многолетнего опыта работы в сфере
                электронной коммерции, предоставляющая доступ к товарам более 100 брендов на
                розничных и оптовых условиях, а также по модели дропшиппинга.
              </p>
            </div>
          </div>

          <div className={style["question-about"]}>
            <div className={style["question-about__inner"]}>
              <div className={style["question-about__card"]}>
                <div
                  className={style["question-about__card-image"]}
                  style={{backgroundImage: `url(${question_1})` }}
                ></div>
                <h3 className={style["question-about__card-title"]}>Почему у нас удобно</h3>
                <p className={style["question-about__card-text"]}>
                  Привычная и удобная для пользователей система покупок:
                </p>
                <ul className={style["question-about__card-list"]}>
                  <li className={style["question-about__card-list-items"]}>
                    <div
                      className={style["question-about__card-list-image"]}
                      style={{backgroundImage: `url(${badge})` }}
                    ></div>
                    <div className={style["question-about__card-list-item"]}>Каталог</div>
                  </li>
                  <li className={style["question-about__card-list-items"]}>
                    <div
                      className={style["question-about__card-list-image"]}
                      style={{backgroundImage: `url(${badge})` }}
                    ></div>
                    <div className={style["question-about__card-list-item"]}>Корзина</div>
                  </li>
                  <li className={style["question-about__card-list-items"]}>
                    <div
                      className={style["question-about__card-list-image"]}
                      style={{backgroundImage: `url(${badge})` }}
                    ></div>
                    <div className={style["question-about__card-list-item"]}>Покупка</div>
                  </li>
                </ul>
              </div>

              <div className={style["question-about__card"]}>
                <div
                  className={style["question-about__card-image"]}
                  style={{backgroundImage: `url(${question_2})` }}
                ></div>
                <h3 className={style["question-about__card-title"]}>Почему у нас выгодно</h3>
                <p className={style["question-about__card-text"]}>Оптовые покупатели и дропшипперы могут:</p>
                <ul className={style["question-about__card-list"]}>
                  <li className={style["question-about__card-list-items"]}>
                    <div
                      className={style["question-about__card-list-image"]}
                      style={{backgroundImage: `url(${badge})` }}
                    ></div>
                    <div className={style["question-about__card-list-item"]}>
                      Создать свой собственный интернет-магазин на базе платформы;
                    </div>
                  </li>
                  <li className={style["question-about__card-list-items"]}>
                    <div
                      className={style["question-about__card-list-image"]}
                      style={{backgroundImage: `url(${badge})` }}
                    ></div>
                    <div className={style["question-about__card-list-item"]}>
                      Скачать фотографии в хорошем качестве, чтобы использовать их на своих сайтах и
                      в социальных сетях;
                    </div>
                  </li>
                  <li className={style["question-about__card-list-items"]}>
                    <div
                      className={style["question-about__card-list-image"]}
                      style={{backgroundImage: `url(${badge})` }}
                    ></div>
                    <div className={style["question-about__card-list-item"]}>
                      Минимизировать складские риски (для тех, кто не имеет своих складов и больших
                      поставок товаров).
                    </div>
                  </li>
                </ul>

                <p className={style["question-about__card-text"]}>Розничные покупатели могут:</p>
                <ul className={style["question-about__card-list"]}>
                  <li className={style["question-about__card-list-items"]}>
                    <div
                      className={style["question-about__card-list-image"]}
                      style={{backgroundImage: `url(${badge})` }}
                    ></div>
                    <div className={style["question-about__card-list-item"]}>
                      За считанные минуты познакомится с новинками в мире моды, выбрать себе
                      современный look, не выходя из дома и не отрываясь от по-настоящему важных
                      дел.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={style["tehnology-info-about"]}>
            <div className={style["tehnology-info-about__inner"]}>
              <div className={style["tehnology-info-about__container"]}>
                <div className={style["tehnology-info-about__context"]}>
                  <h3 className={style["tehnology-info-about__title"]}>
                    Технология, которая экономит вам деньги и время
                  </h3>
                  <p className={style["tehnology-info-about__text"]}>
                    Перейдя на систему закупок с помощью ТБП «Fashion Town», Вы получите не только
                    уменьшение прямых затрат, но и автоматизацию процессов, а также доступ к
                    огромному выбору товаров и брендов.
                  </p>
                  <p className={style["tehnology-info-about__text"]}>
                    Розничный клиент может за считанные минуты познакомится с новинками в мире моды,
                    выбрать себе современный look не выходя из дома, не отрываясь от по-настоящему
                    важных дел и любимых людей. Ведь, в современном мире у женщин крайне много
                    задач, а быть самой привлекательной - ее прямая обязанность.
                  </p>
                </div>
                <div
                  className={style["tehnology-info-about__image"]}
                  style={{backgroundImage: `url(${tehnologyInfo})` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </about>
    </>
  );
};

export default memo(AboutUs);


            //   <div className={style["company-about__bread-crumbs bread-crumbs"]}>
            //     <ul className={style["bread-crumbs__list"]}>
            //       <li className={style["bread-crumbs__items"]}>
            //         <Link to="#" className={style["bread-crumbs__link"]}>
            //           Главная
            //         </Link>
            //       </li>
            //       <li className={style["bread-crumbs__items"]}>
            //         <Link to="#" className={style["bread-crumbs__link"]}>
            //           О компании
            //         </Link>
            //       </li>
            //     </ul>
            //   </div>