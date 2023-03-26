import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";

import { prisma } from "~/server/db";
import { authOptions } from "~/server/auth";
import getAlbums from "../api/albums";
import getCategories from "../api/categories";
import search from "../api/search";
import Showcase from "~/components/Showcase";
import Album from "~/components/Album";
import Category from "~/components/Category";
import Artist from "~/components/Artist";
import Track from "~/components/Track";
import Navbar from "~/components/Navbar";
import ky from "ky";
import Link from "next/link";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session && session.user) {
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    const albums = await getAlbums(account);
    const categories = await getCategories(account);

    return {
      props: {
        albums,
        categories,
      },
    };
  }
  return {
    props: {
      albums: [],
      categories: [],
      searchResults: [],
    },
  };
}

const Dashboard: NextPage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [albums, setAlbums] = useState(props?.albums?.albums?.items);
  const [categories, setCategories] = useState(
    props?.categories?.categories?.items
  );
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

  const router = useRouter();
  const { data: sessionData, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/");
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.length < 3) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const response = await ky
      .get("/api/search/", {
        searchParams: {
          q: searchTerm,
        },
      })
      .json();
    if (response.ok) {
      setArtists(response.artists.items);
      setTracks(response.tracks.items);
      setAlbums(response.albums.items);
      setCategories([]);
    }
    setIsSearching(false);
  };

  const handleClear = () => {
    setArtists([]);
    setTracks([]);
    setAlbums(props?.albums?.albums?.items);
    setCategories(props?.categories?.categories?.items);
    setSearchTerm("");
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        handleClear={handleClear}
      />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#026d17] to-[#152c1e]">
        <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-16 lg:w-5/6">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Link href="/dashboard" replace={true}>
              Browse
            </Link>
          </h1>
          {!isSearching && albums?.length > 0 && (
            <>
              <h2 className="-mb-6 ml-2 w-full text-left text-3xl text-white/80">
                Albums
              </h2>
              <Showcase items={albums} Component={Album} title="Albums" />
            </>
          )}
          {!isSearching && categories?.length > 0 && (
            <>
              <h2 className="-mb-6 ml-2 w-full text-left text-3xl text-white/80">
                Categories
              </h2>
              <Showcase
                items={categories}
                Component={Category}
                title="Categories"
              />
            </>
          )}
          {!isSearching && artists?.length > 0 && (
            <>
              <h2 className="-mb-6 ml-2 w-full text-left text-3xl text-white/80">
                Artists
              </h2>
              <Showcase items={artists} Component={Artist} title="Artists" />
            </>
          )}
          {!isSearching && tracks?.length > 0 && (
            <>
              <h2 className="-mb-6 ml-2 w-full text-left text-3xl text-white/80">
                Tracks
              </h2>
              <Showcase items={tracks} Component={Track} title="Tracks" />
            </>
          )}
          {isSearching && <div>Searching...</div>}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
