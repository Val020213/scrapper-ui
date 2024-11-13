'use client'
import { UrlDataType } from '@/app/types/url_data_type'
import ActionsButtons from '@/core/data_grid/actions-buttons'
import HackerDataGrid from '@/core/data_grid/hacker-data-grid'
import useShowHackerMessage from '@/hooks/useShowHackerMessage'
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

type Props = {
  data: UrlDataType[]
}

export const ScrapperContainer = ({ data }: Props) => {
  const hackerMessages = useShowHackerMessage()
  const columns: GridColDef<UrlDataType>[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'url',
      headerName: 'URL',
      flex: 2,
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 50,
      renderCell: (params) => {
        return (
          <ActionsButtons
            onDownload={() =>
              hackerMessages(
                `Trying to download file with id ${params.id}...\n> Error: this functionality is in progress`
              )
            }
          />
        )
      },
    },
  ]
  return (
    <Box>
      <HackerDataGrid
        columns={columns}
        data={data}
        pagination={{
          page: 1,
          totalRecords: data.length,
        }}
      />
    </Box>
  )
}
