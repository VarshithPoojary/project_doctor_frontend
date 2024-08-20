import Link from 'next/link';
import Sidebar from './sidebar';
import Head from 'next/head';
import Content from './content';
import Header from './Header';
import Topbar from './topbar';
import React, { useEffect, useState } from 'react';

const Signup = () => {
  return (
    <div id="wrapper">
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Dashboard' />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>
      
      <Header/>
      <Topbar />
      <Content />
    </div>
  );
};

export default Signup;
