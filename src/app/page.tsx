import React, { Fragment } from 'react'

import Banner from "@/components/ui/banner/Banner"

import Anime from '@/components/ui/anime/Anime'

import Genres from '@/components/ui/genres/Genres'

import Schedule from "@/components/ui/schedule/Schedule"

export default function page() {
  return (
    <Fragment>
      <Banner />
      <Genres />
      <Anime />
      <Schedule />
    </Fragment>
  )
}
