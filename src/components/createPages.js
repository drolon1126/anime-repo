import React from 'react';

export const createPages = (pageInfo,getAnime)=>{
  let pages = [];
  let loopCount = pageInfo.lastPage>=10 ? 10:pageInfo.lastPage;
  let startPos = pageInfo.currentPage>6 ? pageInfo.currentPage - 5 : 1;

  for(let i= startPos; i<startPos+loopCount; i++){
    if(i===pageInfo.currentPage){
      pages.push(<div className='pageSelector selected' onClick={()=>{getAnime(i)}}>{i}</div>);
    }else{
      pages.push(<div className='pageSelector' onClick={()=>{getAnime(i)}}>{i}</div>);
    }
  }

  return pages;
}