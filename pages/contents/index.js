import Error from "next/error";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "../../utils/sanity";
import ContentsPage from "../../components/ContentsPage";

const query = `//groq
  *[_type == "content" && defined(slug.current)]
`;

function ContentsPageContainer({ contentsData, preview }) {
  const router = useRouter();
  if (!router.isFallback && !contentsData) {
    return <Error statusCode={404} />;
  }
  const { data: contents } = usePreviewSubscription(query, {
    initialData: contentsData,
    enabled: preview || router.query.preview !== null,
  });

  return <ContentsPage contents={contents} />;
}

export async function getStaticProps({ params = {}, preview = false }) {
  const contentsData = await getClient(preview).fetch(query);

  return {
    props: { preview, contentsData },
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
