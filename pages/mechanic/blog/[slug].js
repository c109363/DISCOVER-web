import PropTypes from 'prop-types';
import { useState } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography, Divider, Stack, Avatar, Chip } from '@mui/material';
// routes
import Routes from '../../../src/routes';
// utils
import { fDate } from '../../../src/utils/formatTime';
import {
  getAllPosts,
  getPostData,
  getAllPostSlugs,
} from '../../../src/utils/get-mardown/mechanic/posts';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page } from '../../../src/components';
import {
  Image,
  Markdown,
  Breadcrumbs,
  SocialsButton,
} from '../../../src/components';
// sections
import { BlogAuthorInfo, BlogLatestPosts } from '../../../src/sections/blog';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

MechanicPostPage.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.object,
    frontmatter: PropTypes.shape({
      author: PropTypes.shape({
        name: PropTypes.string,
        picture: PropTypes.string,
      }),
      createdAt: PropTypes.string,
      description: PropTypes.string,
      duration: PropTypes.string,
      favorited: PropTypes.bool,
      heroImg: PropTypes.string,
      shareLinks: PropTypes.object,
      tags: PropTypes.array,
      title: PropTypes.string,
    }),
  }),
  posts: PropTypes.array,
};

export default function MechanicPostPage({ post, posts }) {
  const { frontmatter, content } = post;
  const { title, description, duration, createdAt, author, favorited, heroImg, shareLinks, tags } =
    frontmatter;

  const [_favorite, setFavorite] = useState(favorited);

  const _handleChangeFavorite = (event) => {
    setFavorite(event.target.checked);
  };

  return (
    <Page title={`${title} - Post | Mechanic`}>
      <RootStyle>
        <Image alt="hero" src={heroImg} ratio="21/9w" />

        <Container>
          <Breadcrumbs
            sx={{ my: 3 }}
            links={[
              { name: 'Home', href: '/' },
              { name: 'Mechanic', href: Routes.mechanic.landing },
              { name: 'Research', href: Routes.mechanic.posts },
              { name: title },
            ]}
          />
        </Container>

        <Divider />

        <Container>
          <Grid container spacing={3} justifyContent={{ md: 'center' }}>
            <Grid item xs={12} md={8}>
              <Stack
                spacing={3}
                sx={{
                  pb: 6,
                  textAlign: 'center',
                  pt: { xs: 6, md: 10 },
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                  {duration}
                </Typography>
                <Typography variant="h2" component="h1">
                  {title}
                </Typography>
                <Typography variant="h5">{description}</Typography>
              </Stack>

              <Divider />
              <Stack direction="row" justifyContent="space-between" spacing={1.5} sx={{ py: 3 }}>
                <Avatar src={author.picture} sx={{ width: 48, height: 48 }} />
                <Stack spacing={0.5} flexGrow={1}>
                  <Typography variant="subtitle2">{author.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {fDate(createdAt, 'dd/MM/yyyy p')}
                  </Typography>
                </Stack>

                {/* <Stack direction="row" alignItems="center">
                  <ShareButton />
                  <FavoriteButton checked={favorite} onChange={handleChangeFavorite} />
                </Stack> */}
              </Stack>

              <Divider sx={{ mb: 6 }} />

              <Markdown content={content} firstLetter />
              {tags &&
                <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ my: 6 }}>
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    Tags:
                  </Typography>
                  {tags.map((tag) => (
                    <Chip key={tag} size="small" label={tag} sx={{ m: 0.5 }} onClick={() => { }} />
                  ))}
                </Stack>
              }

              {shareLinks &&
                <Stack direction="row" alignItems="center" flexWrap="wrap">
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    Share:
                  </Typography>
                  <SocialsButton initialColor links={shareLinks} simple={false} />
                </Stack>
              }

              <Divider sx={{ mt: 8 }} />

              <BlogAuthorInfo author={author} />
            </Grid>
          </Grid>
        </Container>

        <Divider />

        <BlogLatestPosts posts={posts.slice(0, 4)} router={Routes.mechanic} />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

MechanicPostPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export async function getStaticProps({ params }) {
  const post = getPostData(params.slug);

  return {
    props: {
      posts: getAllPosts(),
      post: {
        ...post,
        content: await serialize(post.content),
      },
    },
  };
}

export async function getStaticPaths() {
  const files = getAllPostSlugs();

  return {
    paths: files,
    fallback: false,
  };
}
