import Layout from 'components/layout'

import CardComponent from 'components/listening-card'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'


const ListeningContent = () => {
   
    // const {data, error} = useSWR(`basic!${}`)    


  return (
    <div className='container mx-auto py-32 px-16'>
        <CardComponent/>

    </div>
  )
}

ListeningContent.getLayout = Layout;

export default ListeningContent