import React from 'react'


const RecomendWrapper = ({children}) => {
    return <div>{children}</div>
}

export default React.memo(RecomendWrapper);
