const BlogDetail = ({ params }: { params: { slug: string } }) => {
  console.log("check slug", params.slug);
  return <>View Detail</>;
};

export default BlogDetail;
