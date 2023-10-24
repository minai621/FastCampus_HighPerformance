import PostBox from "components/PostBox";
import PostForm from "components/PostForm";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any[];
}

const posts: PostProps[] = [
  {
    id: "1",
    email: "test@test.com",
    content: "text",
    createdAt: "2023-08-30",
    uid: "123",
  },
  {
    id: "5",
    email: "test@test.com",
    content: "text",
    createdAt: "2023-08-30",
    uid: "123",
  },
  {
    id: "6",
    email: "test@test.com",
    content: "text",
    createdAt: "2023-08-30",
    uid: "123",
  },
  {
    id: "2",
    email: "test@test.com",
    content: "text",
    createdAt: "2023-08-30",
    uid: "123",
  },
  {
    id: "3",
    email: "test@test.com",
    content: "text",
    createdAt: "2023-08-30",
    uid: "123",
  },
  {
    id: "4",
    email: "test@test.com",
    content: "text",
    createdAt: "2023-08-30",
    uid: "123",
  },
];

const HomePage = () => {
  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab-active">For You</div>
        <div className="home__tab">Following</div>
      </div>
      <PostForm />
      <div className="post">
        {posts?.map((post) => (
          <PostBox key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
