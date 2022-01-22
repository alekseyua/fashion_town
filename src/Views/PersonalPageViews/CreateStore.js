import React from 'react';
import { storeIcon } from '../../images';
import Text from '../../components/Text';
import classNames from 'classnames';
import { ROLE } from '../../const';
import style from './styles/userRouting.module.scss';
//Views -> CreateStorage
const CreateStore = ({ create_shop = '#', role, className }) => {
  if (ROLE.RETAIL === role) return null;
  const customClassName = classNames({
    [style['cabinet-sidebar__newstorebtn']]: true,
    [style[className]]: !!className,
  });
  return (
    <a href={create_shop} className={customClassName}>
      <img src={storeIcon} alt="store" />
      <span>
        <Text text={'createMyStore'} />
      </span>
    </a>
  );
};
export default React.memo(CreateStore);
