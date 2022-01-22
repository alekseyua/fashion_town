import React from 'react';
import { GxCheckbox, GxInput } from '@garpix/garpix-web-components-react';
import style from '../index.module.scss';

const AlbumItem = ({ brand, id, items, is_selected, title, updateAlbum, updatePhotoCard }) => {
  return (
    <div className={style['cabinet_myshop__live_album']}>
      <GxCheckbox
        onGx-change={(e) => {
          const value = e.target.checked;
          updateAlbum({
            id,
            type: 'album',
            title: title.my_title,
            is_selected: value,
          });
        }}
        checked={is_selected}
        className={style['cabinet_myshop__live_album_checkbox']}
      >
        Выбрать весь альбом
      </GxCheckbox>
      <div className={style['cabinet_myshop__live_album_wrapper']}>
        <GxInput
          label="Название альбома"
          type="text"
          name={'name_album'}
          value={title.my_title}
          onGx-change={(e) => {
            const value = e.target.value;
            updateAlbum({
              id,
              type: 'album',
              title: value,
              is_selected,
            });
          }}
          className={style['cabinet_myshop__contacts_input']}
        ></GxInput>
        <div className={style['cabinet_myshop__live_album_grid']}>
          {items.map((el) => {
            return (
              <div key={el.id} className={style['cabinet_myshop__live_card']}>
                <GxCheckbox
                  checked={el.is_selected}
                  onGx-change={(e) => {
                    const value = e.target.checked;
                    updateAlbum({
                      id: el.id,
                      type: el.type,
                      is_selected: value,
                    });
                  }}
                  className={style['cabinet_myshop__live_card_checkbox']}
                />
                <img
                  src={el.image}
                  alt="live photo card image"
                  className={style['cabinet_myshop__live_card_image']}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AlbumItem);
