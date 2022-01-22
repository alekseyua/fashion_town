import React from 'react';
import style from '../index.module.scss'
import Header from './Header'
import ContentBlock from './ContentBlock'
import Wrapper from './Wrapper'
import Cards from './Cards'
import Bottom from './Bottom'
import PayInfo from './PayInfo'
import InfoBlock from './InfoBlock'
import InfoText from './InfoText'
import PaymentDetails from './PaymentDetails'
import SettingBlock from './SettingBlock'

const MainBlock = ({ children }) => {
    return (
        <section className={style['cabinet_myshop__section']}>{children}</section>
    )
}

export default {
    MainBlock,
    ContentBlock,
    Header,
    Wrapper,
    Cards,
    Bottom,
    PayInfo,
    InfoBlock,
    InfoText,
    PaymentDetails,
    SettingBlock
}