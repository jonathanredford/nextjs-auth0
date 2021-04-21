import Error from 'next/error'
import { useRouter } from 'next/router'
import { getClient, usePreviewSubscription } from '../utils/sanity'
import { useSession } from 'next-auth/client'
import LibraryPage from '../components/LibraryPage'

const query = `//groq
  *[_type == "content" && defined(slug.current)]
`;

function ContentsPageContainer({ contentsData, preview }) {
  const [ session, loading ] = useSession()
  // console.log(session)
  const router = useRouter();
  if (!router.isFallback && !contentsData) {
    return <Error statusCode={404} />;
  }
  const { data: contents } = usePreviewSubscription(query, {
    initialData: contentsData,
    enabled: preview || router.query.preview !== null,
  });

  if(loading) return null
  return <LibraryPage library={session?.user?.access?.library} />;
}

export async function getStaticProps({ params = {}, preview = false }) {
  const contentsData = await getClient(preview).fetch(query);

  return {
    props: { preview, contentsData },
    revalidate: 120
  };
}

// export async function getServerSideProps({ params = {}, req, res, preview = false }) {
//   res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600'); // 600 = 10 minutes
//   const contentsData = await getClient(preview).fetch(query);

//   return {
//     props: { preview, contentsData },
//   };
// }

export default ContentsPageContainer;
