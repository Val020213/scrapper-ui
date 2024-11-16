import { UrlDataType } from '@/app/types/url_data_type'
import { ScrapperContainer } from '@/modules/service/scrapper/ScrapperContainer'
// import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Scrapper Service',
//   description: 'Scrapper url service',
// }

export function generateMockData(count: number): UrlDataType[] {
  const mockData: UrlDataType[] = []
  for (let i = 0; i < count; i++) {
    mockData.push({
      id: i,
      url: `https://example.com/page${i + 1}`,
      status: i % 2 ? 'scrapped' : 'pending',
    })
  }
  return mockData
}

export default function Page({}) {
  const mockUrlData: UrlDataType[] = generateMockData(100)

  return <ScrapperContainer data={mockUrlData} />
}
