import { DoczTableOfContents } from '../types'
import { Stack, Box, Link } from '@chakra-ui/core'
import React from 'react'
import { StackProps } from '@chakra-ui/core'

export function TableOfContents({
    table,
    ...rest
}: {
    table: DoczTableOfContents
} & StackProps) {
    console.log(table)
    if (!table) {
        return null
    }
    return (
        <Box
            width='200px'
            lineHeight='2.2em'
            // fontWeight='medium'
            fontSize='0.8em'
            borderLeftWidth='1px'
            pl='20px'
            opacity={0.8}
            {...rest}
        >
            <Box fontWeight='semibold'>ON THIS PAGE</Box>
            {table.children &&
                table.children.map((table) => {
                    return <TableItem key={table.slug} {...table} />
                })}
        </Box>
    )
}

function TableItem({ children, depth, title, slug }: DoczTableOfContents) {
    const baseW = 20
    return (
        <Stack>
            <Box isTruncated minH='30px'>
                <Link href={slug}>{title}</Link>
            </Box>
            <Stack ml={baseW * depth + 'px'}>
                {children &&
                    children.map((table) => {
                        return <TableItem key={table.slug} {...table} />
                    })}
            </Stack>
        </Stack>
    )
}
