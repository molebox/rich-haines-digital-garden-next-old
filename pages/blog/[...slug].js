import { promises as fs } from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import glob from 'fast-glob';

import Code from '@components/Code';
import { Chakra } from '@components/Chakra';
import { Box, Container, Text } from '@chakra-ui/core';
import SemiCircle from 'src/assets/svg/semi-circle';
import ZigZags from './../../src/assets/svg/zig-zags';

const components = { code: Code };

export default function BlogPost({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, { components });

  return (
    <Chakra>
      <Box
        bgImage="url(/bg.svg)"
        bgPos="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        h="100%"
        p={5}
      >
        <SemiCircle />
        <ZigZags />
        <Container maxW="1440px">
          <Text fontSize="5xl" textAlign="center">
            {frontMatter.title}
          </Text>
          {content}
        </Container>
      </Box>
    </Chakra>
  );
}

// This glob is what will be used to generate static routes
const contentPath = 'src/blogs';
export const contentGlob = `${contentPath}/**/*.mdx`;
export const getBlogFileSlug = (blogFilePath) => {
  const filename = blogFilePath.replace(`${contentPath}/`, '');
  const slug = filename.replace(
    new RegExp(path.extname(blogFilePath) + '$'),
    '',
  );
  return slug;
};

export async function getStaticPaths() {
  const files = glob.sync(contentGlob);

  const paths = files.map((file) => {
    return {
      params: {
        slug: getBlogFileSlug(file).split('/'),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const files = glob.sync(contentGlob);

  const pathRegex = new RegExp(`^${contentPath}/${path.join(...slug)}.mdx$`);
  const fullPath = files.find((file) => pathRegex.test(file));

  if (!fullPath) {
    console.warn('No MDX file found for slug');
  }

  const mdxSource = await fs.readFile(fullPath);
  const { content, data } = matter(mdxSource);

  const mdx = await renderToString(content, { components, scope: data });

  return {
    props: {
      mdxSource: mdx,
      frontMatter: data,
    },
  };
}
