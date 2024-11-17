import { UrlDataType } from '@/app/types/url_data_type'
import { ScrapperContainer } from '@/modules/system/service/scrapper/ScrapperContainer'
import { Metadata } from 'next'
import { generateMockData } from './generateMockData'

export const metadata: Metadata = {
  title: 'Scrapper Service',
  description: 'Scrapper url service',
}

export default function Page({}) {
  const mockUrlData: UrlDataType[] = generateMockData(100)

  return <ScrapperContainer data={mockUrlData} />
}
