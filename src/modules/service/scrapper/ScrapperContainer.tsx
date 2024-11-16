'use client'
import { UrlDataType } from '@/app/types/url_data_type'
import ActionsButtons from '@/core/data_grid/actions-buttons'
import UrlStatusChip from '@/core/data_grid/url-chip'
import HackerDataGrid from '@/core/data_grid/hacker-data-grid'
import useShowHackerMessage from '@/hooks/useShowHackerMessage'
import { Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { HackerButton } from '@/core/button/HackerButton'
import Link from 'next/link'

type Props = {
  data: UrlDataType[]
}

export const ScrapperContainer = ({ data }: Props) => {
  const hackerMessages = useShowHackerMessage()
  const columns: GridColDef<UrlDataType>[] = [
    {
      field: 'id',
      headerName: 'ID',
      headerClassName: 'header-class',
    },
    {
      field: 'url',
      headerClassName: 'header-class',
      headerName: 'URL',
      flex: 2,
    },
    {
      field: 'status',
      headerClassName: 'header-class',
      headerName: 'STATUS',
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            height={'100%'}
          >
            <UrlStatusChip urlStatus={params.value} />
          </Stack>
        )
      },
    },
    {
      field: 'actions',
      headerClassName: 'header-class',
      headerName: 'Action',
      align: 'center',
      headerAlign: 'center',

      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
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
    <Stack sx={{ maxWidth: 'md', width: '100%' }}>
      <Link href={'/'}>
        <HackerButton
          variant="Button"
          color="green"
          sx={{
            position: 'fixed',
            top: 48,
            left: 48,
            zIndex: 1,
            width: '168px',
          }}
        >
          &lt; Ir al Sistema
        </HackerButton>
      </Link>
      <Link href={'?newUrl'}>
        <HackerButton
          variant="Button"
          color="green"
          sx={{
            position: 'fixed',
            top: 105,
            left: 48,
            zIndex: 1,
            width: '168px',
          }}
        >
          + Agregar URL
        </HackerButton>
      </Link>
      <HackerDataGrid columns={columns} data={data} />
    </Stack>
  )
}
