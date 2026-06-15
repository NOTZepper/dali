import { getServices } from '@/lib/queries'
import { BookingDialog } from './booking-dialog'

type Props = {
  label?: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'link'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  defaultService?: string
}

export async function BookingDialogServer(props: Props) {
  const services = await getServices()
  return <BookingDialog services={services} {...props} />
}
