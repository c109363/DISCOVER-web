// _data
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import {
  Background,
  HomeAdvertisement,
} from '../src/sections/home';
import { useRef, useState } from 'react';

// ----------------------------------------------------------------------

export default function HomePage() {
  const controlRef = useRef();
  const [tab, setTab] = useState("Home")

  const dict = {
    'Home': 'News',
    'News': 'Research',
    'Research': 'People',
    'People': 'Join Us',
    'Join Us': 'About',
    'About': 'Home'

  }
  const onClick = () => {
    console.log(tab)
    let next = dict[tab]
    setTab(next)
    controlRef.current && controlRef.current.setTrig(tab, next)
    controlRef.current && controlRef.current.setF(tab, next)
  }
  return (
    <Page title="The starting point for your next project">
      <Background cref={controlRef} tab={tab} />

      <HomeAdvertisement onClick={onClick} pack={{ overline: '', main: 'DISCOVER.', button: 'Explore' }} />

      {/* <HomeHero />

      <HomeNewStart />

      <HomeFlexibleComponents />

      <HomeFeatureHighlights />

      <HomeForDesigner />

      <PricingHome plans={_pricingHome} />

      <HomeCombination /> */}

    </Page>
  );
}

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout transparentHeader background='white'>{page}</Layout>;
};
