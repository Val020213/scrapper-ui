'use client'
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowClassNameParams,
  GridValidRowModel,
} from '@mui/x-data-grid'
import useCustomPagination from './usePagination'
import { Pagination } from './pagination-type'
import { Box, LinearProgress, Stack, styled } from '@mui/material'
import { GridOverlay } from '@mui/x-data-grid'
import { useMemo } from 'react'
import CustomPagination from './CustomPagination'

type Props = Omit<DataGridProps, 'pagination' | 'rows'> & {
  data: GridValidRowModel[]
  pagination: Pagination
  columns: GridColDef[]
  hideFooter?: boolean
  disableSelection?: boolean
  rowHeight?: number
  withoutSearch?: boolean
  size?: 'small' | 'medium' | 'large'
  side?: 'left' | 'right'
}

export const dataGridSlots = {
  loadingOverlay: CustomLoadingOverlay,
  noRowsOverlay: CustomNoRowsOverlay,
}

export const MAX_PAGINATION_NUMBERS = 5

export const addOddOrEvenClassname = (params: GridRowClassNameParams) => {
  return params.indexRelativeToCurrentPage % 2 === 0 ? 'odd-row' : 'even-row'
}

export const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiDataGrid-columnHeader': {
    '& svg': {
      display: 'none',
    },
  },
  '& .MuiDataGrid-columnHeader--sortable': {
    '& svg': {
      display: 'block !important',
    },
  },
}))

const HackerDataGrid: React.FC<Props> = ({
  data,
  pagination,
  columns,
  size = 'small',
  side = 'right',
  ...other
}) => {
  const overlayHeight = {
    small: '300px',
    medium: '468px',
    large: '600px',
  }

  const paginatedDataGrid = useCustomPagination(data, pagination.perPage ?? 10)

  const currentPageInterval = useMemo(() => {
    const interval = Math.floor(
      Math.max(paginatedDataGrid.currentPage - 1, 0) / MAX_PAGINATION_NUMBERS
    )
    return interval * MAX_PAGINATION_NUMBERS
  }, [paginatedDataGrid.currentPage])

  return (
    <Stack
      position="relative"
      spacing={3}
      minHeight={overlayHeight[size]}
      justifyContent={'space-between'}
    >
      <Stack>
        <StyledDataGrid
          {...other}
          rows={paginatedDataGrid.rowData}
          columns={columns}
          sx={{
            width: '100%',
            '--DataGrid-overlayHeight': overlayHeight[size],
            '& .super-app-theme--header': {
              fontWeight: 600,
              fontSize: 16,
              backgroundColor: '#F0F0F0',
            },
            '& .MuiDataGrid-cellContent': {
              fontSize: '16px',
            },
            '& .even-row': {
              backgroundColor: '#F6F6F6',
            },
            '& .MuiDataGrid-columnHeaderTitleContainer': {
              display: 'flex',
              gap: 0.5,
            },
            '& .MuiDataGrid-columnHeaderTitleContainerContent': {
              order: '2',
            },
          }}
          slots={dataGridSlots}
          getRowClassName={addOddOrEvenClassname}
          autoHeight
          rowHeight={size === 'small' ? 52 : 60}
          hideFooter={true}
          loading={other.loading}
        />
      </Stack>
      <CustomPagination
        currentPage={paginatedDataGrid.currentPage}
        numbers={Array.from(
          {
            length: Math.min(
              MAX_PAGINATION_NUMBERS,
              Math.ceil(pagination.totalRecords ?? 0) /
                (pagination.perPage ?? 10) +
                1
            ),
          },
          (_, i) => i + currentPageInterval + 1
        )}
        onChangeCurrentPage={paginatedDataGrid.changeCurrentPage}
        onClickNext={() => {
          const page = Math.min(
            currentPageInterval + MAX_PAGINATION_NUMBERS,
            Math.ceil(pagination.totalRecords ?? 0 / (pagination.perPage ?? 10))
          )
          paginatedDataGrid.changeCurrentPage(page + 1)
        }}
        onClickPrev={() => {
          const page = Math.max(currentPageInterval - MAX_PAGINATION_NUMBERS, 0)
          paginatedDataGrid.changeCurrentPage(page + 1)
        }}
        sx={{
          justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
        }}
        disabledNext={
          currentPageInterval + MAX_PAGINATION_NUMBERS >=
          Math.ceil((pagination.totalRecords ?? 0) / (pagination.perPage ?? 10))
        }
        disabledPrev={currentPageInterval === 0}
      />
    </Stack>
  )
}
function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <Box sx={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </Box>
    </GridOverlay>
  )
}

export default HackerDataGrid

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: '#3D4751',
    ...theme.applyStyles('light', {
      fill: '#AEB8C2',
    }),
  },
  '& .no-rows-secondary': {
    fill: '#1D2126',
    ...theme.applyStyles('light', {
      fill: '#E8EAED',
    }),
  },
}))

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={96}
        viewBox="0 0 452 257"
        aria-hidden
        focusable="false"
      >
        <path
          className="no-rows-primary"
          d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
        />
        <path
          className="no-rows-secondary"
          d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
        />
      </svg>
      <Box sx={{ mt: 2 }}>No hay datos</Box>
    </StyledGridOverlay>
  )
}
