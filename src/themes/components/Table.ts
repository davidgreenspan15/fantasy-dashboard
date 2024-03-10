import { defineStyle } from '@chakra-ui/react'

const primary = defineStyle({
  table: {
    backgroundColor: 'greyBackground',
    p: '10',
    fontSize: '12px',
    backdropFilter: 'blur(12px)',
  },
  thead: { fontSize: '12px' },
  tfoot: {},
  tr: { borderBottom: '1px solid', borderColor: 'glassBackground' },
  th: { fontSize: '12px', py: 2, pl: 0, pr: 0, textAlign: 'center' },

  td: {
    backgroundColor: 'glassBackground',
    py: 2,
    pl: 0,
    pr: 0,
    textAlign: 'flex-start',
  },
})

const noHeader = defineStyle({
  table: {
    backgroundColor: 'greyBackground',
    p: '10',
    fontSize: '12px',
    backdropFilter: 'blur(12px)',
  },
  thead: { fontSize: '12px' },
  tfoot: {},
  tr: { borderBottom: '1px solid', borderColor: 'glassBackground' },
  th: { fontSize: '12px', p: 2, textAlign: 'center' },

  td: {
    backgroundColor: 'glassBackground',
    p: 2,

    textAlign: 'flex-start',
  },
})

export const Table = {
  variants: {
    primary,
    noHeader,
  },
}
