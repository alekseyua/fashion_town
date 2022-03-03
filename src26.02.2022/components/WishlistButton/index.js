import React from "react";
import { GxButton } from '@garpix/garpix-web-components-react';
import { useStoreon } from 'storeon/react';

const WishlistButton = ({productId, addToWishlist, removeFromWishlist}) => {
    const { wishlist } = useStoreon('wishlist');
    //
    const handleRemoveFromWishlist = () => {
        removeFromWishlist();
    };

    const handleAddToWishlist = () => {
        addToWishlist();
    };


    const isWishlisted = !!wishlist[productId];

    if (isWishlisted) {
        return (
            <GxButton variant="light" size="sm" onClick={handleRemoveFromWishlist} data-toggle="tooltip" title="Удалить из избранного">
             
            </GxButton>
        )
    }

    return (
        <GxButton variant="light" size="sm" onClick={handleAddToWishlist} data-toggle="tooltip" title="Добавить в избранное">
     
        </GxButton>
    )
};

export default React.memo(WishlistButton);
