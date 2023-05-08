import React from 'react'
import './PageHader.css';
const PageHader = ({imgNo = 1, title = 'stayHome'}) => {


  return (

        <section id='page-header'>
            <h2>{title}</h2>
        </section>
  )
}

export default PageHader