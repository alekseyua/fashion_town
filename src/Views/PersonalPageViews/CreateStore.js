import React from 'react';
import { storeIcon } from '../../images';
import Text from '../../components/Text';
import classNames from 'classnames';
import { ROLE } from '../../const';
import style from './styles/userRouting.module.scss';
import { Link } from 'react-router-dom';
//Views -> CreateStorage
const CreateStore = ({ create_shop = '#', role, className }) => {
  if (ROLE.RETAIL === role || ROLE.UNREGISTRED === role) return null;
  const customClassName = classNames({
    [style['cabinet-sidebar__newstorebtn']]: true,
    [style[className]]: !!className,
  });
  return (
    <Link to={create_shop} className={customClassName}

    >
      <img src={storeIcon} alt="store" />
      <span>
        <Text text={'createMyStore'} />
      </span>
    </Link>
  );
};
export default React.memo(CreateStore);
