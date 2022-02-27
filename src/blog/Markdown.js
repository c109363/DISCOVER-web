import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import remarkFrontmatter from 'remark-frontmatter';
function MarkdownListItem(props) {
  return <Box component="li" sx={{ mt: 1, typography: 'body1' }} {...props} />;
}

function MarkdownImage(props) {
  return (
    <div style={{ padding: '1rem', height: '100%', width: '100%' }}>
      <img src={props.src} alt="" style={props.style} />
    </div>
  )
}
function MarkdownImageInline(props) {
  return (
    <span style={{ padding: '1rem', height: '100%', width: '100%' }}>
      <img src={props.src} alt="" style={props.style} />
    </span>
  )
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h3',
        component: 'h1',
      },
    },
    h2: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
        component: 'h2'
      },
    },
    h3: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5',
        component: 'h3'
      },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h6'
      },
    },
    h5: {
      component: Typography,
      props: {
        gutterBottom: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true, fontFamily: 'Arial' },
    },
    a: { component: Link },
    li: {
      component: MarkdownListItem,
    },
    imgt: {
      component: MarkdownImage,
    },
    imgi: {
      component: MarkdownImageInline,
    }
  },
};

export default function Markdown(props) {
  return <ReactMarkdown options={options} remarkPlugins={[remarkFrontmatter, 'yaml']} {...props} />;
}