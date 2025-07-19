import { Home } from '@/components/pages'

type Props = {
  searchParams: Promise<Record<string, string>>
}

export const Page = async ({ searchParams }: Props) => {
  const params = await searchParams
  return <Home params={params} />
}

export default Page
