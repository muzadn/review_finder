                      //Business confirmation page.
                      //base url from environment variables.
     //already present reviews found through "baseurl/review" api if present then redirected to dashboard page
                      //two components navbar and confirmBussinessView rendered here and base url sent as props to both.
import ConfirmBusinessView from '@/components/ConfirmBusinessView'
import axios from 'axios'
import { isRedirectError } from "next/dist/client/components/redirect"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import isAuthenicated from '../../utils/routeProtection'
import NavbarRest from '../../components/NavbarRest'

const page = async () => {
  let baseUrl = process.env.baseUrl
  const auth = await isAuthenicated();
  if (!auth) {
    redirect('/')
  }
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const header = `Bearer ${token.value}`
  let res



  try {
    res = await axios.get(`${baseUrl}/reviews`, { headers: { Authorization: header } })
    if (res.status == 200 || res.status || 201) {
      redirect('/dashboard')
    }
  } catch (err) {
    if (isRedirectError(err))
      throw err;
  }


  return (
    <main className='bg-white'>
      <NavbarRest baseUrl={baseUrl} />
      <section className='mt-14 flex justify-center'>

        <ConfirmBusinessView baseUrl={baseUrl} />
      </section>
    </main>


  )
}

export default page