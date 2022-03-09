import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// utils
import { getAllPosts } from '../../../src/utils/get-mardown/mechanic/posts';
// _data
// layouts
import Layout from '../../../src/layouts';
// components
import { Page } from '../../../src/components';

import {
  BlogFeaturedPosts,
  BlogFullPostList,
} from '../../../src/sections/blog';
import Routes from '../../../src/routes';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

MechanicBlogPage.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function MechanicBlogPage({ posts }) {
  return (
    <Page title="Blog - Mechanic">
      <RootStyle>

        <BlogFeaturedPosts posts={posts.slice(-5)} route={Routes.mechanic} />

        <BlogFullPostList posts={posts} route={Routes.mechanic} group="mechanic" />

      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

MechanicBlogPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}
