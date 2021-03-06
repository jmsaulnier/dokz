/** @jsx jsx */
import {
    Box,
    Callout,
    Code as InlineCode,
    Heading,
    Kbd,
    Link as ChakraLink,
    Text,
    useColorMode,
    Image,
    Stack,
} from '@chakra-ui/core'
import { jsx } from '@emotion/core'
import NextLink from 'next/link'
import { Code } from './Code'
import { Wrapper } from './Wrapper'
import { Link } from './Link'
import { useDokzConfig } from '../provider'

const Pre = (props) => <Box as='pre' rounded='sm' {...props} />

const Table = (props) => (
    <Box overflowX='auto'>
        <Box as='table' textAlign='left' mt='32px' width='full' {...props} />
    </Box>
)

const THead = (props) => {
    const { colorMode } = useColorMode()
    const bg = { light: 'gray.50', dark: 'whiteAlpha.100' }
    return (
        <Box
            as='th'
            bg={bg[colorMode]}
            fontWeight='semibold'
            p={2}
            fontSize='sm'
            {...props}
        />
    )
}

const TData = (props) => (
    <Box
        as='td'
        p={2}
        borderTopWidth='1px'
        borderColor='inherit'
        fontSize='sm'
        whiteSpace='normal'
        {...props}
    />
)

const DocsHeading = (props) => {
    const { headingColor } = useDokzConfig()
    const { colorMode } = useColorMode()
    return (
        <Heading
            fontWeight='semibold'
            // color='black'
            color={headingColor[colorMode]}
            my='40px'
            css={{
                '&[id]': {
                    pointerEvents: 'none',
                },
                '&[id]:before': {
                    display: 'block',
                    height: ' 6rem',
                    marginTop: '-6rem',
                    visibility: 'hidden',
                    content: `""`,
                },
                '&[id]:hover a': { opacity: 1 },
            }}
            {...props}
        >
            <Box pointerEvents='auto'>
                {props.children}
                {props.id && (
                    <ChakraLink
                        aria-label='anchor'
                        as='a'
                        color='gray.500'
                        fontWeight='normal'
                        outline='none'
                        _focus={{ opacity: 1, boxShadow: 'outline' }}
                        opacity={0}
                        ml='0.375rem'
                        href={`#${props.id}`}
                    >
                        #
                    </ChakraLink>
                )}
            </Box>
        </Heading>
    )
}

const MdxText = (props) => {
    const { colorMode } = useColorMode()
    return <Text as='p' my='10px' lineHeight='1.8em' {...props} />
}
const MDXComponents = {
    wrapper: Wrapper,
    h1: (props) => <DocsHeading as='h1' fontSize='2em' {...props} />,
    h2: (props) => <DocsHeading as='h2' fontSize='1.4em' {...props} />,
    h3: (props) => <DocsHeading as='h3' fontSize='1.2em' {...props} />,
    // img: (props) => {
    //     return (
    //         <Stack my='20px' direction='column'>
    //             <Image
    //                 borderWidth='1px'
    //                 maxWidth='700px'
    //                 // shadow='md'
    //                 borderRadius='8px'
    //                 {...props}
    //             />
    //         </Stack>
    //     )
    // },
    inlineCode: (props) => {
        const { colorMode } = useColorMode()
        return (
            <Box
                as='code'
                display='inline-block'
                fontFamily='mono'
                fontSize='0.9em'
                px='0.2em'
                rounded='sm'
                bg={
                    {
                        light: 'rgba(228, 235, 242, 0.6)',
                        dark: 'rgba(106, 111, 117, 0.6)',
                    }[colorMode]
                }
                // color={{ light: '#264459', dark: 'white' }[colorMode]}
                lineHeight='normal'
                {...props}
            />
        )
    },
    code: (props) => (
        <Box my='20px'>
            <Code {...props} />
        </Box>
    ),
    pre: Pre,
    kbd: Kbd,
    br: (props) => <Box height='24px' {...props} />,
    hr: (props) => <Box as='hr' borderTopWidth='1px' my={8} {...props} />,
    table: Table,
    th: THead,
    td: TData,
    a: Link,
    p: (props) => {
        return <MdxText as='p' {...props} />
    },
    ul: (props) => <MdxText as='ul' pt='8px' pl='16px' {...props} />,
    ol: (props) => <MdxText as='ol' pt='8px' pl='16px' {...props} />,
    li: (props) => <MdxText as='li' pb='4px' {...props} />,
    blockquote: (props) => (
        <Callout
            mt={4}
            variant='left-accent'
            status='warning'
            css={{ '> *:first-of-type': { marginTop: 0 } }}
            {...props}
        />
    ),
}

// const ChakraProvider = ({ children, theme }) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <ColorModeProvider>
//         <CSSReset />
//         {children}
//       </ColorModeProvider>
//     </ThemeProvider>
//   );
// };

export default MDXComponents
