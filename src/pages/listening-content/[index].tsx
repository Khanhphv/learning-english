import Layout from 'components/layout'

import CardComponent from 'components/listening-card'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'


const ListeningContent = () => {
    const router = useRouter();
    const index = router.query.index ? String(router.query.index) : null;
    // const {data, error} = useSWR(`basic!${}`)    


  return (
    <div>
        <CardComponent/>

    </div>
  )
}

ListeningContent.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

export default ListeningContent