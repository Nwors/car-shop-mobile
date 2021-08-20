import React, {useState} from 'react';
import Dots from 'react-native-dots-pagination';

function DotsPagination({numberOfPages, curPage}) {
    return (
        <Dots length={numberOfPages} active={curPage-1} />
    );
}

export default DotsPagination;
