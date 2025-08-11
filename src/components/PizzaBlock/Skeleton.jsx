import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = (props) => (
    <ContentLoader
    className='PizzaBlock'
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
       
    >
        <circle cx="125" cy="125" r="125" />
        <rect x="0" y="296" rx="8" ry="8" width="280" height="22" />
        <rect x="0" y="353" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="458" rx="10" ry="10" width="95" height="30" />
        <rect x="129" y="455" rx="30" ry="30" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton