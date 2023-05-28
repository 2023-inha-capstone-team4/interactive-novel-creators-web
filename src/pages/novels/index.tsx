import Layout from '@/components/Layout';
import NovelList from '@/components/NovelList';
import useSWR from 'swr';

/**
 * 내 작품 페이지입니다.
 */
export default function Novels() {
  // const { data: novels, error } = useSWR('/api-dummy/novels');
  // console.log(novels);

  // if (error) {
  //   return <p>에러가 발생했습니다.</p>;
  // }

  // if (!novels) {
  //   return <></>;
  // }

  return (
    <Layout>
      <h2 style={{ marginTop: 0, marginBottom: 30 }}>내 작품</h2>
      {/* <NovelList novels={novels} /> */}
    </Layout>
  );
}
