import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { db } from "../firebase";

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = "all" | "my";

interface PostProps {
  id: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
}

const PostList = ({ hasNavigation = true }: PostListProps) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    console.log(querySnapshot);
    querySnapshot?.forEach((doc) => {
      const obj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, obj as PostProps]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
        </div>
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts.map((post, index) => (
            <div key={post.id} className="post__box">
              <Link to={`/posts/${post.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile"></div>
                  <div className="post__author-name">{post?.email}</div>
                  <div className="post__date">{post?.createdAt}</div>
                </div>
                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.content}</div>
              </Link>
              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div className="post__delete">삭제</div>
                  <div className="post__edit">
                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">"게시글이 없습니다."</div>
        )}
      </div>
    </>
  );
};

export default PostList;
