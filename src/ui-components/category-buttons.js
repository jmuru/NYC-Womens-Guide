import React  from 'react';

const test = () => {console.log('hello world')}

function categoryButtons({category, onClick}) {
    return (
        <a onClick={onClick} href={'#'}>{category}</a>
    )
}

export default categoryButtons;