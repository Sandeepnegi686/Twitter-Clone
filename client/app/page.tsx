import Form from "./_components/Form";
import Header from "./_components/Header";
import PostFeed from "./_components/posts/PostFeed";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      {/* <PostFeed /> */}
    </>
  );
}
