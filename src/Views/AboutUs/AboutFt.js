import React from "react";

const AboutFt = ({
    children,
    classComponent
}) => {
 
    return (
        <div className={classComponent}>
            {children}
        </div>
    )
}

export default AboutFt;

{/* <div className={style["company-about"]}> */}
            // <div className={style["company-about__container"]}>

            //   <div className={style["company-about__block"]}>
            //     <div className={style["company-about__content"]}>
            //       <h1 className={style["company-about__title"]}>О компании</h1>

            //       <div className={style["company-about__description"]}>
            //         <p>
            //           <strong>Fashion Town</strong> — это сервис, который упрощает ведение бизнеса в
            //           интернете и предоставляет пользователям доступ к одежде невероятно модных
            //           брендов. А купить её можно не только на оптовых условиях, но и как обычный
            //           розничный покупатель!
            //         </p>
            //         <p>Мы работаем для Вас, Вашего бизнеса и гардероба.</p>
            //       </div>

            //       {/* <Link 
            //         className={style["company-about__btn"]}
            //         to={site_configuration.registration_slug}
            //       >
            //         Зарегистрироваться
            //       </Link> */}
            //     </div>

            //     <div 
            //         className={style["company-about__image"]}
            //         style={{backgroundImage: `url(${pic1})`}}
            //     ></div>

            //   </div>
            // </div>
// </div>
